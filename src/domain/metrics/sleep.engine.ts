/**
 * Computes a sleep score (0-100) based on duration, REM/Deep cycles, and interruptions.
 * @param totalMinutes Total time asleep in minutes
 * @param deepSleepMinutes Minutes spent in deep sleep
 * @param remMinutes Minutes spent in REM sleep
 * @param interruptions Number of times woken up
 */
export function calculateSleepScore(
    totalMinutes: number,
    deepSleepMinutes: number,
    remMinutes: number,
    interruptions: number
): number {
    // Target total sleep: 480 mins (8 hours)
    const durationScore = Math.min((totalMinutes / 480) * 50, 50); // Up to 50 pts

    // Target Deep: 20% of total sleep
    const deepTarget = (totalMinutes * 0.20);
    const deepScore = Math.min((deepSleepMinutes / Math.max(deepTarget, 1)) * 25, 25); // Up to 25 pts

    // Target REM: 25% of total sleep
    const remTarget = (totalMinutes * 0.25);
    const remScore = Math.min((remMinutes / Math.max(remTarget, 1)) * 25, 25); // Up to 25 pts

    // Interruptions penalty (subtract 5 points per interruption)
    const interruptionPenalty = interruptions * 5;

    let totalScore = durationScore + deepScore + remScore - interruptionPenalty;

    if (totalScore < 0) totalScore = 0;
    if (totalScore > 100) totalScore = 100;

    return Math.round(totalScore);
}
