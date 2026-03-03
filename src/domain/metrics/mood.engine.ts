/**
 * Calculate simple mood stability by aggregating recent mood data points
 * Calculates variance and normalizes to a 1-10 index (10 being highly stable and positive)
 */
export function calculateMoodStability(recentMoodLogs: number[]): number {
    if (recentMoodLogs.length === 0) return 5; // Neutral default
    if (recentMoodLogs.length === 1) return recentMoodLogs[0]; // Single point

    // Calculate mean
    const mean = recentMoodLogs.reduce((acc, mood) => acc + mood, 0) / recentMoodLogs.length;

    // Calculate standard deviation (instability)
    const variance = recentMoodLogs.reduce((acc, mood) => acc + Math.pow(mood - mean, 2), 0) / recentMoodLogs.length;
    const stdDev = Math.sqrt(variance);

    // High avg mood + low standard deviation = optimal score
    // Penalty for high deviation
    let stabilityIndex = mean - (stdDev * 0.5);

    if (stabilityIndex < 1) stabilityIndex = 1;
    if (stabilityIndex > 10) stabilityIndex = 10;

    return Math.round(stabilityIndex * 10) / 10;
}
