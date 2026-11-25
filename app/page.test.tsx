import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from './page';

test('home page renders a main landmark with one level-1 heading', () => {
  render(<Home />);

  expect(screen.getByRole('main')).toBeInTheDocument();
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent('Portfolio');
});
