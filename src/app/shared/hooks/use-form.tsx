import { useState } from "react";

type FormValues = Record<string, any>;
type FormErrors<T> = Partial<Record<keyof T, string>>;

type FieldValidator<T> = (field: keyof T, values: T) => string | null;

export type Dependencies<T> = Partial<Record<keyof T, (keyof T)[]>>;

export function useForm<T extends FormValues>(
  initialValues: T,
  validateField?: FieldValidator<T>,
  dependencies?: Dependencies<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  function handleChange(field: keyof T, value: string) {
    const newValues = {
      ...values,
      [field]: value,
    };

    setValues(newValues);

    if (!validateField) return;

    setErrors((prev) => {
      const newErrors = { ...prev };

      const fieldsToValidate = new Set<keyof T>();
      fieldsToValidate.add(field);

      const deps = dependencies?.[field] || [];
      deps.forEach((dep) => fieldsToValidate.add(dep));

      fieldsToValidate.forEach((f) => {
        const error = validateField(f, newValues);
        newErrors[f] = error || undefined;
      });

      return newErrors;
    });
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  function isValid() {
    if (!validateField) return true;

    const newErrors: FormErrors<T> = {};

    (Object.keys(values) as (keyof T)[]).forEach((field) => {
      const error = validateField(field, values);
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  return {
    values,
    errors,
    handleChange,
    reset,
    isValid,
  };
}