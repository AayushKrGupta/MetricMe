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
import { LineChart, StatCard } from '@/components/pedometer';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

const REPORT_TABS = ['Step', 'Calorie', 'Time', 'Distance'] as const;
const PERIOD_TABS = ['Day', 'Week', 'Month', 'Year'] as const;
const WALKING_DATA = [3200, 5400, 2800, 6100, 4900, 7200, 5499];

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  const [activeReport, setActiveReport] = useState<(typeof REPORT_TABS)[number]>('Step');
  const [activePeriod, setActivePeriod] = useState<(typeof PERIOD_TABS)[number]>('Week');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Animated.View entering={FadeIn.duration(200)} style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Report</Text>
        <Pressable style={styles.headerRight}>
          <MaterialIcons name="ios-share" size={24} color={Colors.text} />
        </Pressable>
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing['2xl'] }]}
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
          <StatCard
            title="Walk"
            value="13.99"
            label="Total"
            icon={<MaterialIcons name="directions-walk" size={20} color={Colors.primary} />}
            style={styles.summaryCard}
          />
          <StatCard
            title="Water"
            value="12.00"
            label="Average"
            icon={<MaterialIcons name="water-drop" size={20} color={Colors.primary} />}
            style={styles.summaryCard}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.walkingSection}>
          <View style={styles.walkingHeader}>
            <Text style={styles.sectionTitle}>Walking</Text>
            <Text style={styles.dateRange}>&lt; Jul 28 - Aug 4 &gt;</Text>
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
          <LineChart data={WALKING_DATA} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
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
    fontWeight: '700',
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
    borderRadius: Radius.lg,
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
    color: Colors.background,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  summaryCard: {
    flex: 1,
  },
  walkingSection: {
    marginBottom: Spacing.xl,
  },
  walkingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  dateRange: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  periodTabs: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  periodTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
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
    color: Colors.background,
  },
});
