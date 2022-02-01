// @ts-nocheck
import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from 'src/app/services/must-match.validator'

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {
    passwordType: string = 'password'
    passwordShown: boolean = false
    registerForm: FormGroup;
    submitted = false;
    @Input wrongMessageUser: string;
    @Input() onClickNext: Function;

    public togglePassword() {
        if (this.passwordShown) {
            this.passwordShown = false
            this.passwordType = 'password'
        }
        else {
            this.passwordShown = true
            this.passwordType = 'text'
        }
    }

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            id: ['', [Validators.required, Validators.minLength(9)]],
            email: ['', [Validators.required, Validators.minLength(11)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(5)]]
        }, {
            validator: MustMatch('id', 'email', 'password', 'passwordConfirm'),
            validator: MustMatch('password', 'passwordConfirm')
        });
    }

    get form() {
        return this.registerForm.controls;
    }

    onClickButton() {
        if (!this.checkAllValid()) {
            return
        }
        this.onClickNext(
            id.value,
            email.value,
            password.value,
            passwordConfirm.value
        )
    }

    checkAllValid() {
        let allValid = true
        Object.keys(this.registerForm.controls).forEach(key => {
            if (this.registerForm.controls[key].status === 'INVALID') {
                allValid = false
            }
        })
        return allValid
    }

    onSubmit() {
        this.submitted = true;
    }
}