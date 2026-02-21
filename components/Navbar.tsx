import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, NAVBAR_HEIGHT, MAX_WIDTH } from '../constants/theme';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  onNavPress: (sectionId: string) => void;
}

export default function Navbar({ onNavPress }: NavbarProps) {
  const { navLinks, personalInfo } = useData();
  const { isDark, toggleDark } = useTheme();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = (sectionId: string) => {
    onNavPress(sectionId);
    setMenuOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { backgroundColor: 'var(--navbar-bg)' as any }]}>
        <View style={styles.inner}>
          <Pressable onPress={() => handlePress('hero')}>
            <Text style={styles.logo}>
              {'< '}
              <Text style={styles.logoAccent}>{personalInfo.name.split(' ')[0]}</Text>
              {' />'}
            </Text>
          </Pressable>

          {isMobile ? (
            <View style={styles.mobileRight}>
              <Pressable onPress={toggleDark} style={styles.themeToggle}>
                <Ionicons
                  name={isDark ? 'sunny-outline' : 'moon-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </Pressable>
              <Pressable
                onPress={() => setMenuOpen(!menuOpen)}
                style={styles.hamburger}
              >
                <Ionicons
                  name={menuOpen ? 'close' : 'menu'}
                  size={28}
                  color={COLORS.textPrimary}
                />
              </Pressable>
            </View>
          ) : (
            <View style={styles.links}>
              {navLinks.map((link) => (
                <Pressable
                  key={link.sectionId}
                  onPress={() => handlePress(link.sectionId)}
                  style={({ hovered }: any) => [
                    styles.linkWrap,
                    hovered && styles.linkHovered,
                  ]}
                >
                  <Text style={styles.linkText}>{link.label}</Text>
                </Pressable>
              ))}
              <Pressable
                onPress={toggleDark}
                style={({ hovered }: any) => [styles.themeToggle, hovered && styles.linkHovered]}
              >
                <Ionicons
                  name={isDark ? 'sunny-outline' : 'moon-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {isMobile && menuOpen && (
        <View style={[styles.mobileMenu, { backgroundColor: 'var(--navbar-bg)' as any }]}>
          {navLinks.map((link) => (
            <Pressable
              key={link.sectionId}
              onPress={() => handlePress(link.sectionId)}
              style={styles.mobileLink}
            >
              <Text style={styles.mobileLinkText}>{link.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    ...(Platform.OS === 'web' ? { elevation: 9999 } : {}),
  } as any,
  container: {
    height: NAVBAR_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }
      : ({} as any)),
  } as any,
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: MAX_WIDTH,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: SPACING.lg,
  },
  logo: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.textSecondary,
    fontFamily: Platform.OS === 'web' ? 'monospace' : undefined,
  },
  logoAccent: {
    color: COLORS.accentPrimary,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  linkWrap: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
  },
  linkHovered: {
    backgroundColor: COLORS.glassBg,
  },
  linkText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.xs,
  },
  mobileRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburger: {
    padding: SPACING.sm,
  },
  mobileMenu: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
    paddingVertical: SPACING.md,
    zIndex: 9999,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', position: 'relative' as any }
      : ({} as any)),
  } as any,
  mobileLink: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  mobileLinkText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
