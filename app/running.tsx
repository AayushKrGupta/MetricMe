import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

export default function RunningScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <MaterialIcons name="arrow-back-ios" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Running</Text>
        <View style={styles.headerRight}>
          <MaterialIcons name="schedule" size={20} color={Colors.text} />
          <Text style={styles.headerTime}>22 min</Text>
        </View>
      </View>

      <Animated.View entering={FadeIn.duration(300)} style={styles.mapArea}>
        <View style={styles.mapPath} />
        <View style={styles.marker}>
          <Text style={styles.markerText}>TIME 25 min</Text>
          <MaterialIcons name="place" size={40} color={Colors.primary} />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.balance}>
        <Text style={styles.balanceTitle}>Your daily balance</Text>
        <View style={styles.balanceRow}>
          <View style={styles.balanceItem}>
            <MaterialIcons name="directions-walk" size={24} color={Colors.primary} />
            <Text style={styles.balanceValue}>12,136</Text>
            <Text style={styles.balanceLabel}>steps</Text>
          </View>
          <View style={styles.balanceItem}>
            <MaterialIcons name="schedule" size={24} color={Colors.primary} />
            <Text style={styles.balanceValue}>7.24</Text>
            <Text style={styles.balanceLabel}>Duration</Text>
          </View>
          <View style={styles.balanceItem}>
            <MaterialIcons name="directions-run" size={24} color={Colors.primary} />
            <Text style={styles.balanceValue}>0.06</Text>
            <Text style={styles.balanceLabel}>Mile</Text>
          </View>
        </View>
      </Animated.View>

      <View style={[styles.actions, { paddingBottom: insets.bottom + Spacing.md }]}>
        <Pressable style={styles.actionBtn}>
          <MaterialIcons name="close" size={28} color={Colors.text} />
        </Pressable>
        <Pressable style={styles.pauseBtn}>
          <Text style={styles.pauseBtnText}>Pause</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <MaterialIcons name="lock" size={24} color={Colors.text} />
        </Pressable>
      </View>
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  headerTime: { fontSize: FontSize.sm, color: Colors.text },
  mapArea: {
    flex: 1,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPath: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 4,
    borderColor: Colors.primary,
    borderRadius: 200,
    margin: 40,
    opacity: 0.7,
  },
  marker: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    alignItems: 'center',
  },
  markerText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  balance: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.card,
    marginHorizontal: Spacing.md,
    borderRadius: Radius.lg,
  },
  balanceTitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  balanceItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  balanceValue: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  balanceLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xl,
    paddingTop: Spacing.md,
  },
  actionBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBtnText: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.background,
  },
});
