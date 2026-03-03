import { where } from 'firebase/firestore';
import { DailyMetrics, DailyMetricsSchema } from '../models/metrics.model';
import { BaseRepository } from './base.repository';

export class MetricsRepository extends BaseRepository<DailyMetrics> {
    constructor() {
        super('daily_metrics');
    }

    // Helper to generate the unique daily doc ID
    static generateId(userId: string, dateString: string) {
        return `${userId}_${dateString}`;
    }

    // Fetch metrics for a specific date range (for trends)
    async getMetricsRange(userId: string, startDateStr: string, endDateStr: string): Promise<DailyMetrics[]> {
        const rawDocs = await this.query([
            where('userId', '==', userId),
            where('dateString', '>=', startDateStr),
            where('dateString', '<=', endDateStr)
        ]);

        // Parse and filter invalid docs out
        return rawDocs.reduce((validDocs: DailyMetrics[], doc) => {
            const parsed = DailyMetricsSchema.safeParse(doc);
            if (parsed.success) {
                validDocs.push(parsed.data);
            }
            return validDocs;
        }, []);
    }

    async getDailyMetrics(userId: string, dateString: string): Promise<DailyMetrics | null> {
        const id = MetricsRepository.generateId(userId, dateString);
        const rawDoc = await super.getById(id);
        if (!rawDoc) return null;

        const parsed = DailyMetricsSchema.safeParse(rawDoc);
        return parsed.success ? parsed.data : null;
    }

    async updateDailyMetrics(userId: string, dateString: string, data: Partial<DailyMetrics>): Promise<void> {
        const id = MetricsRepository.generateId(userId, dateString);
        await this.set(id, data);
    }
}

export const metricsRepository = new MetricsRepository();
