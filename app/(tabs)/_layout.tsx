import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';

const TAB_BAR_BASE_HEIGHT = 64;
const ACTIVE_ICON_BG_SIZE = 48;
const ACTIVE_ICON_BG_RADIUS = 14;

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = TAB_BAR_BASE_HEIGHT + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: Colors.surfaceElevated,
          borderTopWidth: 0,
          height: tabBarHeight,
          paddingTop: 8,
          paddingBottom: insets.bottom,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.2, shadowRadius: 12 },
            android: { elevation: 16 },
          }),
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
              <MaterialIcons
                name="home"
                size={24}
                color={focused ? Colors.background : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => <MaterialIcons name="bar-chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tracker"
        options={{
          title: 'Training',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
              <MaterialIcons
                name="map"
                size={24}
                color={focused ? Colors.background : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.activeIconWrap]}>
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ? Colors.background : color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: ACTIVE_ICON_BG_SIZE,
    height: ACTIVE_ICON_BG_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrap: {
    backgroundColor: Colors.primary,
    borderRadius: ACTIVE_ICON_BG_RADIUS,
  },
});
