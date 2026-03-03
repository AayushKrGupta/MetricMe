/**
 * Calculate adaptive daily hydration target (ml) based on weight and activity
 * Base target is ~35ml per kg of body weight
 * Add 500ml for every 30 minutes of intense activity (approximated here by steps > baseline)
 */
export function calculateHydrationTarget(
    weightKg: number,
    dailySteps: number
): number {
    if (weightKg <= 0) return 2000; // default to 2L fallback

    const baseMl = weightKg * 35;

    // Every 2500 steps over 5000 adds roughly 250ml requirement
    let activeBonus = 0;
    if (dailySteps > 5000) {
        const extraBlocks = Math.floor((dailySteps - 5000) / 2500);
        activeBonus = extraBlocks * 250;
    }

    return baseMl + activeBonus;
}

/**
 * Returns hydration percentage
 */
export function calculateHydrationScore(currentMl: number, targetMl: number): number {
    if (targetMl === 0) return 0;
    const rawScore = (currentMl / targetMl) * 100;
    return Math.min(Math.round(rawScore), 100);
}
