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
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const SETTINGS_ITEMS = [
  { icon: 'emoji-events', label: 'Achievements', badge: '3k', href: null },
  { icon: 'person-outline', label: 'Personal info', suffix: 'V', href: null },
  { icon: 'tune', label: 'Sensitivity', suffix: 'V', href: null },
  { icon: 'block', label: 'Stop', href: null },
  { icon: 'pause-circle-outline', label: 'Pause Step Tracker', toggle: true, href: null },
  { icon: 'backup', label: 'Backup & Restore', sub: 'G', href: null },
  { icon: 'notifications-none', label: 'Reminder', href: null },
  { icon: 'water-drop', label: 'Water Tracker', suffix: 'V', href: '/water-tracker' },
  { icon: 'language', label: 'Language option', suffix: 'English V', href: null },
] as const;

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable style={styles.headerBtn} hitSlop={12}>
          <MaterialIcons name="menu" size={24} color={Colors.textSecondary} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable
          onPress={() => router.push('/settings')}
          style={styles.headerBtn}
          hitSlop={12}
        >
          <MaterialIcons name="settings" size={24} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.inviteCard}>
          <Text style={styles.inviteTitle}>Invite friend, Get Reward!</Text>
          <Pressable style={styles.inviteBtn}>
            <Text style={styles.inviteBtnText}>Invite</Text>
          </Pressable>
          <View style={styles.coinsWrap}>
            <MaterialIcons name="monetization-on" size={48} color={Colors.primary} />
            <MaterialIcons name="monetization-on" size={40} color={Colors.primary} style={styles.coin2} />
            <MaterialIcons name="monetization-on" size={36} color={Colors.primary} style={styles.coin3} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.settingsList}>
          {SETTINGS_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={styles.settingsRow}
              onPress={() => item.href != null && router.push(item.href as any)}
            >
              <View style={styles.settingsRowLeft}>
                {item.icon === 'backup' ? (
                  <View style={styles.gIcon}>
                    <Text style={styles.gIconText}>G</Text>
                  </View>
                ) : (
                  <MaterialIcons
                    name={item.icon as any}
                    size={22}
                    color={item.label === 'Achievements' ? Colors.primary : Colors.textSecondary}
                  />
                )}
                <Text style={styles.settingsLabel}>{item.label}</Text>
                {item.badge != null && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>
              <View style={styles.settingsRowRight}>
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
                    <MaterialIcons name="chevron-right" size={22} color={Colors.textSecondary} />
                  </>
                )}
              </View>
            </Pressable>
          ))}
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
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md },
  inviteCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  inviteTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  inviteBtn: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.lg,
  },
  inviteBtnText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.background,
  },
  coinsWrap: {
    position: 'absolute',
    right: Spacing.lg,
    bottom: Spacing.lg,
  },
  coin2: { position: 'absolute', left: 28, top: -4 },
  coin3: { position: 'absolute', left: 52, top: 8 },
  settingsList: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    overflow: 'hidden',
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  settingsLabel: {
    fontSize: FontSize.base,
    color: Colors.text,
    flex: 1,
  },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.background,
  },
  suffixText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  gIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gIconText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.text,
  },
});
