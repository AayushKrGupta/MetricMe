import { differenceInDays, startOfDay } from 'date-fns';

/**
 * Updates streak counts based on the 'last active date' and 'today'
 * @param lastActiveDate 
 * @param currentStreak 
 * @param longestStreak 
 * @returns updated streak info
 */
export function calculateStreak(
    lastActiveDate: Date | undefined,
    currentStreak: number,
    longestStreak: number
): { currentStreak: number; longestStreak: number; lastActiveDate: Date; streakMaintained: boolean } {

    const today = startOfDay(new Date());

    if (!lastActiveDate) {
        // First time logging
        return { currentStreak: 1, longestStreak: Math.max(1, longestStreak), lastActiveDate: today, streakMaintained: true };
    }

    const lastActiveStart = startOfDay(lastActiveDate);
    const diffDays = differenceInDays(today, lastActiveStart);

    if (diffDays === 0) {
        // Already logged today
        return { currentStreak, longestStreak, lastActiveDate: today, streakMaintained: true };
    } else if (diffDays === 1) {
        // Logged yesterday -> increment streak
        const newStreak = currentStreak + 1;
        return { currentStreak: newStreak, longestStreak: Math.max(newStreak, longestStreak), lastActiveDate: today, streakMaintained: true };
    } else {
        // Missed a day -> reset streak
        return { currentStreak: 1, longestStreak, lastActiveDate: today, streakMaintained: false };
    }
}
