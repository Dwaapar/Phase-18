import React from 'react';
import { useForm } from '../../hooks/useForm';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { RadioGroup } from './RadioGroup';
import { DatePicker } from './DatePicker';
import { NumberInput } from './NumberInput';
import { FileUpload } from './FileUpload';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '../../lib/utils';

interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'date' | 'number' | 'file';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  validation?: any;
  description?: string;
  gridColumn?: string;
}

interface SmartFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitLabel?: string;
  className?: string;
}

export const SmartForm: React.FC<SmartFormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className
}) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {} as Record<string, any>);

  const validationRules = fields.reduce((acc, field) => {
    if (field.validation) {
      acc[field.name] = field.validation;
    } else if (field.required) {
      acc[field.name] = { required: true };
    }
    return acc;
  }, {} as Record<string, any>);

  const { values, errors, isSubmitting, setValue, handleSubmit } = useForm({
    initialValues,
    validationRules,
    onSubmit
  });

  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      error: errors[field.name],
      className: field.gridColumn ? `col-span-${field.gridColumn}` : undefined
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Input
            key={field.name}
            type={field.type}
            value={values[field.name] || ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            {...commonProps}
          />
        );

      case 'textarea':
        return (
          <Textarea
            key={field.name}
            value={values[field.name] || ''}
            onChange={(e) => setValue(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            {...commonProps}
          />
        );

      case 'select':
        return (
          <Select
            key={field.name}
            options={field.options || []}
            value={values[field.name]}
            onChange={(value) => setValue(field.name, value)}
            placeholder={field.placeholder}
            {...commonProps}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            key={field.name}
            checked={values[field.name] || false}
            onChange={(checked) => setValue(field.name, checked)}
            label={field.label}
            description={field.description}
            className={commonProps.className}
          />
        );

      case 'radio':
        return (
          <RadioGroup
            key={field.name}
            options={field.options || []}
            value={values[field.name]}
            onChange={(value) => setValue(field.name, value)}
            name={field.name}
            {...commonProps}
          />
        );

      case 'date':
        return (
          <DatePicker
            key={field.name}
            value={values[field.name]}
            onChange={(date) => setValue(field.name, date)}
            placeholder={field.placeholder}
            {...commonProps}
          />
        );

      case 'number':
        return (
          <NumberInput
            key={field.name}
            value={values[field.name] || 0}
            onChange={(value) => setValue(field.name, value)}
            {...commonProps}
          />
        );

      case 'file':
        return (
          <FileUpload
            key={field.name}
            onFileSelect={(files) => setValue(field.name, files)}
            description={field.description}
            {...commonProps}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-6', className)}>
      <div className="grid gap-6 md:grid-cols-2">
        {fields.map(renderField)}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-monks-black text-white px-6 py-4 rounded-full font-medium hover:bg-monks-accent disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" />
            Submitting...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};