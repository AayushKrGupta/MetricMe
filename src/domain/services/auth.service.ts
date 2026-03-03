import {
    createUserWithEmailAndPassword,
    User as FirebaseUser,
    onIdTokenChanged,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { auth } from '../../core/config/firebase';
import { User } from '../../data/models/user.model';
import { userRepository } from '../../data/repositories/user.repository';

class AuthService {
    // Listen for auth state & token refreshes (Firebase SDK handles physical refresh)
    public initializeAuthListener(callback: (user: FirebaseUser | null) => void) {
        return onIdTokenChanged(auth, async (user) => {
            if (user) {
                // We enforce token refreshment checking here if needed
                // const token = await user.getIdToken(true); 
                console.log(`[AuthService] Token synced for ${user.uid}`);
            }
            callback(user);
        });
    }

    // Register user & create document
    async signUp(email: string, pass: string): Promise<User> {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const newUser: Partial<User> = {
            id: cred.user.uid,
            email: cred.user.email || '',
            currentStreak: 0,
            longestStreak: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Save to Firestore explicitly
        await userRepository.set(cred.user.uid, newUser);
        return newUser as User;
    }

    // Login
    async signIn(email: string, pass: string): Promise<User | null> {
        const cred = await signInWithEmailAndPassword(auth, email, pass);

        // Fetch profile data from firestore
        return await userRepository.getById(cred.user.uid);
    }

    // Logout
    async logout(): Promise<void> {
        await signOut(auth);
    }

    // Get ID token explicitly
    async getToken(forceRefresh: boolean = false): Promise<string | null> {
        if (!auth.currentUser) return null;
        return await auth.currentUser.getIdToken(forceRefresh);
    }
}

export const authService = new AuthService();
