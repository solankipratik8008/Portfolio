import React, { useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, NAVBAR_HEIGHT } from '../constants/theme';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import BuiltProjectsSection from '../components/BuiltProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Portfolio() {
  const scrollRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Record<string, number>>({});

  const handleLayout = useCallback(
    (sectionId: string) => (event: any) => {
      const { y } = event.nativeEvent.layout;
      sectionRefs.current[sectionId] = y;
    },
    []
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const y = sectionRefs.current[sectionId];
    if (y !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({
        y: y - NAVBAR_HEIGHT,
        animated: true,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.background, COLORS.backgroundSecondary, COLORS.background]}
        style={StyleSheet.absoluteFill}
      />

      <Navbar onNavPress={scrollToSection} />

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View onLayout={handleLayout('hero')}>
          <HeroSection onViewWork={() => scrollToSection('projects')} />
        </View>

        <View onLayout={handleLayout('about')}>
          <AboutSection />
        </View>

        <View onLayout={handleLayout('skills')}>
          <SkillsSection />
        </View>

        <View onLayout={handleLayout('projects')}>
          <ProjectsSection />
        </View>

        <View onLayout={handleLayout('built')}>
          <BuiltProjectsSection />
        </View>

        <View onLayout={handleLayout('experience')}>
          <ExperienceSection />
        </View>

        <View onLayout={handleLayout('education')}>
          <EducationSection />
        </View>

        <View onLayout={handleLayout('certifications')}>
          <CertificationsSection />
        </View>

        <View onLayout={handleLayout('testimonials')}>
          <TestimonialsSection />
        </View>

        <View onLayout={handleLayout('contact')}>
          <ContactSection />
        </View>

        <Footer onNavPress={scrollToSection} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
