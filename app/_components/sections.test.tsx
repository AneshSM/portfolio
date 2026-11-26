import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { resume, site } from './__fixtures__/content';
import { Experience } from './experience';
import { Hero } from './hero';
import { HowIBuild } from './how-i-build';
import { Projects } from './projects';
import { Skills } from './skills';
import { Contact } from './contact';
import { SitePage } from './site-page';

describe('SitePage', () => {
  test('has a skip link to main and anchor nav to every section, in page order', () => {
    render(<SitePage resume={resume} site={site} />);

    const skip = screen.getByRole('link', { name: 'Fixture skip' });
    const main = screen.getByRole('main');
    expect(skip).toHaveAttribute('href', `#${main.id}`);

    const nav = screen.getByRole('navigation', { name: 'Fixture nav' });
    const navLinks = within(nav).getAllByRole('link');
    expect(
      navLinks.map((a) => [a.textContent, a.getAttribute('href')]),
    ).toEqual([
      ['Fixture Projects', '#fx-projects'],
      ['Fixture How', '#fx-how'],
      ['Fixture Experience', '#fx-experience'],
      ['Fixture Skills', '#fx-skills'],
      ['Fixture Contact', '#fx-contact'],
    ]);

    const headings = within(main)
      .getAllByRole('heading')
      .filter((h) => ['H1', 'H2'].includes(h.tagName))
      .map((h) => h.textContent);
    expect(headings).toEqual([
      'Fixture Person',
      'Fixture Projects',
      'Fixture How',
      'Fixture Experience',
      'Fixture Skills',
      'Fixture Contact',
    ]);
    for (const link of navLinks) {
      const target = document.querySelector(link.getAttribute('href')!);
      expect(main).toContainElement(target as HTMLElement);
    }
  });
});

describe('Hero', () => {
  test('shows name, role, sentence, location and the two calls to action', () => {
    render(<Hero resume={resume} site={site} />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Fixture Person' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Fixture Role')).toBeInTheDocument();
    expect(screen.getByText('Fixture hero sentence.')).toBeInTheDocument();
    expect(screen.getByText('Based in Fixtown')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Fixture résumé' }),
    ).toHaveAttribute('href', '/fixture.pdf');
    expect(screen.getByRole('link', { name: 'Fixture email' })).toHaveAttribute(
      'href',
      'mailto:fixture@example.com',
    );
  });
});

