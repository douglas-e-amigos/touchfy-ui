export function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === "";
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Verifica se o valor é uma string válida.
 * 
 * @param value 
 * @returns boolean
 */
export function isBlank(value: unknown): boolean {
  return !isString(value) || isEmpty(value);
}

export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function maxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function isEqual(a: unknown, b: unknown): boolean {
  return a === b;
}

export function isPassword(value: unknown) {
  return !isBlank(value) && maxLength(String(value), 200) && minLength(String(value), 8);
}

export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

export function isValidDateString(value: unknown): boolean {
  if (typeof value !== "string") return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}