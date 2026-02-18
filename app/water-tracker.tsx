import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const RING_SIZE = 240;
const RING_STROKE = 14;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const BAR_HEIGHT = 100;
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const BAR_DATA = [35, 42, 38, 90, 45, 55, 48]; // Thu (index 3) tallest

export default function WaterTrackerScreen() {
  const insets = useSafeAreaInsets();
  const [oz, setOz] = useState(48);
  const progress = Math.min(1, oz / 100);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <MaterialIcons name="arrow-back-ios" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Water Tracker</Text>
        <Pressable style={styles.headerBtn}>
          <MaterialIcons name="settings" size={24} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing['2xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(300)} style={styles.todaySection}>
          <View style={styles.todayHeader}>
            <Text style={styles.todayTitle}>Today</Text>
            <View style={styles.notificationPill}>
              <Text style={styles.notificationText}>notification</Text>
            </View>
          </View>
          <View style={styles.ringRow}>
            <Pressable onPress={() => setOz((v) => Math.max(0, v - 8))} style={styles.ringBtn}>
              <MaterialIcons name="remove" size={32} color={Colors.text} />
            </Pressable>
            <View style={styles.ringWrap}>
              <Svg width={RING_SIZE} height={RING_SIZE}>
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_R}
                  stroke={Colors.surfaceElevated}
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                />
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_R}
                  stroke={Colors.primary}
                  strokeWidth={RING_STROKE}
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * RING_R * progress} ${2 * Math.PI * RING_R}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
                />
              </Svg>
              <View style={styles.ringCenter}>
                <Text style={styles.ringSubtext}>48 fl oz</Text>
                <Text style={styles.ringValue}>{oz}</Text>
                <MaterialIcons name="water-drop" size={36} color={Colors.primary} style={styles.glassIcon} />
              </View>
            </View>
            <Pressable onPress={() => setOz((v) => Math.min(100, v + 8))} style={styles.ringBtn}>
              <MaterialIcons name="add" size={32} color={Colors.text} />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Water (mL)</Text>
            <View style={styles.calendarRow}>
              <Text style={styles.chartRange}>July 2025</Text>
              <MaterialIcons name="calendar-today" size={18} color={Colors.textSecondary} />
            </View>
          </View>
          <View style={styles.averageRow}>
            <MaterialIcons name="water-drop" size={18} color={Colors.primary} />
            <Text style={styles.averageText}>12% Average (1 oz)</Text>
            <View style={styles.dateRow}>
              <Pressable style={styles.chevronBtn}>
                <MaterialIcons name="chevron-left" size={18} color={Colors.textSecondary} />
              </Pressable>
              <Text style={styles.dateRange}>Jul 28 - Aug 4</Text>
              <Pressable style={styles.chevronPill}>
                <MaterialIcons name="chevron-right" size={18} color={Colors.background} />
              </Pressable>
            </View>
          </View>
          <View style={styles.barChart}>
            {BAR_DATA.map((h, i) => (
              <View key={i} style={styles.barCol}>
                {i === 3 && (
                  <View style={styles.bubble}>
                    <Text style={styles.bubbleText}>48 mL</Text>
                  </View>
                )}
                <View
                  style={[
                    styles.bar,
                    { height: (h / 100) * BAR_HEIGHT },
                    i === 3 && styles.barActive,
                  ]}
                />
                <Text style={styles.barLabel}>{DAYS[i]}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  headerBtn: { padding: Spacing.sm },
  headerTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md },
  todaySection: {
    marginBottom: Spacing.xl,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  todayTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  notificationPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
  },
  notificationText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.background,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  ringBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringSubtext: {
    fontSize: FontSize.sm,
    color: Colors.text,
    marginBottom: 2,
  },
  ringValue: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  glassIcon: {
    marginTop: Spacing.sm,
  },
  chartSection: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  chartTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  calendarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chartRange: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  averageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
    flexWrap: 'wrap',
  },
  averageText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginLeft: 'auto',
  },
  chevronBtn: { padding: 2 },
  dateRange: { fontSize: FontSize.xs, color: Colors.textSecondary },
  chevronPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: BAR_HEIGHT + 28,
    gap: 4,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bubble: {
    position: 'absolute',
    top: -22,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  bubbleText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.background,
  },
  bar: {
    width: '85%',
    minHeight: 6,
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radius.sm,
    borderTopRightRadius: Radius.sm,
  },
  barActive: {
    backgroundColor: Colors.primary,
  },
  barLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 6,
  },
});
