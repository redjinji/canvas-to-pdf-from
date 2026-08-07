import {Injectable} from "@angular/core";

export interface FormDraft {
    values: Record<string, any>;
    step: number;
}

const DB_NAME = 'midras-form';
const STORE = 'drafts';
const KEY = 'current';

@Injectable({providedIn: 'root'})
export class FormAutosaveService {

    private openDb(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, 1);
            req.onupgradeneeded = () => req.result.createObjectStore(STORE);
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    // A failed IndexedDB (private mode, quota) must never break the form itself.
    private withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | null> {
        return this.openDb().then(db => new Promise<T>((resolve, reject) => {
            const tx = db.transaction(STORE, mode);
            const req = run(tx.objectStore(STORE));
            tx.oncomplete = () => { db.close(); resolve(req.result); };
            tx.onerror = () => { db.close(); reject(tx.error); };
            tx.onabort = () => { db.close(); reject(tx.error); };
        })).catch(err => {
            console.log('autosave unavailable:', err);
            return null;
        });
    }

    saveDraft(draft: FormDraft): Promise<unknown> {
        return this.withStore('readwrite', store => store.put(draft, KEY));
    }

    loadDraft(): Promise<FormDraft | null> {
        return this.withStore('readonly', store => store.get(KEY) as IDBRequest<FormDraft>)
            .then(draft => draft ?? null);
    }

    clearDraft(): Promise<unknown> {
        return this.withStore('readwrite', store => store.delete(KEY));
    }
}
