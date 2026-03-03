import { z } from 'zod';

// For daily_metrics/{userId}_{YYYY-MM-DD}
export const DailyMetricsSchema = z.object({
    id: z.string(), // Format: userId_YYYY-MM-DD
    userId: z.string(),
    dateString: z.string(), // YYYY-MM-DD

    // Aggregated totals
    steps: z.number().int().nonnegative().default(0),
    caloriesBurned: z.number().nonnegative().default(0),
    hydrationMl: z.number().nonnegative().default(0),

    // Scores
    sleepScore: z.number().min(0).max(100).optional(),
    moodIndex: z.number().min(1).max(10).optional(),

    // Weekly trend metadata
    isTrendPositive: z.boolean().optional(),
    trendSlope: z.number().optional(), // Linear regression slope

    lastUpdated: z.date(),
});

export type DailyMetrics = z.infer<typeof DailyMetricsSchema>;
