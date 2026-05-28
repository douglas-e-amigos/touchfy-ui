export function parseDate(value: string): Date | null {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function getDateFormat(): string {
  const date = new Date();
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    hour: "numeric",
    month: "long"
  })
}

export function getHour(): number {
  const date = new Date();
  return date.getHours();
}

export function formatDateForInput(value: string | Date | null | undefined): string {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return [
      value.getFullYear(),
      String(value.getMonth() + 1).padStart(2, "0"),
      String(value.getDate()).padStart(2, "0"),
    ].join("-");
  }

  const normalizedValue = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    return normalizedValue;
  }

  if (/^\d{4}-\d{2}-\d{2}T/.test(normalizedValue)) {
    return normalizedValue.slice(0, 10);
  }

  const brDateMatch = normalizedValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (brDateMatch) {
    const [, day, month, year] = brDateMatch;
    return `${year}-${month}-${day}`;
  }

  const parsedDate = new Date(normalizedValue);

  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  return [
    parsedDate.getFullYear(),
    String(parsedDate.getMonth() + 1).padStart(2, "0"),
    String(parsedDate.getDate()).padStart(2, "0"),
  ].join("-");
}

export function formatDateBR(value: Date): string {
  return value.toLocaleDateString("pt-BR");
}

export function isBefore(dateA: Date, dateB: Date): boolean {
  return dateA.getTime() < dateB.getTime();
}

export function isAfter(dateA: Date, dateB: Date): boolean {
  return dateA.getTime() > dateB.getTime();
}

export function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}