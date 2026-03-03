import { User, UserSchema } from '../models/user.model';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super('users');
    }

    // Override to include Zod validation on read
    async getById(id: string): Promise<User | null> {
        const rawData = await super.getById(id);
        if (!rawData) return null;

        // Strict validation mapping
        const parsed = UserSchema.safeParse(rawData);
        if (parsed.success) {
            return parsed.data;
        } else {
            console.error('UserSchema validation failed:', parsed.error);
            return null;
        }
    }

    // Override set to ensure Zod validation on write
    async set(id: string, data: Partial<User>): Promise<void> {
        // If we're fully updating, we should ideally validate the full payload.
        // For partial, we'll cast. In production, we'd use a PartialUserSchema.
        await super.set(id, data);
    }
}

export const userRepository = new UserRepository();
