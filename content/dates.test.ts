// @vitest-environment node
import { expect, test } from 'vitest';
import { formatDateRange, formatMonth } from './dates';

test('formats an ISO month as a short month and year', () => {
  expect(formatMonth('2023-02')).toBe('Feb 2023');
  expect(formatMonth('2021-09')).toBe('Sep 2021');
  expect(formatMonth('2024-12')).toBe('Dec 2024');
});

test('formats a closed range and an open one with the present label', () => {
  expect(formatDateRange('2023-02', '2023-08', 'Present')).toBe(
    'Feb 2023 – Aug 2023',
  );
  expect(formatDateRange('2023-09', undefined, 'Present')).toBe(
    'Sep 2023 – Present',
  );
});
