import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const GROUP_1 = [
  { icon: 'emoji-events' as const, label: 'Achievements', badge: '3k', href: null },
  { icon: 'person-outline' as const, label: 'Personal Info', href: null },
];

const GROUP_2 = [
  { icon: 'pause-circle-outline' as const, label: 'Pause Step Tracker', toggle: true as const, href: null },
  { icon: 'notifications-none' as const, label: 'Reminder', href: null },
];

const GROUP_3 = [
  { icon: 'water-drop' as const, label: 'Water Tracker', href: '/water-tracker' },
  { icon: 'language' as const, label: 'Language', suffix: 'English', href: null },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(60).springify()} style={styles.profileSection}>
          <View style={styles.avatarCircle}>
            <MaterialIcons name="person" size={56} color={Colors.textSecondary} />
          </View>
          <Text style={styles.userName}>User Name</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
          <Text style={styles.sectionHeader}>ACCOUNT</Text>
          <View style={styles.group}>
            {GROUP_1.map((item, i) => (
              <Row key={item.label} item={item} isFirst={i === 0} isLast={i === GROUP_1.length - 1} />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(140).springify()} style={styles.section}>
          <Text style={styles.sectionHeader}>PREFERENCES</Text>
          <View style={styles.group}>
            {GROUP_2.map((item, i) => (
              <Row key={item.label} item={item} isFirst={i === 0} isLast={i === GROUP_2.length - 1} />
            ))}
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(180).springify()} style={styles.section}>
          <Text style={styles.sectionHeader}>MORE</Text>
          <View style={styles.group}>
            {GROUP_3.map((item, i) => (
              <Row key={item.label} item={item} isFirst={i === 0} isLast={i === GROUP_3.length - 1} />
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

type RowItem = {
  icon: string;
  label: string;
  badge?: string;
  suffix?: string;
  toggle?: boolean;
  href: string | null;
};

function Row({
  item,
  isFirst,
  isLast,
}: {
  item: RowItem;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <Pressable
      style={[
        styles.row,
        isFirst && styles.rowFirst,
        isLast && styles.rowLast,
        !isLast && styles.rowBorder,
      ]}
      onPress={() => item.href != null && router.push(item.href as any)}
    >
      <View style={styles.rowLeft}>
        <MaterialIcons
          name={item.icon as any}
          size={22}
          color={item.label === 'Achievements' ? Colors.primary : Colors.textSecondary}
        />
        <Text style={styles.rowLabel}>{item.label}</Text>
        {item.badge != null && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.rowRight}>
        {item.toggle === true ? (
          <Switch
            value={false}
            onValueChange={() => {}}
            trackColor={{ false: Colors.surfaceElevated, true: Colors.primary }}
            thumbColor={Colors.text}
          />
        ) : (
          <>
            {item.suffix != null && (
              <Text style={styles.suffixText}>{item.suffix}</Text>
            )}
            {item.href != null || item.suffix != null ? (
              <MaterialIcons name="chevron-right" size={20} color={Colors.textMuted} />
            ) : null}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.card,
    borderWidth: 3,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  section: {
    marginBottom: Spacing.xl,
    width: '100%',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.2,
    marginBottom: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  group: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
  },
  rowFirst: {
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
  },
  rowLast: {
    borderBottomLeftRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
  rowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  rowLabel: {
    fontSize: FontSize.base,
    color: Colors.text,
    flex: 1,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.background,
  },
  suffixText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
});
