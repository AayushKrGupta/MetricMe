import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';

const FLOATING_MARGIN_H = 56;
const FLOATING_MARGIN_BOTTOM = 14;
const TAB_BAR_HEIGHT = 58;
const TAB_BAR_RADIUS = 36;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const bottomSafe = insets.bottom || 16;
  const tabBarHeight = TAB_BAR_HEIGHT + bottomSafe;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.background,
        tabBarInactiveTintColor: Colors.text,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarStyle: {
          position: 'absolute',
          left: FLOATING_MARGIN_H,
          right: FLOATING_MARGIN_H,
          bottom: FLOATING_MARGIN_BOTTOM + bottomSafe,
          height: tabBarHeight,
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          borderRadius: TAB_BAR_RADIUS,
          paddingTop: 10,
          paddingHorizontal: 10,
          paddingBottom: bottomSafe,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.12)',
          ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.5,
              shadowRadius: 14,
            },
            android: { elevation: 24 },
          }),
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              focused={focused}
              label="Today"
              icon="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              focused={focused}
              label="Report"
              icon="bar-chart"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Training',
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              focused={focused}
              label="Training"
              icon="map"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              focused={focused}
              label="Profile"
              icon="person-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}

function TabItem({
  focused,
  label,
  icon,
  color,
}: {
  focused: boolean;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
}) {
  const iconSize = 22;
  const slide = useSharedValue(focused ? 1 : 0);

  useEffect(() => {
    slide.value = withSpring(focused ? 1 : 0, {
      damping: 18,
      stiffness: 180,
    });
  }, [focused]);

  const labelAnimatedStyle = useAnimatedStyle(() => ({
    opacity: slide.value,
    transform: [{ translateX: (1 - slide.value) * -12 }],
    overflow: 'hidden',
  }));

  if (focused) {
    return (
      <View style={styles.activePill}>
        <MaterialIcons
          name={icon}
          size={iconSize}
          color={Colors.background}
        />
        <Animated.View style={[styles.labelWrap, labelAnimatedStyle]}>
          <Text style={styles.activeLabel} numberOfLines={1}>
            {label}
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.inactiveWrap}>
      <MaterialIcons name={icon} size={iconSize} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 24,
    gap: 8,
  },
  labelWrap: {
    justifyContent: 'center',
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.background,
  },
  inactiveWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
