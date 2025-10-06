export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  
  password: {
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character'
  },
  
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    message: 'Please enter a valid phone number'
  },
  
  url: {
    pattern: /^https?:\/\/.+/,
    message: 'Please enter a valid URL starting with http:// or https://'
  },
  
  required: (fieldName: string) => ({
    required: true,
    message: `${fieldName} is required`
  }),
  
  minLength: (min: number) => ({
    minLength: min,
    message: `Must be at least ${min} characters`
  }),
  
  maxLength: (max: number) => ({
    maxLength: max,
    message: `Must be no more than ${max} characters`
  })
};

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!validationRules.email.pattern.test(email)) {
    return validationRules.email.message;
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < validationRules.password.minLength) {
    return `Password must be at least ${validationRules.password.minLength} characters`;
  }
  if (!validationRules.password.pattern.test(password)) {
    return validationRules.password.message;
  }
  return null;
}

export function validateRequired(value: any, fieldName: string): string | null {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
}

export function validateUrl(url: string): string | null {
  if (!url) return null; // URL is optional
  if (!validationRules.url.pattern.test(url)) {
    return validationRules.url.message;
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return null; // Phone is optional
  if (!validationRules.phone.pattern.test(phone)) {
    return validationRules.phone.message;
  }
  return null;
}