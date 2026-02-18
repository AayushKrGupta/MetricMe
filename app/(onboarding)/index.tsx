import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, FontSize, FontFamily } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const WELCOME_IMAGE = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800';

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const goToApp = () => router.replace('/(tabs)');

  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={{ uri: WELCOME_IMAGE }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <View style={[styles.overlay, { paddingTop: insets.top }]}>
        <View style={styles.badgeRow}>
          <MetricBadge label="Avg. 80 bpm" />
          <MetricBadge label="400 Cals burn" />
        </View>
        <View style={styles.copy}>
          <Text style={styles.line1}>Start your journey</Text>
          <Text style={styles.line2}>with + 8.94 more</Text>
          <Text style={styles.accent}>Next Steps Tracker</Text>
        </View>
      </View>
      <View
        style={[
          styles.footer,
          {
            paddingBottom: insets.bottom + Spacing.lg,
            paddingTop: Spacing.md,
          },
        ]}
      >
        <Pressable onPress={goToApp} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
        <Pressable onPress={goToApp} style={styles.nextCircleBtn}>
          <MaterialIcons name="arrow-forward" size={24} color={Colors.background} />
        </Pressable>
      </View>
    </View>
  );
}

function MetricBadge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    paddingBottom: 140,
    paddingHorizontal: Spacing.xl,
  },
  badgeRow: {
    position: 'absolute',
    top: 120,
    left: Spacing.xl,
    right: Spacing.xl,
    flexDirection: 'row',
    gap: Spacing.md,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 9999,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.background,
  },
  copy: {
    marginBottom: Spacing.lg,
  },
  line1: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  line2: {
    fontSize: FontSize.lg,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  accent: {
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.bold,
    fontStyle: 'italic',
    color: Colors.primary,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  skipBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.text,
  },
  nextCircleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
