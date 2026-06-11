import { useCallback, useState } from "react";

type FormValues = object;
type FormErrors<T> = Partial<Record<keyof T, string>>;

type FieldValidator<T> = (field: keyof T, values: Readonly<T>) => string | null;

export type Dependencies<T> = Partial<Record<keyof T, readonly (keyof T)[]>>;

export function useForm<T extends FormValues>(
  initialValues: T,
  validateField?: FieldValidator<T>,
  dependencies?: Dependencies<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  function getFieldsToValidate(field: keyof T): (keyof T)[] {
    return [field, ...(dependencies?.[field] ?? [])];
  }

  function validateFields(
    fields: readonly (keyof T)[],
    nextValues: Readonly<T>,
    previousErrors: FormErrors<T> = {},
  ): FormErrors<T> {
    if (!validateField) return previousErrors;

    const nextErrors = { ...previousErrors };

    fields.forEach((field) => {
      const error = validateField(field, nextValues);

      if (error) {
        nextErrors[field] = error;
        return;
      }

      delete nextErrors[field];
    });

    return nextErrors;
  }

  function handleChange<K extends keyof T>(field: K, value: T[K]) {
    const nextValues = {
      ...values,
      [field]: value,
    };

    setValues(nextValues);

    if (validateField) {
      setErrors(validateFields(getFieldsToValidate(field), nextValues, errors));
    }
  }

  const reset = useCallback((nextValues: T = initialValues) => {
    setValues(nextValues);
    setErrors({});
  }, [initialValues]);

  function isValid() {
    if (!validateField) return true;

    const newErrors = validateFields(Object.keys(values) as (keyof T)[], values);

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
