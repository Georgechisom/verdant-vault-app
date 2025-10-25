// Form validation utilities

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): ValidationError[] {
  const errors: ValidationError[] = [];

  if (password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters long',
    });
  }

  if (!/[A-Z]/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain at least one uppercase letter',
    });
  }

  if (!/[0-9]/.test(password)) {
    errors.push({
      field: 'password',
      message: 'Password must contain at least one number',
    });
  }

  return errors;
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateAmount(amount: string | number): boolean {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(num) && num > 0;
}

export function validateForm(formData: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = [];

  if (formData.name && !validateName(formData.name)) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters long',
    });
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'Please enter a valid email address',
    });
  }

  if (formData.password) {
    const passwordErrors = validatePassword(formData.password);
    errors.push(...passwordErrors);
  }

  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.push({
      field: 'confirmPassword',
      message: 'Passwords do not match',
    });
  }

  if (formData.amount && !validateAmount(formData.amount)) {
    errors.push({
      field: 'amount',
      message: 'Please enter a valid amount',
    });
  }

  return errors;
}

