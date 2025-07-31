
import { cn, formatDate } from '../utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('a', 'b')).toBe('a b');
    expect(cn('a', false, 'b', { c: true, d: false })).toBe('a b c');
  });

  it('should handle tailwind classes correctly', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });
});

describe('formatDate', () => {
  it('should format date to Japanese format', () => {
    const date = new Date('2024-01-01T00:00:00Z');
    // Note: The result may vary depending on the timezone of the test environment.
    // This test assumes a Japan-like timezone.
    expect(formatDate(date)).toBe('2024年1月1日');
  });
});
