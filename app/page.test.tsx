import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { getResume, getSiteCopy } from '@/content';
import Home from './page';

test('home page renders the public content with one level-1 heading', () => {
  const { basics } = getResume('public');
  const site = getSiteCopy();
  render(<Home />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent(basics.name);

  const resumeLinks = screen.getAllByRole('link', {
    name: site.hero.resume.label,
  });
  expect(resumeLinks[0]).toHaveAttribute('href', '/resume.pdf');
  expect(
    screen.getAllByRole('link', { name: site.hero.emailLabel })[0],
  ).toHaveAttribute('href', `mailto:${basics.email}`);
});
