import { setDocument, addDocument } from './firestoreService';
import {
  PERSONAL_INFO,
  STATS,
  SKILL_CATEGORIES,
  PROJECTS,
  BUILT_PROJECTS,
  EXPERIENCES,
  EDUCATION,
  CERTIFICATIONS,
  TESTIMONIALS,
  NAV_LINKS,
} from '../constants/data';

export async function seedAllData(): Promise<void> {
  // Personal Info (single document)
  await setDocument('personalInfo', 'main', PERSONAL_INFO);

  // Stats
  for (let i = 0; i < STATS.length; i++) {
    await addDocument('stats', { ...STATS[i], order: i });
  }

  // Skill Categories
  for (let i = 0; i < SKILL_CATEGORIES.length; i++) {
    await addDocument('skillCategories', { ...SKILL_CATEGORIES[i], order: i });
  }

  // Projects
  for (let i = 0; i < PROJECTS.length; i++) {
    const { id, ...rest } = PROJECTS[i];
    await addDocument('projects', { ...rest, order: i });
  }

  // Built Projects
  for (let i = 0; i < BUILT_PROJECTS.length; i++) {
    const { id, ...rest } = BUILT_PROJECTS[i];
    await addDocument('builtProjects', { ...rest, order: i });
  }

  // Experiences
  for (let i = 0; i < EXPERIENCES.length; i++) {
    const { id, ...rest } = EXPERIENCES[i];
    await addDocument('experiences', { ...rest, order: i });
  }

  // Education
  for (let i = 0; i < EDUCATION.length; i++) {
    const { id, ...rest } = EDUCATION[i];
    await addDocument('education', { ...rest, order: i });
  }

  // Certifications
  for (let i = 0; i < CERTIFICATIONS.length; i++) {
    const { id, ...rest } = CERTIFICATIONS[i];
    await addDocument('certifications', { ...rest, order: i });
  }

  // Testimonials
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const { id, ...rest } = TESTIMONIALS[i];
    await addDocument('testimonials', { ...rest, order: i });
  }

  // Nav Links
  for (let i = 0; i < NAV_LINKS.length; i++) {
    await addDocument('navLinks', { ...NAV_LINKS[i], order: i });
  }
}
