import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    query,
    QueryConstraint,
    QuerySnapshot,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from '../../core/config/firebase';

export abstract class BaseRepository<T extends DocumentData> {
    protected collectionName: string;

    constructor(collectionName: string) {
        this.collectionName = collectionName;
    }

    // Get a list of items using queries
    async query(constraints: QueryConstraint[]): Promise<T[]> {
        const q = query(collection(db, this.collectionName), ...constraints);
        const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as T[];
    }

    // Get single document by ID
    async getById(id: string): Promise<T | null> {
        const docRef = doc(db, this.collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T;
        }
        return null;
    }

    // Create or overwrite a document
    async set(id: string, data: Partial<T>): Promise<void> {
        const docRef = doc(db, this.collectionName, id);
        await setDoc(docRef, data, { merge: true });
    }

    // Update specific fields
    async update(id: string, data: Partial<T>): Promise<void> {
        const docRef = doc(db, this.collectionName, id);
        await updateDoc(docRef, data as any);
    }

    // Delete a document
    async delete(id: string): Promise<void> {
        const docRef = doc(db, this.collectionName, id);
        await deleteDoc(docRef);
    }
}
