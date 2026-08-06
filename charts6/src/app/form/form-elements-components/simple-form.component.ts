import {Component, DestroyRef, inject, Input, OnInit, ViewEncapsulation} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ICustomerDetails} from "./form-interface";
import {CommonModule} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {RadioComponent} from "./radio-component/radio.component";
import {TextAreaComponent} from "./textArea.component";
import {InputComponent} from "./input.component";
import {BirthdayInputComponent} from "./birthday-input.component";
import {SelectComponent} from "./select.component";

@Component({
    selector: 'simple-form',
    imports: [CommonModule, ReactiveFormsModule, RadioComponent, TextAreaComponent, InputComponent, BirthdayInputComponent, SelectComponent],
    templateUrl: 'simple-form.component.html',
    styleUrls: ['./simple-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SimpleFormComponent implements OnInit {
    @Input() customerForm: ICustomerDetails[];
    @Input() parentForm: FormGroup;
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        const conditional = this.customerForm.filter(elem => elem.showIf);
        if (!conditional.length) return;
        // A hidden field's component is destroyed but its control stays registered in
        // parentForm - clear it so the stale answer is never submitted. emitEvent: false
        // keeps the reset from re-triggering this same subscription.
        this.parentForm.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                for (const elem of conditional) {
                    if (this.isVisible(elem)) continue;
                    const name = elem.input?.name ?? elem.select?.name ?? elem.radio?.name;
                    const control = name ? this.parentForm.controls[name] : undefined;
                    if (control && control.value) control.reset('', {emitEvent: false});
                }
            });
    }

    isVisible(elem: ICustomerDetails): boolean {
        return !elem.showIf || this.parentForm.controls[elem.showIf.field]?.value === elem.showIf.equals;
    }
}
