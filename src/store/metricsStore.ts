import { create } from 'zustand';
import { DailyMetrics } from '../data/models/metrics.model';
import { metricsRepository } from '../data/repositories/metrics.repository';

interface MetricsState {
    dailyMetrics: Map<string, DailyMetrics>; // Keyed by dateString (YYYY-MM-DD)
    isLoading: boolean;

    fetchDailyMetrics: (userId: string, dateString: string) => Promise<void>;
    updateDailyMetrics: (userId: string, dateString: string, metricUpdate: Partial<DailyMetrics>) => Promise<void>;
}

export const useMetricsStore = create<MetricsState>((set, get) => ({
    dailyMetrics: new Map(),
    isLoading: false,

    fetchDailyMetrics: async (userId: string, dateString: string) => {
        set({ isLoading: true });
        try {
            // First try to serve from local state
            const currentMap = get().dailyMetrics;
            // Fetch from Firestore (will use local cache automatically due to offline persistence)
            const data = await metricsRepository.getDailyMetrics(userId, dateString);

            if (data) {
                const newMap = new Map(currentMap);
                newMap.set(dateString, data);
                set({ dailyMetrics: newMap });
            }
        } finally {
            set({ isLoading: false });
        }
    },

    updateDailyMetrics: async (userId: string, dateString: string, data: Partial<DailyMetrics>) => {
        try {
            // Optimistic UI Update
            const currentMap = get().dailyMetrics;
            const existing = currentMap.get(dateString) || {
                id: `${userId}_${dateString}`,
                userId,
                dateString,
                steps: 0,
                caloriesBurned: 0,
                hydrationMl: 0,
                lastUpdated: new Date()
            };

            const updated = { ...existing, ...data, lastUpdated: new Date() } as DailyMetrics;
            const newMap = new Map(currentMap);
            newMap.set(dateString, updated);
            set({ dailyMetrics: newMap });

            // Write to Firestore (offline syncs when online)
            await metricsRepository.updateDailyMetrics(userId, dateString, updated);

        } catch (err) {
            console.error('Failed to update metrics', err);
            // Might want to rollback the state map here if critical error
        }
    }
}));
