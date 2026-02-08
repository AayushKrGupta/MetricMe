import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  AnimatedCircularProgress,
  StatCard,
  DateSelector,
} from '@/components/pedometer';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const GOAL_STEPS = 10000;
const MOCK_STEPS = 5499;
const MOCK_DURATION = '2h.3m';
const MOCK_KCAL = '77.8';
const MOCK_MILES = '0.0';

export default function TodayScreen() {
  const insets = useSafeAreaInsets();
  const [paused, setPaused] = useState(false);
  const progress = MOCK_STEPS / GOAL_STEPS;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
          <View style={styles.menuBtn} />
          <Text style={styles.headerTitle}>Today</Text>
          <View style={styles.headerRight}>
            <Text style={styles.headerLabel}>Steps</Text>
            <View style={styles.stepsIcon}>
              <MaterialIcons name="directions-run" size={20} color={Colors.primary} />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.dateSection}>
          <DateSelector />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(120).springify()}
          style={styles.progressSection}
        >
          <View style={styles.progressRing}>
            <AnimatedCircularProgress
              progress={progress}
              size={240}
              strokeWidth={16}
            />
            <View style={styles.progressCenter}>
              <Pressable onPress={() => router.push('/(tabs)/report')} style={styles.reportLink}>
                <Text style={styles.reportLinkText}>Report &gt;</Text>
              </Pressable>
              <Text style={styles.stepCount}>{MOCK_STEPS.toLocaleString()}</Text>
              <Pressable
                onPress={() => setPaused((p) => !p)}
                style={[styles.pauseBtn, paused && styles.pauseBtnActive]}
              >
                <Text style={styles.pauseBtnText}>{paused ? 'Resume' : 'Paused'}</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>Exercise</Text>
          <View style={styles.statCards}>
            <StatCard
              value={MOCK_DURATION}
              label="Duration"
              icon={<MaterialIcons name="schedule" size={24} color={Colors.primary} />}
              size="large"
            />
            <StatCard
              value={MOCK_KCAL}
              label="Kcal"
              icon={<MaterialIcons name="local-fire-department" size={24} color={Colors.primary} />}
              size="large"
            />
            <StatCard
              value={MOCK_MILES}
              label="Mile"
              icon={<MaterialIcons name="directions-walk" size={24} color={Colors.textSecondary} />}
              size="large"
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    width: '100%',
    alignSelf: 'center',
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateSection: {
    width: '100%',
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: FontSize['2xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
    pointerEvents: 'none',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerLabel: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.text,
  },
  stepsIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    width: '100%',
  },
  progressRing: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportLink: {
    marginBottom: Spacing.xs,
  },
  reportLinkText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  stepCount: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
    letterSpacing: -1,
  },
  pauseBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
  },
  pauseBtnActive: {
    opacity: 0.9,
  },
  pauseBtnText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.background,
  },
  exerciseSection: {
    paddingTop: Spacing.lg,
    width: '100%',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
    alignSelf: 'flex-start',
  },
  statCards: {
    flexDirection: 'row',
    gap: Spacing.lg,
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
});
