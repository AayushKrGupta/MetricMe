import { create } from 'zustand';
import { User } from '../data/models/user.model';
import { userRepository } from '../data/repositories/user.repository';
import { authService } from '../domain/services/auth.service';

interface UserState {
    user: User | null;
    isLoading: boolean;
    error: string | null;

    listenToAuthChanges: () => void;
    fetchProfile: (uid: string) => Promise<void>;
    updateProfile: (uid: string, data: Partial<User>) => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    isLoading: true,
    error: null,

    listenToAuthChanges: () => {
        // This connects Firebase Auth to Zustand store
        authService.initializeAuthListener(async (firebaseUser) => {
            if (firebaseUser) {
                await get().fetchProfile(firebaseUser.uid);
            } else {
                set({ user: null, isLoading: false, error: null });
            }
        });
    },

    fetchProfile: async (uid: string) => {
        set({ isLoading: true, error: null });
        try {
            const profile = await userRepository.getById(uid);
            set({ user: profile, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    updateProfile: async (uid: string, data: Partial<User>) => {
        try {
            await userRepository.set(uid, data);
            set((state) => ({
                user: state.user ? { ...state.user, ...data } : null,
            }));
        } catch (err: any) {
            set({ error: err.message });
        }
    },

    logout: async () => {
        await authService.logout();
        set({ user: null, isLoading: false, error: null });
    },
}));
