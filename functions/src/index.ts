import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp();

const db = admin.firestore();

// 1. Weekly Trend Re-calculator Trigger
// Triggered when a new daily_metric is written/updated
export const calculateWeeklyTrends = functions.firestore
    .document('daily_metrics/{metricId}')
    .onWrite(async (change, context) => {
        const { metricId } = context.params;
        const userId = metricId.split('_')[0];

        // In a real scenario, this fetches the last 7 days and runs the linear regression engine.
        console.log(`Analyzing trends for ${userId}`);

        // Dummy: Fetch logic and update
        // Call LinearRegression engine...
        // Update daily_metric document with new trend slope and boolean

        return null;
    });

// 2. Scheduled Streak Reset Engine
// Runs every night at midnight UTC to check if a user missed logging data
export const checkStreaksEngine = functions.pubsub.schedule('0 0 * * *')
    .timeZone('UTC')
    .onRun(async (context) => {
        functions.logger.info('Running daily streak checker...');

        try {
            const now = new Date();
            // yesterdayMidNight = Today 00:00 - 24 hours
            const yesterdayMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1));

            // Query only users who have a streak and whose last activity was BEFORE yesterday.
            // This avoids processing 1M+ users and only touches those who actually need a reset.
            // Requires a composite index: users { currentStreak: 1, lastActiveDate: 1 }
            const usersSnap = await db.collection('users')
                .where('currentStreak', '>', 0)
                .where('lastActiveDate', '<', yesterdayMidnight)
                .get();

            if (usersSnap.empty) {
                functions.logger.info('No streaks need resetting today.');
                return null;
            }

            functions.logger.info(`Found ${usersSnap.size} users with expired streaks.`);

            let batch = db.batch();
            let count = 0;
            const BATCH_LIMIT = 500;

            for (const doc of usersSnap.docs) {
                batch.update(doc.ref, {
                    currentStreak: 0,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });
                count++;

                // Firestore batch limit is 500 operations
                if (count === BATCH_LIMIT) {
                    await batch.commit();
                    batch = db.batch();
                    count = 0;
                }
            }

            if (count > 0) {
                await batch.commit();
            }

            functions.logger.info('Streak check completed successfully.');
        } catch (error) {
            functions.logger.error('Error in checkStreaksEngine:', error);
        }
        return null;
    });
