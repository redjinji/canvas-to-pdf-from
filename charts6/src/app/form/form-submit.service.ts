import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {FormAutosaveService} from "./form-autosave.service";

export interface FormResponse {
    status: string;
    error?: any;
}

@Injectable({providedIn: 'root'})
export class FormSubmitService {
    private url = `${environment.serverCall}/sendForm`;

    constructor(private http: HttpClient, private autosave: FormAutosaveService) {}

    submit(values: Record<string, any>): Observable<FormResponse> {
        const formData = new FormData();
        const fieldAgent = JSON.parse(localStorage.getItem('userAuth')!);

        formData.append('fieldAgentName', fieldAgent.userName);
        formData.append('fieldAgentMail', fieldAgent.mail);
        formData.append('submitTime', new Date().toLocaleString('he-il'));
        for (const key in values) {
            formData.append(key, values[key] || '');
        }

        return this.http.post<FormResponse>(this.url, formData).pipe(
            tap(response => {
                if (response.status !== 'fail') this.autosave.clearDraft();
            })
        );
    }
}
