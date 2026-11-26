import type { Project, Resume } from './index';

// Project selections shared by the site (#5), the résumé PDF (#7) and its
// build checks. Pure: safe to import anywhere.

/** Projects for the "Building now" card and the résumé's Projects section. */
export function getBuildingProjects(resume: Resume): Project[] {
  return resume.projects.filter((project) => project.status === 'building');
}

/** Projects for the site's "Earlier learning" list. */
export function getArchivedProjects(resume: Resume): Project[] {
  return resume.projects.filter((project) => project.status === 'archived');
}
