import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LineChart, ReportSummaryCard } from '@/components/pedometer';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const REPORT_TABS = ['Step', 'Calorie', 'Time', 'Distance'] as const;
const PERIOD_TABS = ['Day', 'Week', 'Month', 'Year'] as const;
const WALKING_DATA = [3200, 5400, 2800, 6100, 4900, 7200, 5499];
const CHART_LABELS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Th'];

const SECTION_TITLES: Record<(typeof REPORT_TABS)[number], string> = {
  Step: 'Walking',
  Calorie: 'Calories',
  Time: 'Duration',
  Distance: 'Distance',
};

const SUMMARY_CARDS: Record<(typeof REPORT_TABS)[number], [{ title: string; value: string; label: string; progress: number; icon: 'directions-walk' | 'local-fire-department' | 'schedule' | 'straighten' | 'water-drop' }, { title: string; value: string; label: string; progress: number; icon: 'directions-walk' | 'local-fire-department' | 'schedule' | 'straighten' | 'water-drop' }]> = {
  Step: [
    { title: 'Walk', value: '13.99', label: 'Total', progress: 0.72, icon: 'directions-walk' },
    { title: 'Water', value: '12.00mL', label: 'Average', progress: 0.5, icon: 'water-drop' },
  ],
  Calorie: [
    { title: 'Burn', value: '2,340', label: 'Total kcal', progress: 0.68, icon: 'local-fire-department' },
    { title: 'Daily', value: '334', label: 'Average', progress: 0.45, icon: 'local-fire-department' },
  ],
  Time: [
    { title: 'Active', value: '2h 18m', label: 'Total', progress: 0.6, icon: 'schedule' },
    { title: 'Avg', value: '22m', label: 'Per day', progress: 0.4, icon: 'schedule' },
  ],
  Distance: [
    { title: 'Miles', value: '8.42', label: 'Total', progress: 0.7, icon: 'straighten' },
    { title: 'Avg', value: '1.2 mi', label: 'Per day', progress: 0.35, icon: 'straighten' },
  ],
};

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  const [activeReport, setActiveReport] = useState<(typeof REPORT_TABS)[number]>('Step');
  const [activePeriod, setActivePeriod] = useState<(typeof PERIOD_TABS)[number]>('Week');

  const sectionTitle = SECTION_TITLES[activeReport];
  const cards = SUMMARY_CARDS[activeReport];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View entering={FadeIn.duration(200)} style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Report</Text>
        <Pressable style={styles.headerRight}>
          <MaterialIcons name="edit" size={22} color={Colors.text} />
        </Pressable>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.tabs}>
          {REPORT_TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveReport(tab)}
              style={[styles.tab, activeReport === tab && styles.tabActive]}
            >
              <Text style={[styles.tabText, activeReport === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </Pressable>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.summaryRow}>
          <ReportSummaryCard
            title={cards[0].title}
            value={cards[0].value}
            label={cards[0].label}
            progress={cards[0].progress}
            icon={cards[0].icon}
          />
          <ReportSummaryCard
            title={cards[1].title}
            value={cards[1].value}
            label={cards[1].label}
            progress={cards[1].progress}
            icon={cards[1].icon}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{sectionTitle}</Text>
            <View style={styles.dateRow}>
              <Pressable style={styles.chevronBtn}>
                <MaterialIcons name="chevron-left" size={20} color={Colors.textSecondary} />
              </Pressable>
              <Text style={styles.dateRange}>Jul28 - Aug 4</Text>
              <Pressable style={styles.chevronPill}>
                <MaterialIcons name="chevron-right" size={20} color={Colors.background} />
              </Pressable>
            </View>
          </View>
          <View style={styles.periodTabs}>
            {PERIOD_TABS.map((tab) => (
              <Pressable
                key={tab}
                onPress={() => setActivePeriod(tab)}
                style={[styles.periodTab, activePeriod === tab && styles.periodTabActive]}
              >
                <Text style={[styles.periodTabText, activePeriod === tab && styles.periodTabTextActive]}>
                  {tab}
                </Text>
              </Pressable>
            ))}
          </View>
          <LineChart
            data={WALKING_DATA}
            labels={CHART_LABELS}
            highlightedIndex={3}
          />
          <View style={styles.xAxis}>
            {CHART_LABELS.map((l) => (
              <Text key={l} style={styles.xAxisLabel}>{l}</Text>
            ))}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  headerLeft: { width: 40 },
  headerTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  headerRight: {
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md },
  tabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.text,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dateRange: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  chevronBtn: {
    padding: Spacing.xs,
  },
  chevronPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  periodTabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  periodTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.xl,
    backgroundColor: Colors.surfaceElevated,
  },
  periodTabActive: {
    backgroundColor: Colors.primary,
  },
  periodTabText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  periodTabTextActive: {
    color: Colors.text,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: -8,
  },
  xAxisLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    width: 40,
    textAlign: 'center',
  },
});
