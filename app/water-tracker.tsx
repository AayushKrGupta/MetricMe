import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RING_SIZE = 220;
const RING_STROKE = 14;
const RING_R = (RING_SIZE - RING_STROKE) / 2;
const BAR_DATA = [40, 65, 30, 80, 45, 90, 48];

export default function WaterTrackerScreen() {
  const insets = useSafeAreaInsets();
  const [oz, setOz] = useState(48);
  const progress = oz / 100;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <MaterialIcons name="arrow-back-ios" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Water Tracker</Text>
        <Pressable style={styles.headerBtn}>
          <MaterialIcons name="notifications-none" size={24} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing['2xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(300)} style={styles.ringSection}>
          <View style={styles.ringHeader}>
            <Text style={styles.ringHeaderText}>Today</Text>
            <Text style={styles.ringHeaderOz}>48 oz</Text>
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
                <Text style={styles.ringValue}>{oz}</Text>
                <MaterialIcons name="water-drop" size={32} color={Colors.primary} />
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
            <Text style={styles.chartRange}>&lt; July 2025 &gt;</Text>
          </View>
          <View style={styles.barChart}>
            {BAR_DATA.map((h, i) => (
              <View key={i} style={styles.barWrap}>
                <View
                  style={[
                    styles.bar,
                    { height: (h / 100) * 120 },
                    i === BAR_DATA.length - 1 && styles.barActive,
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.chartFooter}>
            <Text style={styles.chartFooterText}>12% Average (1kg)</Text>
            <Text style={styles.chartFooterValue}>48 mL</Text>
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
  ringSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  ringHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  ringHeaderText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  ringHeaderOz: { fontSize: FontSize.sm, color: Colors.text },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  ringBtn: {
    width: 48,
    height: 48,
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
  },
  ringValue: {
    fontSize: FontSize['4xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
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
    marginBottom: Spacing.lg,
  },
  chartTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  chartRange: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    gap: Spacing.sm,
  },
  barWrap: {
    flex: 1,
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '80%',
    minHeight: 8,
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radius.sm,
    borderTopRightRadius: Radius.sm,
  },
  barActive: {
    backgroundColor: Colors.primary,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.md,
  },
  chartFooterText: { fontSize: FontSize.sm, color: Colors.textSecondary },
  chartFooterValue: { fontSize: FontSize.sm, color: Colors.text },
});
