import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    displayName: z.string().optional(),

    // Base stats for BMR (Mifflin-St Jeor)
    birthDate: z.date().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    heightCm: z.number().positive().optional(),
    weightKg: z.number().positive().optional(),

    // Streak tracking
    currentStreak: z.number().int().nonnegative().default(0),
    longestStreak: z.number().int().nonnegative().default(0),
    lastActiveDate: z.date().optional(),

    createdAt: z.date(),
    updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
