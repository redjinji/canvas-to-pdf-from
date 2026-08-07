import {Injectable} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {FormService} from "./form.service";

export interface FormDraft {
    values: Record<string, any>;
    step: number;
}

const DB_NAME = 'midras-form';
const STORE = 'drafts';
const KEY = 'current';

@Injectable({providedIn: 'root'})
export class FormAutosaveService {

    constructor(private formService: FormService) {}

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

    // Fields that other fields' visibility depends on (showIf) must be set first,
    // otherwise SimpleForm's cleanup resets the still-hidden conditional answers.
    applyDraft(form: FormGroup, values: Record<string, any>) {
        const controllers = new Set<string>();
        for (const elem of this.formService.getFormElements()) {
            for (const detail of elem.customerDetails ?? []) {
                if (detail.showIf) controllers.add(detail.showIf.field);
            }
        }
        const keys = Object.keys(values);
        const ordered = [...keys.filter(k => controllers.has(k)), ...keys.filter(k => !controllers.has(k))];
        for (const key of ordered) {
            const control = form.controls[key];
            if (control) control.setValue(values[key]);
            else form.addControl(key, new FormControl(values[key]));
            if (values[key]) {
                // setValue leaves controls pristine+untouched, but the floating
                // labels (inputs: .ng-dirty/.ng-untouched CSS, selects: .dirty
                // binding) only shrink for dirty+touched controls.
                form.controls[key].markAsDirty();
                form.controls[key].markAsTouched();
            }
        }
    }
}
