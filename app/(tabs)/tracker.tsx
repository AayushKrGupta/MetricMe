import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from '@/components/pedometer';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const TARGET_MILES = 2.1;
const TARGET_MAX = 5;

export default function TrackerScreen() {
  const insets = useSafeAreaInsets();
  const [miles, setMiles] = useState(TARGET_MILES);
  const progress = miles / TARGET_MAX;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>Tracker</Text>
        <Pressable style={styles.headerRight}>
          <MaterialIcons name="add" size={28} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.card}>
          <Text style={styles.cardTitle}>Target Distance</Text>
          <Pressable style={styles.dropdown}>
            <Text style={styles.dropdownText}>Walk</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.textSecondary} />
          </Pressable>
          <View style={styles.ringRow}>
            <Pressable
              onPress={() => setMiles((m) => Math.max(0, m - 0.1))}
              style={styles.ringBtn}
            >
              <MaterialIcons name="remove" size={28} color={Colors.text} />
            </Pressable>
            <View style={styles.ringWrap}>
              <AnimatedCircularProgress progress={progress} size={180} strokeWidth={14} />
              <View style={styles.ringCenter}>
                <Text style={styles.ringValue}>{miles.toFixed(1)}</Text>
                <Text style={styles.ringLabel}>miles</Text>
              </View>
            </View>
            <Pressable
              onPress={() => setMiles((m) => Math.min(TARGET_MAX, m + 0.1))}
              style={styles.ringBtn}
            >
              <MaterialIcons name="add" size={28} color={Colors.text} />
            </Pressable>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.card}>
          <Text style={styles.cardTitle}>Location</Text>
          <Pressable style={styles.trackBtn} onPress={() => router.push('/running')}>
            <Text style={styles.trackBtnText}>Track</Text>
          </Pressable>
          <View style={styles.mapPlaceholder}>
            <View style={styles.mapPath} />
            <Text style={styles.mapLabel}>FIVE POINTS</Text>
            <Text style={[styles.mapLabel, styles.mapLabelVancouver]}>Vancouver</Text>
            <MaterialIcons name="place" size={32} color={Colors.primary} style={styles.mapPin} />
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
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceElevated,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.lg,
  },
  dropdownText: {
    fontSize: FontSize.base,
    color: Colors.text,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  ringBtn: {
    width: 44,
    height: 44,
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
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  ringLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  trackBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
  },
  trackBtnText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.background,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPath: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 40,
    borderWidth: 3,
    borderColor: Colors.primary,
    borderRadius: 100,
    opacity: 0.6,
  },
  mapLabel: {
    position: 'absolute',
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    top: Spacing.sm,
    left: Spacing.md,
  },
  mapLabelVancouver: {
    top: undefined,
    bottom: Spacing.sm,
    right: Spacing.md,
    left: undefined,
  },
  mapPin: {
    position: 'absolute',
    bottom: 60,
    right: 40,
  },
});
