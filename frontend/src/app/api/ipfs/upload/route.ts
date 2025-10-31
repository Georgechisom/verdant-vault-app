import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UploadResult =
  | { ok: true; cid: string }
  | { ok: false; error: string; status?: number };

async function uploadFileToPinata(file: File, jwt: string): Promise<UploadResult> {
  try {
    const fd = new FormData();
    const filename = (file as any).name || `upload-${Date.now()}`;
    // Pinata expects a single 'file' field; avoid extra fields that can trigger "Unexpected field"
    fd.append("file", file, filename);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: fd,
    });

    // Read raw response text first to handle non-JSON error bodies like "Unexpected field"
    const text = await res.text();
    let json: any = {};
    try {
      json = JSON.parse(text);
    } catch {
      // non-JSON response, keep text for error
    }

    if (!res.ok) {
      return {
        ok: false,
        error: json?.error || json?.message || text || "Pinata file pin failed",
        status: res.status,
      };
    }

    const cid = json?.IpfsHash;
    if (!cid) {
      return { ok: false, error: "No IpfsHash returned from Pinata (file)" };
    }
    return { ok: true, cid: cid as string };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Pinata file pin threw" };
  }
}

async function uploadJsonToPinata(data: unknown, jwt: string): Promise<UploadResult> {
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinataContent: data }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        error: json?.error || json?.message || "Pinata JSON pin failed",
        status: res.status,
      };
    }
    const cid = json?.IpfsHash;
    if (!cid) {
      return { ok: false, error: "No IpfsHash returned from Pinata (json)" };
    }
    return { ok: true, cid: cid as string };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Pinata JSON pin threw" };
  }
}

/**
 * POST /api/ipfs/upload
 * Accepts multipart/form-data:
 *  - metadata: JSON string (optional)
 *  - files: one or more File items (optional)
 *
 * Behavior:
 *  - Uploads files to Pinata (pinFileToIPFS)
 *  - If no metadata provided and at least one file uploaded successfully, returns the first file's CID
 *  - If metadata provided, augments it with uploaded file CIDs under `files` and pins JSON to Pinata (pinJSONToIPFS)
 *  - Returns { cid } for the pinned JSON or file
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const metadataStr = formData.get("metadata") as string | null;
    const files = formData.getAll("files") as File[];

    const pinataJWT = process.env.PINATA_JWT || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMTc1YTA4MC05MDUxLTQxMDAtOWE2MC1jMDM4YTMyYmZmMzQiLCJlbWFpbCI6InNlZ3VuemFjaGV1c2lAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImJmZjRkYzkwZTJjZmNjNThhOTc1Iiwic2NvcGVkS2V5U2VjcmV0IjoiMzU1ZTM0NTIyOTgzOTEyNDM4OTQ2ZGI5ZDQ2NDcxNzgzNDNmYTcwOGI0ZTk3ZGU5NDNiYjA3YWQ1MDI1ZDk3ZCIsImV4cCI6MTc4NjQ2ODE2MX0.Z8-dQQk1nvzpHvee7AS7jd31TACjQ8dhJ56QO1wezbc';
    if (!pinataJWT) {
      return NextResponse.json(
        { error: "Missing PINATA_JWT on server. Set PINATA_JWT to enable IPFS uploads." },
        { status: 500 }
      );
    }

    const uploadedFileCids: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        if (!file || typeof file.arrayBuffer !== "function") continue;
        const uploadRes = await uploadFileToPinata(file, pinataJWT);
        if (!uploadRes.ok) {
          return NextResponse.json(
            { error: `File upload failed: ${uploadRes.error}` },
            { status: uploadRes.status || 500 }
          );
        }
        uploadedFileCids.push(uploadRes.cid);
      }
    }

    if (!metadataStr && uploadedFileCids.length > 0) {
      return NextResponse.json({ cid: uploadedFileCids[0] }, { status: 200 });
    }

    if (metadataStr) {
      let metadata: any;
      try {
        metadata = JSON.parse(metadataStr);
      } catch {
        return NextResponse.json({ error: "Invalid metadata JSON" }, { status: 400 });
      }

      const finalMetadata = {
        ...metadata,
        files: uploadedFileCids.map((cid) => `ipfs://${cid}`),
        timestamp: new Date().toISOString(),
      };

      const jsonRes = await uploadJsonToPinata(finalMetadata, pinataJWT);
      if (jsonRes.ok) {
        return NextResponse.json({ cid: jsonRes.cid }, { status: 200 });
      }
      return NextResponse.json(
        { error: `Metadata pin failed: ${jsonRes.error}` },
        { status: jsonRes.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "No metadata or files provided" },
      { status: 400 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Unexpected error during IPFS upload" },
      { status: 500 }
    );
  }
}