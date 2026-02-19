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
import { NAV_LINKS, PERSONAL_INFO } from '../constants/data';

interface NavbarProps {
  onNavPress: (sectionId: string) => void;
}

export default function Navbar({ onNavPress }: NavbarProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePress = (sectionId: string) => {
    onNavPress(sectionId);
    setMenuOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <Pressable onPress={() => handlePress('hero')}>
            <Text style={styles.logo}>
              {'< '}
              <Text style={styles.logoAccent}>{PERSONAL_INFO.name.split(' ')[0]}</Text>
              {' />'}
            </Text>
          </Pressable>

          {isMobile ? (
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
          ) : (
            <View style={styles.links}>
              {NAV_LINKS.map((link) => (
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
            </View>
          )}
        </View>
      </View>

      {isMobile && menuOpen && (
        <View style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
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
    zIndex: 1000,
  },
  container: {
    height: NAVBAR_HEIGHT,
    backgroundColor: 'rgba(10, 1, 24, 0.85)',
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
  hamburger: {
    padding: SPACING.sm,
  },
  mobileMenu: {
    backgroundColor: 'rgba(10, 1, 24, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.glassBorder,
    paddingVertical: SPACING.md,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }
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
