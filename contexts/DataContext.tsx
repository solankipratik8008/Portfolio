import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCollectionData, getDocumentData } from '../services/firestoreService';
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

interface DataContextType {
  personalInfo: typeof PERSONAL_INFO;
  stats: typeof STATS;
  skillCategories: typeof SKILL_CATEGORIES;
  projects: typeof PROJECTS;
  builtProjects: typeof BUILT_PROJECTS;
  experiences: typeof EXPERIENCES;
  education: typeof EDUCATION;
  certifications: typeof CERTIFICATIONS;
  testimonials: typeof TESTIMONIALS;
  navLinks: typeof NAV_LINKS;
  loading: boolean;
  refetch: () => void;
}

const DataContext = createContext<DataContextType>({
  personalInfo: PERSONAL_INFO,
  stats: STATS,
  skillCategories: SKILL_CATEGORIES,
  projects: PROJECTS,
  builtProjects: BUILT_PROJECTS,
  experiences: EXPERIENCES,
  education: EDUCATION,
  certifications: CERTIFICATIONS,
  testimonials: TESTIMONIALS,
  navLinks: NAV_LINKS,
  loading: true,
  refetch: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState(PERSONAL_INFO);
  const [stats, setStats] = useState(STATS);
  const [skillCategories, setSkillCategories] = useState(SKILL_CATEGORIES);
  const [projects, setProjects] = useState(PROJECTS);
  const [builtProjects, setBuiltProjects] = useState(BUILT_PROJECTS);
  const [experiences, setExperiences] = useState(EXPERIENCES);
  const [education, setEducation] = useState(EDUCATION);
  const [certifications, setCertifications] = useState(CERTIFICATIONS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    // If Firebase is not configured, use hardcoded data
    const firebaseConfigured = !!process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
    if (!firebaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const [
        piData,
        statsData,
        skillsData,
        projData,
        builtData,
        expData,
        eduData,
        certData,
        testData,
        navData,
      ] = await Promise.all([
        getDocumentData<typeof PERSONAL_INFO>('personalInfo', 'main'),
        getCollectionData<(typeof STATS)[0]>('stats'),
        getCollectionData<(typeof SKILL_CATEGORIES)[0]>('skillCategories'),
        getCollectionData<(typeof PROJECTS)[0]>('projects'),
        getCollectionData<(typeof BUILT_PROJECTS)[0]>('builtProjects'),
        getCollectionData<(typeof EXPERIENCES)[0]>('experiences'),
        getCollectionData<(typeof EDUCATION)[0]>('education'),
        getCollectionData<(typeof CERTIFICATIONS)[0]>('certifications'),
        getCollectionData<(typeof TESTIMONIALS)[0]>('testimonials'),
        getCollectionData<(typeof NAV_LINKS)[0]>('navLinks'),
      ]);

      // Firebase IS configured: always use Firestore result, even if empty.
      // This ensures deleted items actually disappear instead of falling back
      // to hardcoded data.
      if (piData) setPersonalInfo(piData);
      setStats(statsData.length ? statsData : STATS);
      setSkillCategories(skillsData.length ? skillsData : SKILL_CATEGORIES);
      setProjects(projData);
      setBuiltProjects(builtData);
      setExperiences(expData);
      setEducation(eduData);
      setCertifications(certData);
      setTestimonials(testData);
      setNavLinks(navData.length ? navData : NAV_LINKS);
    } catch {
      // Network error — keep hardcoded fallback data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider
      value={{
        personalInfo,
        stats,
        skillCategories,
        projects,
        builtProjects,
        experiences,
        education,
        certifications,
        testimonials,
        navLinks,
        loading,
        refetch: fetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
