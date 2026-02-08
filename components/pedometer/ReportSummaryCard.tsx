import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AnimatedCircularProgress } from './AnimatedCircularProgress';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';

type Props = {
  title: string;
  value: string;
  label: string;
  progress: number; // 0..1
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};

export function ReportSummaryCard({ title, value, label, progress, icon }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <MaterialIcons name={icon} size={18} color={Colors.primary} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.ringWrap}>
        <AnimatedCircularProgress
          progress={progress}
          size={72}
          strokeWidth={6}
          progressColor={Colors.primary}
        />
        <View style={styles.ringCenter}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    minHeight: 140,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  ringWrap: {
    position: 'relative',
    marginVertical: Spacing.xs,
  },
  ringCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
