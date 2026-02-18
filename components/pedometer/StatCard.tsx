import React from 'react';
import { View, Text, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  value: string;
  label: string;
  title?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  index?: number;
  size?: 'default' | 'large';
};

export function StatCard({ value, label, title, icon, style, index = 0, size = 'default' }: Props) {
  const scale = useSharedValue(0.92);
  const opacity = useSharedValue(0.6);

  useFocusEffect(
    React.useCallback(() => {
      scale.value = withSpring(1, { damping: 18, stiffness: 120 });
      opacity.value = withTiming(1, { duration: 300 });
      return () => {
        scale.value = withTiming(0.92);
        opacity.value = withTiming(0.6);
      };
    }, [])
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <AnimatedView style={[styles.card, size === 'large' && styles.cardLarge, style, animatedStyle]}>
      {(icon != null || title != null) && (
        <View style={styles.topRow}>
          {icon != null && <View>{icon}</View>}
          {title != null && <Text style={styles.title}>{title}</Text>}
        </View>
      )}
      <Text style={[styles.value, size === 'large' && styles.valueLarge]} numberOfLines={1}>{value}</Text>
      <Text style={[styles.label, size === 'large' && styles.labelLarge]} numberOfLines={1}>{label}</Text>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLarge: {
    padding: Spacing.lg,
    minWidth: 116,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, marginBottom: Spacing.xs },
  title: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  value: {
    fontSize: FontSize['2xl'],
    fontWeight: '700',
    color: Colors.text,
  },
  valueLarge: {
    fontSize: FontSize['3xl'],
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  labelLarge: {
    fontSize: FontSize.base,
    marginTop: Spacing.sm,
  },
});
