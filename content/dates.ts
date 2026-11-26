// Date formatting shared by the site (#5) and the résumé PDF (#7), so both
// show a role's dates the same way.

const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2023-02" → "Feb 2023". */
export function formatMonth(isoMonth: string): string {
  return monthFormat.format(new Date(`${isoMonth}-01T00:00:00Z`));
}

/** "Feb 2023 – Mar 2024", or "Feb 2023 – Present" while `endDate` is absent. */
export function formatDateRange(
  startDate: string,
  endDate: string | undefined,
  presentLabel: string,
): string {
  return `${formatMonth(startDate)} – ${endDate ? formatMonth(endDate) : presentLabel}`;
}
