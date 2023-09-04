export function formatPhone(phone: string): string {
  // Удаляем все символы, кроме цифр
  const onlyDigits = phone.replace(/\D/g, '');

  // Проверяем, начинается ли строка с "7" или "8" (обычно это код России),
  // и, если да, возвращаем строку, начиная с "7".
  // Если нет, просто возвращаем оставшиеся цифры.
  if (onlyDigits.startsWith('7') || onlyDigits.startsWith('8')) {
    return '7' + onlyDigits.substring(1);
  }

  return onlyDigits;
}
