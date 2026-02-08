import React, { useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient, Stop, Line, Circle } from 'react-native-svg';
import { Colors, Spacing, FontSize } from '@/constants/theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - Spacing.md * 4;
const CHART_HEIGHT = 160;
const PADDING = { left: 8, right: 8, top: 8, bottom: 24 };

type Props = {
  data: number[];
  labels?: string[];
  color?: string;
  duration?: number;
  highlightedIndex?: number;
};

export function LineChart({
  data,
  labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  color = Colors.primary,
  duration = 800,
  highlightedIndex,
}: Props) {
  const progress = useSharedValue(0);
  const max = useMemo(() => Math.max(...data, 1), [data]);
  const min = useMemo(() => Math.min(...data, 0), [data]);
  const range = max - min || 1;
  const graphWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const graphHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const stepX = data.length > 1 ? graphWidth / (data.length - 1) : graphWidth;

  const highlightPoint = useMemo(() => {
    if (highlightedIndex == null || highlightedIndex < 0 || highlightedIndex >= data.length) return null;
    const x = PADDING.left + highlightedIndex * stepX;
    const y = PADDING.top + graphHeight - ((data[highlightedIndex] - min) / range) * graphHeight;
    return { x, y };
  }, [data, highlightedIndex, min, range, stepX]);

  React.useEffect(() => {
    progress.value = withTiming(1, { duration, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  }, [data]);

  const linePath = useMemo(() => {
    return data
      .map((value, i) => {
        const x = PADDING.left + i * stepX;
        const y = PADDING.top + graphHeight - ((value - min) / range) * graphHeight;
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(' ');
  }, [data, min, range, stepX]);

  const areaPath = useMemo(() => {
    const line = linePath;
    const lastX = PADDING.left + (data.length - 1) * stepX;
    const bottomY = CHART_HEIGHT - PADDING.bottom;
    return `${line} L ${lastX} ${bottomY} L ${PADDING.left} ${bottomY} Z`;
  }, [linePath, data.length, stepX]);

  const animatedLineProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [1000, 1000],
      strokeDashoffset: 1000 * (1 - progress.value),
    };
  });

  const animatedAreaProps = useAnimatedProps(() => {
    return {
      opacity: progress.value * 0.4,
    };
  });

  return (
    <View style={styles.wrapper}>
      <Svg width={CHART_WIDTH} height={CHART_HEIGHT} viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
        <Defs>
          <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.5" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <AnimatedPath
          d={areaPath}
          fill="url(#chartGradient)"
          animatedProps={animatedAreaProps}
        />
        <AnimatedPath
          d={linePath}
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
          animatedProps={animatedLineProps}
        />
        {highlightPoint != null && (
          <>
            <Line
              x1={highlightPoint.x}
              y1={highlightPoint.y}
              x2={highlightPoint.x}
              y2={CHART_HEIGHT - PADDING.bottom}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <Circle
              cx={highlightPoint.x}
              cy={highlightPoint.y}
              r={5}
              fill={color}
            />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: Spacing.md,
  },
});
