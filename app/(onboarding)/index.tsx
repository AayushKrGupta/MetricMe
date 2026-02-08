import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors, Spacing, Radius, FontSize, FontFamily } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SLIDE_1_IMAGE = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800';
const SLIDE_2_IMAGE = 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800';

type SlideItem = { id: string; type: 1 | 2 };

const SLIDES: SlideItem[] = [{ id: '1', type: 1 }, { id: '2', type: 2 }];

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const goToApp = () => router.replace('/(tabs)');
  const goNext = () => {
    if (index < SLIDES.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
      setIndex(index + 1);
    } else {
      goToApp();
    }
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index && i >= 0 && i < SLIDES.length) setIndex(i);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        ref={listRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {item.type === 1 ? <Slide1 width={width} /> : <Slide2 width={width} />}
          </View>
        )}
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.lg }]}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <Pressable onPress={goToApp} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <Pressable onPress={goNext} style={styles.nextCircleBtn}>
            <MaterialIcons name="arrow-forward" size={24} color={Colors.background} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function Slide1({ width }: { width: number }) {
  return (
    <>
      <View style={[styles.imageWrap, { width }]}>
        <Image
          source={{ uri: SLIDE_1_IMAGE }}
          style={[styles.heroImage, { width: width - Spacing.lg * 2 }]}
          contentFit="cover"
        />
        <View style={styles.overlayTextTop}>
          <Text style={styles.overlayTitle}>Stay Active</Text>
        </View>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.cardTitle}>Steps Tracker.</Text>
        <View style={styles.pillRow}>
          <Pressable style={styles.yellowPill}>
            <MaterialIcons name="chevron-left" size={20} color={Colors.background} />
            <Text style={styles.pillText}>Walking</Text>
            <MaterialIcons name="chevron-right" size={20} color={Colors.background} />
          </Pressable>
        </View>
        <Text style={styles.fitnessLabel}>Fitness Categories</Text>
      </View>
    </>
  );
}

function Slide2({ width }: { width: number }) {
  return (
    <>
      <View style={[styles.imageWrap, { width }]}>
        <Image
          source={{ uri: SLIDE_2_IMAGE }}
          style={[styles.heroImage, { width: width - Spacing.lg * 2 }]}
          contentFit="cover"
        />
        <View style={styles.badgeRow}>
          <MetricBadge label="Avg 180 bpm" />
          <MetricBadge label="400 Cals burn" />
        </View>
      </View>
      <View style={styles.bottomCard}>
        <Text style={styles.cardTitleWhite}>Start your journey with + 8.94 more</Text>
        <Text style={styles.cardTitleAccent}>Next Steps Tracker</Text>
      </View>
    </>
  );
}

function MetricBadge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  slide: { flex: 1 },
  imageWrap: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  heroImage: {
    height: 360,
    borderRadius: Radius['2xl'],
    overflow: 'hidden',
    backgroundColor: Colors.surfaceElevated,
  },
  overlayTextTop: {
    position: 'absolute',
    top: Spacing.xl,
    left: Spacing.xl + Spacing.md,
  },
  overlayTitle: {
    fontSize: FontSize['3xl'],
    fontFamily: FontFamily.bold,
    color: Colors.text,
  },
  badgeRow: {
    position: 'absolute',
    bottom: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    flexDirection: 'row',
    gap: Spacing.md,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
  },
  badgeText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.background,
  },
  bottomCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    backgroundColor: 'rgba(26,26,26,0.9)',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
  },
  cardTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.semiBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  cardTitleWhite: {
    fontSize: FontSize.base,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  cardTitleAccent: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    color: Colors.primary,
  },
  pillRow: { marginBottom: Spacing.sm },
  yellowPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.full,
    gap: Spacing.sm,
  },
  pillText: {
    fontSize: FontSize.sm,
    fontWeight: '700',
    color: Colors.background,
  },
  fitnessLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipBtn: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  skipText: {
    fontSize: FontSize.base,
    fontWeight: '600',
    color: Colors.text,
  },
  nextCircleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
