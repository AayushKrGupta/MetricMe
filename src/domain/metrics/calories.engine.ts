/**
 * Calculates Basal Metabolic Rate using Mifflin-St Jeor equation
 * Men: (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) + 5
 * Women: (10 x weight in kg) + (6.25 x height in cm) - (5 x age in years) - 161
 */
export function calculateBMR(
    weightKg: number,
    heightCm: number,
    ageYears: number,
    gender: 'male' | 'female' | 'other'
): number {
    let base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;

    if (gender === 'male') {
        return base + 5;
    } else if (gender === 'female') {
        return base - 161;
    } else {
        // Average baseline for 'other'
        return base - 78;
    }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) based on BMR and daily steps
 * Rough estimate: every 1000 steps = ~40 calories burned (varies by weight, but generalized here)
 * Base activity multiplier: 1.2 (sedentary)
 */
export function calculateTDEE(bmr: number, steps: number): number {
    const sedentaryTDEE = bmr * 1.2;
    const activeCalories = (steps / 1000) * 40; // simplified
    return Math.round(sedentaryTDEE + activeCalories);
}
