import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Colors, Radius } from '@/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SPRING_CONFIG = { damping: 18, stiffness: 120 };

type Props = {
  progress: number; // 0..1
  size?: number;
  strokeWidth?: number;
  backgroundColor?: string;
  progressColor?: string;
};

export function AnimatedCircularProgress({
  progress,
  size = 240,
  strokeWidth = 16,
  backgroundColor = Colors.surfaceElevated,
  progressColor = Colors.primary,
}: Props) {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withSpring(Math.min(1, Math.max(0, progress)), SPRING_CONFIG);
  }, [progress]);

  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return { strokeDashoffset };
  });

  return (
    <View style={[styles.wrapper, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          animatedProps={animatedProps}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
