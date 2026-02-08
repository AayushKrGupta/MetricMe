import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

const VOICE_ITEMS = ['Duration', 'Distance', 'Calorie', 'Pace'];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [voiceOn, setVoiceOn] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <MaterialIcons name="arrow-back-ios" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Setting</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + Spacing['2xl'] }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.row}>
          <Text style={styles.rowText}>Voice options (TTS)</Text>
          <MaterialIcons name="chevron-right" size={24} color={Colors.textSecondary} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(120).springify()} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Voice Feedback</Text>
            <Switch
              value={voiceOn}
              onValueChange={setVoiceOn}
              trackColor={{ false: Colors.surfaceElevated, true: Colors.primary }}
              thumbColor={Colors.text}
            />
          </View>
          {VOICE_ITEMS.map((label) => (
            <View key={label} style={styles.voiceItem}>
              <View style={styles.yellowDot} />
              <Text style={styles.voiceLabel}>{label}</Text>
            </View>
          ))}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(160).springify()} style={styles.card}>
          <Text style={styles.cardTitle}>Voice Feedback Interval</Text>
          <Pressable style={styles.dropdown}>
            <Text style={styles.dropdownText}>Duration 28 Minute</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.dropdown}>
            <Text style={styles.dropdownText}>Distance 9 Mile</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.dropdown}>
            <Text style={styles.dropdownText}>Unit mile</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.textSecondary} />
          </Pressable>
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
  headerRight: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
  },
  rowText: {
    fontSize: FontSize.base,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontFamily: FontFamily.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  voiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  yellowDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  voiceLabel: {
    fontSize: FontSize.base,
    color: Colors.text,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceElevated,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.lg,
    marginBottom: Spacing.sm,
  },
  dropdownText: {
    fontSize: FontSize.base,
    color: Colors.text,
  },
});
