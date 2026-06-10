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

const MAX_EMAIL_LENGTH = 254;

export function isEmail(value: string): boolean {
  if (value.length === 0 || value.length > MAX_EMAIL_LENGTH) return false;

  const atIndex = value.indexOf("@");
  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) return false;

  let hasDomainDot = false;

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index];

    if (character.trim() === "") return false;

    if (
      character === "." &&
      index > atIndex + 1 &&
      index < value.length - 1
    ) {
      hasDomainDot = true;
    }
  }

  return hasDomainDot;
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
  return value instanceof Date && !Number.isNaN(value.getTime());
}

export function isValidDateString(value: unknown): boolean {
  if (typeof value !== "string") return false;

  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}
