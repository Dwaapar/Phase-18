import { useState, useCallback } from 'react';

interface ValidationRule<T> {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: T) => string | null;
}

interface FormField<T> {
  value: T;
  error?: string;
  touched?: boolean;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: Partial<Record<keyof T, ValidationRule<T[keyof T]>>>;
  onSubmit?: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit
}: UseFormOptions<T>) {
  const [fields, setFields] = useState<Record<keyof T, FormField<T[keyof T]>>>(() => {
    const initialFields: any = {};
    Object.keys(initialValues).forEach(key => {
      initialFields[key] = {
        value: initialValues[key],
        error: undefined,
        touched: false
      };
    });
    return initialFields;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name: keyof T, value: T[keyof T]): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'This field is required';
    }

    if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  }, [validationRules]);

  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value),
        touched: true
      }
    }));
  }, [validateField]);

  const setError = useCallback((name: keyof T, error: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error
      }
    }));
  }, []);

  const validateAll = useCallback((): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(fields).forEach(key => {
      const fieldName = key as keyof T;
      const error = validateField(fieldName, fields[fieldName].value);
      newFields[fieldName] = {
        ...newFields[fieldName],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    setFields(newFields);
    return isValid;
  }, [fields, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;
    
    setIsSubmitting(true);
    try {
      const values = Object.keys(fields).reduce((acc, key) => {
        acc[key as keyof T] = fields[key as keyof T].value;
        return acc;
      }, {} as T);
      
      await onSubmit?.(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [fields, validateAll, onSubmit]);

  const reset = useCallback(() => {
    setFields(() => {
      const resetFields: any = {};
      Object.keys(initialValues).forEach(key => {
        resetFields[key] = {
          value: initialValues[key],
          error: undefined,
          touched: false
        };
      });
      return resetFields;
    });
    setIsSubmitting(false);
  }, [initialValues]);

  const values = Object.keys(fields).reduce((acc, key) => {
    acc[key as keyof T] = fields[key as keyof T].value;
    return acc;
  }, {} as T);

  const errors = Object.keys(fields).reduce((acc, key) => {
    const error = fields[key as keyof T].error;
    if (error) acc[key as keyof T] = error;
    return acc;
  }, {} as Partial<Record<keyof T, string>>);

  const hasErrors = Object.values(errors).some(error => error);

  return {
    fields,
    values,
    errors,
    hasErrors,
    isSubmitting,
    setValue,
    setError,
    handleSubmit,
    reset,
    validateAll
  };
}