import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCollectionData, getDocumentData, addDocument, deleteDocument, setDocument } from '../services/firestoreService';

export interface ThemePreset {
  name: string;
  primary: string;
  secondary: string;
}

export interface ThemeHistoryEntry extends ThemePreset {
  id: string;
  changedAt: string;
  order: number;
}

interface ThemeContextType {
  isDark: boolean;
  toggleDark: () => void;
  currentPreset: ThemePreset;
  applyPreset: (preset: ThemePreset) => Promise<void>;
  themeHistory: ThemeHistoryEntry[];
  restoreHistorical: (entry: ThemeHistoryEntry) => Promise<void>;
  loading: boolean;
}

export const THEME_PRESETS: ThemePreset[] = [
  { name: 'Purple → Blue',   primary: '#7C3AED', secondary: '#2563EB' },
  { name: 'Emerald → Cyan',  primary: '#059669', secondary: '#0891B2' },
  { name: 'Rose → Orange',   primary: '#E11D48', secondary: '#EA580C' },
  { name: 'Amber → Red',     primary: '#D97706', secondary: '#DC2626' },
  { name: 'Pink → Purple',   primary: '#DB2777', secondary: '#7C3AED' },
  { name: 'Teal → Green',    primary: '#0D9488', secondary: '#16A34A' },
  { name: 'Indigo → Violet', primary: '#4338CA', secondary: '#7C3AED' },
  { name: 'Sky → Cyan',      primary: '#0284C7', secondary: '#0891B2' },
];

const DEFAULT_PRESET = THEME_PRESETS[0];

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleDark: () => {},
  currentPreset: DEFAULT_PRESET,
  applyPreset: async () => {},
  themeHistory: [],
  restoreHistorical: async () => {},
  loading: true,
});

function applyModeVars(dark: boolean) {
  if (typeof document === 'undefined') return;
  const r = document.documentElement;
  if (dark) {
    r.style.setProperty('--bg', '#0a0118');
    r.style.setProperty('--bg-secondary', '#1a0a2e');
    r.style.setProperty('--glass-bg', 'rgba(255,255,255,0.08)');
    r.style.setProperty('--glass-border', 'rgba(255,255,255,0.15)');
    r.style.setProperty('--glass-highlight', 'rgba(255,255,255,0.12)');
    r.style.setProperty('--text-primary', '#FFFFFF');
    r.style.setProperty('--text-secondary', 'rgba(255,255,255,0.7)');
    r.style.setProperty('--text-muted', 'rgba(255,255,255,0.5)');
    r.style.setProperty('--navbar-bg', 'rgba(10,1,24,0.85)');
  } else {
    r.style.setProperty('--bg', '#f8f6ff');
    r.style.setProperty('--bg-secondary', '#ede8ff');
    r.style.setProperty('--glass-bg', 'rgba(0,0,0,0.04)');
    r.style.setProperty('--glass-border', 'rgba(0,0,0,0.12)');
    r.style.setProperty('--glass-highlight', 'rgba(0,0,0,0.06)');
    r.style.setProperty('--text-primary', '#1a0a2e');
    r.style.setProperty('--text-secondary', 'rgba(26,10,46,0.75)');
    r.style.setProperty('--text-muted', 'rgba(26,10,46,0.5)');
    r.style.setProperty('--navbar-bg', 'rgba(248,246,255,0.85)');
  }
}

function applyAccentVars(preset: ThemePreset) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--accent-primary', preset.primary);
  document.documentElement.style.setProperty('--accent-secondary', preset.secondary);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const savedMode = typeof window !== 'undefined' ? localStorage.getItem('theme-mode') : null;
  const [isDark, setIsDark] = useState(savedMode !== 'light');
  const [currentPreset, setCurrentPreset] = useState<ThemePreset>(DEFAULT_PRESET);
  const [themeHistory, setThemeHistory] = useState<ThemeHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applyModeVars(isDark);
    applyAccentVars(currentPreset);

    async function fetchTheme() {
      try {
        const data = await getDocumentData<ThemePreset>('themeSettings', 'main');
        if (data) {
          setCurrentPreset(data);
          applyAccentVars(data);
        }
        const hist = await getCollectionData<ThemeHistoryEntry>('themeHistory', 'order');
        setThemeHistory([...hist].reverse());
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    }
    fetchTheme();
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') localStorage.setItem('theme-mode', next ? 'dark' : 'light');
      applyModeVars(next);
      applyAccentVars(currentPreset);
      return next;
    });
  }, [currentPreset]);

  const applyPreset = useCallback(async (preset: ThemePreset) => {
    try {
      // Push current to history
      if (currentPreset.name) {
        const histEntry = {
          ...currentPreset,
          changedAt: new Date().toISOString(),
          order: Date.now(),
        };
        await addDocument('themeHistory', histEntry);
        // Trim to 10
        const all = await getCollectionData<ThemeHistoryEntry>('themeHistory', 'order');
        if (all.length > 10) {
          for (const old of all.slice(0, all.length - 10)) {
            await deleteDocument('themeHistory', old.id);
          }
        }
        const updated = await getCollectionData<ThemeHistoryEntry>('themeHistory', 'order');
        setThemeHistory([...updated].reverse());
      }
      // Save new preset
      await setDocument('themeSettings', 'main', preset);
    } catch {
      // proceed anyway
    }
    setCurrentPreset(preset);
    applyAccentVars(preset);
  }, [currentPreset]);

  const restoreHistorical = useCallback(async (entry: ThemeHistoryEntry) => {
    const preset: ThemePreset = { name: entry.name, primary: entry.primary, secondary: entry.secondary };
    await applyPreset(preset);
  }, [applyPreset]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, currentPreset, applyPreset, themeHistory, restoreHistorical, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