describe('Projects', () => {
  test('shows the Building now card first and archived projects in a collapsed list', () => {
    render(<Projects resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture Projects' });
    expect(section).toHaveAttribute('id', 'fx-projects');

    const building = within(section).getByRole('article', {
      name: 'Fixture Pipeline',
    });
    expect(within(building).getByText('Fixture building')).toBeInTheDocument();
    expect(
      within(building).getByText('A fixture pipeline description.'),
    ).toBeInTheDocument();
    expect(
      within(building).getByText('Fixture reason it matters.'),
    ).toBeInTheDocument();

    const earlier = within(section)
      .getByText('Fixture earlier')
      .closest('details');
    expect(earlier).not.toHaveAttribute('open');
    expect(
      within(earlier as HTMLElement).getByRole('link', { name: 'old-fixture' }),
    ).toHaveAttribute('href', 'https://github.example.com/old-fixture');
    expect(
      within(earlier as HTMLElement).getByText('An old fixture project.'),
    ).toBeInTheDocument();
  });
});

describe('HowIBuild', () => {
  test('shows the seven parts in the spec order, under their own headings', () => {
    render(<HowIBuild resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture How' });
    expect(section).toHaveAttribute('id', 'fx-how');
    expect(within(section).getByText('Fixture claim.')).toBeInTheDocument();
    expect(
      within(section)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Fixture loop',
      'Fixture guardrails',
      'Fixture verification',
      'Fixture failure',
      'Fixture example',
      'Fixture setup',
    ]);
    expect(
      within(section).getByText('Fixture setup text.'),
    ).toBeInTheDocument();
  });

  test('lists the loop steps in order and the guardrails', () => {
    render(<HowIBuild resume={resume} site={site} />);

    const [loop, guardrails, checks] = within(
      screen.getByRole('region', { name: 'Fixture How' }),
    ).getAllByRole('list');
    expect(loop.tagName).toBe('OL');
    expect(
      within(loop)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(['Fixture plan', 'Fixture build']);
    expect(
      within(guardrails)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(['Fixture rule', 'Fixture hook']);
    expect(within(checks).getByText('Fixture check')).toBeInTheDocument();
  });

  test('shows one real output verbatim, with where it came from', () => {
    render(<HowIBuild resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture How' });
    const output = section.querySelector('pre');
    expect(output?.textContent).toBe('Fixture output\n  2 passed');
    expect(
      within(section).getByRole('link', { name: 'Fixture output source' }),
    ).toHaveAttribute('href', 'https://github.example.com/pr/2');
  });

  test('links the failure, the worked example and the proof', () => {
    render(<HowIBuild resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture How' });
    expect(
      within(section).getByText('Fixture failure story.'),
    ).toBeInTheDocument();
    expect(
      within(section).getByText('Fixture example story.'),
    ).toBeInTheDocument();
    for (const [name, href] of [
      ['Fixture failure fix', 'https://github.example.com/pr/1'],
      ['Fixture design', 'https://github.example.com/pr/3'],
      ['Fixture build', 'https://github.example.com/pr/4'],
      ['Fixture proof', 'https://github.example.com/proof'],
    ]) {
      expect(within(section).getByRole('link', { name })).toHaveAttribute(
        'href',
        href,
      );
    }
  });
});

describe('Experience', () => {
  test('lists each role with dates, location, recognition and highlights', () => {
    render(<Experience resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture Experience' });
    expect(section).toHaveAttribute('id', 'fx-experience');

    const current = within(section).getByRole('article', {
      name: 'Fixture Lead',
    });
    expect(
      within(current).getByText('Nov 2025 – Fixture now'),
    ).toBeInTheDocument();
    expect(within(current).getByText('Fixtown (on-site)')).toBeInTheDocument();
    expect(
      within(current).getByText('Led the fixture work.'),
    ).toBeInTheDocument();

    const earlier = within(section).getByRole('article', {
      name: 'Fixture Junior',
    });
    expect(
      within(earlier).getByText('Feb 2023 – Aug 2023'),
    ).toBeInTheDocument();
    expect(within(earlier).getByText('Fixture award')).toBeInTheDocument();
    expect(
      within(earlier).getByText('Learned the fixture ropes.'),
    ).toBeInTheDocument();
  });
});

describe('Skills', () => {
  test('groups keywords under each capability', () => {
    render(<Skills resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture Skills' });
    expect(section).toHaveAttribute('id', 'fx-skills');
    expect(
      within(section).getByRole('heading', {
        level: 3,
        name: 'Fixture capability',
      }),
    ).toBeInTheDocument();
    const keywords = within(section).getAllByRole('listitem');
    expect(keywords.map((item) => item.textContent)).toEqual([
      'FixLang',
      'FixDB',
    ]);
  });
});

describe('Contact', () => {
  test('repeats the call to action and links every profile and the email', () => {
    render(<Contact resume={resume} site={site} />);

    const section = screen.getByRole('region', { name: 'Fixture Contact' });
    expect(section).toHaveAttribute('id', 'fx-contact');
    expect(
      within(section).getByText('Fixture contact lead.'),
    ).toBeInTheDocument();
    expect(
      within(section).getByRole('link', { name: 'Fixture contact email' }),
    ).toHaveAttribute('href', 'mailto:fixture@example.com');
    expect(
      within(section).getByRole('link', { name: 'Fixture résumé' }),
    ).toHaveAttribute('href', '/fixture.pdf');
    expect(
      within(section).getByRole('link', { name: 'FixNet' }),
    ).toHaveAttribute('href', 'https://fixnet.example.com/fixer');
    expect(
      within(section).getByRole('link', { name: 'DrawNet' }),
    ).toHaveAttribute('href', 'https://drawnet.example.com/drawer');
    expect(within(section).getByText('Fixture note')).toBeInTheDocument();
  });
});
