export function parseDate(value: string): Date | null {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
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