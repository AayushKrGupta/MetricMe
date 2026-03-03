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
        console.log('Running daily streak checker...');

        const usersSnap = await db.collection('users').get();

        const batch = db.batch();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        usersSnap.forEach((doc) => {
            const userData = doc.data();
            const lastActive = userData.lastActiveDate ? userData.lastActiveDate.toDate() : null;

            if (!lastActive) return; // Never active

            // If difference > 1 day, reset streak
            const diffTime = Math.abs(today.getTime() - lastActive.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 1 && userData.currentStreak > 0) {
                const userRef = db.collection('users').doc(doc.id);
                batch.update(userRef, { currentStreak: 0 });
            }
        });

        await batch.commit();
        console.log('Streak check completed.');
        return null;
    });
