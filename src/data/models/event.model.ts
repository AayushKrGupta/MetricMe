import { z } from 'zod';

export const HealthEventType = z.enum([
    'WATER_INTAKE',
    'MEAL_LOG',
    'WORKOUT',
    'SLEEP_SESSION',
    'MOOD_LOG'
]);

// Granular events stored in users/{userId}/events/{eventId}
export const HealthEventSchema = z.object({
    id: z.string(),
    userId: z.string(),
    type: HealthEventType,
    timestamp: z.date(),

    // Value depends on the type
    value: z.number().optional(),
    metadata: z.record(z.any()).optional(),
});

export type HealthEvent = z.infer<typeof HealthEventSchema>;
