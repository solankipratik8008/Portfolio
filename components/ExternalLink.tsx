import React from 'react';
import { Pressable, Platform, Linking, StyleProp, ViewStyle } from 'react-native';

interface ExternalLinkProps {
  href: string;
  style?: StyleProp<ViewStyle> | ((state: any) => StyleProp<ViewStyle>);
  children: React.ReactNode;
}

export default function ExternalLink({ href, style, children }: ExternalLinkProps) {
  if (Platform.OS === 'web') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Pressable style={style}>
          {children}
        </Pressable>
      </a>
    );
  }

  return (
    <Pressable onPress={() => Linking.openURL(href)} style={style}>
      {children}
    </Pressable>
  );
}
