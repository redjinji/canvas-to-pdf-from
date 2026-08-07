import {ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormAutosaveService, FormDraft} from "../form/form-autosave.service";
import {FormSubmitService} from "../form/form-submit.service";

@Component({
    selector: 'reject-form-page',
    imports: [CommonModule],
    templateUrl: './reject-form-page.html',
    styleUrls: ['./reject-form-page.scss']
})

export class RejectPageComponent implements OnInit {
    canRetry = false;
    sending = false;
    retryFailed = false;
    private draft: FormDraft | null = null;

    constructor(private router: Router,
                private autosave: FormAutosaveService,
                private formSubmit: FormSubmitService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.autosave.loadDraft().then(draft => {
            this.draft = draft;
            this.canRetry = !!draft;

            // markForCheck: async callback, not a DOM event (Angular >=18 ticks only marked views).
            this.cdr.markForCheck();
        });
    }

    retry() {
        if (!this.draft || this.sending) return;
        this.sending = true;
        this.retryFailed = false;
        this.formSubmit.submit(this.draft.values).subscribe(
            response => {
                if (response.status === 'fail') {
                    this.retrySettledWithFailure();
                } else {
                    this.router.navigate(['/success-form']);
                }
            },
            () => this.retrySettledWithFailure()
        );
    }

    private retrySettledWithFailure() {
        this.sending = false;
        this.retryFailed = true;
        this.cdr.markForCheck();
    }
}
