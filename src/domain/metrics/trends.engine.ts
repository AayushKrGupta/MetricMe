/**
 * Performs simple linear regression on a dataset to determine trends
 * y = mx + b
 * returns { slope (m), intercept (b) }
 */
export function calculateLinearRegression(dataPoints: number[]): { slope: number; intercept: number } {
    const n = dataPoints.length;
    if (n <= 1) return { slope: 0, intercept: dataPoints[0] || 0 };

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;

    for (let i = 0; i < n; i++) {
        const x = i; // Time represents X
        const y = dataPoints[i]; // Value represents Y

        sumX += x;
        sumY += y;
        sumXY += x * y;
        sumX2 += x * x;
    }

    const denominator = (n * sumX2) - (sumX * sumX);
    if (denominator === 0) return { slope: 0, intercept: sumY / n };

    const slope = ((n * sumXY) - (sumX * sumY)) / denominator;
    const intercept = (sumY - (slope * sumX)) / n;

    return { slope, intercept };
}

/**
 * Returns boolean indicating if trend is positive (improving)
 */
export function isTrendPositive(slope: number): boolean {
    return slope > 0;
}
