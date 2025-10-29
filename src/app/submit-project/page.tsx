"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  farmName: z.string().min(2, { message: "Farm name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  cropType: z.enum(["Maize", "Rice", "Beans", "Cassava"]),
  fundingGoal: z.coerce.number().min(1, { message: "Funding goal must be at least 1 HBAR." }),
  campaignDuration: z.coerce.number().min(1, { message: "Duration must be at least 1 day." }),
  farmSize: z.coerce.number().min(0.1, { message: "Farm size must be at least 0.1 hectares." }),
});

export default function SubmitProjectPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmName: "",
      location: "",
      fundingGoal: 1000,
      campaignDuration: 30,
      farmSize: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Campaign submitted for review!");
    // Here you would typically send the data to your backend/smart contract
  }

  const estimatedCO2 = form.watch("farmSize") * 10; // Simplified calculation

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <section className="flex-1 py-12 px-4">
        <div className="container-custom max-w-3xl">
          <Card className="bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-3xl text-gray-900">Create a Funding Campaign</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Fill out the form to get your agricultural project funded by the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="farmName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Green Acres Farm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Kenya" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cropType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crop Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a crop" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Maize">Maize</SelectItem>
                            <SelectItem value="Rice">Rice</SelectItem>
                            <SelectItem value="Beans">Beans</SelectItem>
                            <SelectItem value="Cassava">Cassava</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="farmSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Farm Size (Hectares)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fundingGoal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Funding Goal (HBAR)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 10000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="campaignDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campaign Duration (Days)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 30" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label>Document Upload</Label>
                    <Input type="file" />
                    <FormDescription>
                      Upload land ownership documents and photos of your farm.
                    </FormDescription>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">
                      Estimated Carbon Sequestration
                    </h4>
                    <p className="text-green-800 text-sm">
                      Based on your farm size and crop type, you could sequester an estimated <span className="font-bold">{estimatedCO2.toFixed(1)} tons of CO2</span> per year.
                    </p>
                  </div>

                  <Button type="submit" className="w-full btn-primary">Submit for Review</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}