import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors, Spacing, Radius, FontSize } from '@/constants/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type DayItem = { date: number; dayName: string; month: string; isSelected?: boolean };

function buildWeekDates(selectedIndex: number): DayItem[] {
  const items: DayItem[] = [];
  const today = new Date();
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    items.push({
      date: d.getDate(),
      dayName: DAYS[d.getDay()],
      month: d.toLocaleString('en', { month: 'short' }),
      isSelected: i === 0,
    });
  }
  return items;
}

type Props = {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
};

export function DateSelector({ selectedDate, onSelectDate }: Props) {
  const dates = React.useMemo(() => buildWeekDates(0), []);
  const [selected, setSelected] = React.useState(3); // today index

  const handleSelect = (index: number, item: DayItem) => {
    setSelected(index);
    const d = new Date();
    d.setDate(d.getDate() + (index - 3));
    onSelectDate?.(d);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
    >
      {dates.map((item, index) => (
        <DateChip
          key={`${item.date}-${item.dayName}`}
          dateStr={String(item.date).padStart(2, '0')}
          dayName={item.dayName}
          isSelected={selected === index}
          onPress={() => handleSelect(index, item)}
        />
      ))}
    </ScrollView>
  );
}

function DateChip({
  dateStr,
  dayName,
  isSelected,
  onPress,
}: {
  dateStr: string;
  dayName: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  const progress = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isSelected ? 1 : 0, { damping: 20, stiffness: 200 });
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', Colors.primary]
    ),
  }));

  return (
    <Animated.View style={[styles.chip, animatedStyle]}>
      <Pressable onPress={onPress} style={styles.chipPress}>
        <Text style={[styles.chipDate, isSelected ? styles.chipTextSelected : styles.chipText]}>{dateStr}</Text>
        <Text style={[styles.chipDay, isSelected ? styles.chipTextSelected : styles.chipText]}>{dayName}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  chip: {
    borderRadius: Radius.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minWidth: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipPress: { alignItems: 'center' },
  chipDay: {
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  chipDate: {
    fontSize: FontSize.base,
    fontWeight: '700',
    marginTop: 2,
  },
  chipText: { color: Colors.textSecondary },
  chipTextSelected: { color: Colors.background },
});
