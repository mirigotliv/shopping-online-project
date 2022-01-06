// @ts-nocheck
import { Component, OnInit, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MustMatch } from 'src/app/services/must-match.validator'
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-step-one',
    templateUrl: './step-one.component.html',
    styleUrls: ['./step-one.component.css']
})

export class StepOneComponent implements OnInit {

    @Input() onClickNext: any;

    passwordType: string = 'password'
    passwordShown: boolean = false

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

    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }
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

    // convenience getter for easy access to form fields
    get form() {
        return this.registerForm.controls;
    }

    onClickButton() {
        // this.submitted = false
        if (!this.checkAllValid()) {
            return
            // console.log('checking form', this.registerForm.controls.value)
        }
        
        console.log('checking', this.registerForm.value)
        console.log(email.value,
            id.value,
            password.value,
            passwordConfirm.value)
        this.onClickNext(email.value,
            id.value,
            password.value,
            passwordConfirm.value)
    }

    checkAllValid() {
        console.log('miri')
        let allValid = true
        // console.log(typeof this.registerForm.controls)
        Object.keys(this.registerForm.controls).forEach(key => {
            console.log(this.registerForm.controls.status)
            if (this.registerForm.controls[key].status === 'INVALID') {
                console.log('invalid')
                allValid = false
            }
        })
        console.log(allValid)
        return allValid
    }

    onSubmit() {
        this.submitted = true;
    }

    // registerUser(user) {
    //     // console.log(user)
    //     this.apiService.registerUser(user)
    // }

    // public onClickNext = () => {
    //     this.submitted = true;
    //     console.log(this.registerForm.controls)
    //     // stop here if form is invalid
    //     console.log('valid')
    //     if (this.checkAllValid()) {
    //         console.log('aaa')
    //         this.toggleShowStep2()
    //     }
    // this.toggleShowStep2()
    // }

    // checkAllValid() {
    //     let allValid = true
    //     // console.log(typeof this.registerForm.controls)
    //     Object.keys(this.registerForm.controls).forEach(key => {
    //         // console.log('key', this.registerForm.controls[key])
    //         // console.log(this.registerForm.controls[key].status)
    //         if (this.registerForm.controls[key].status === 'INVALID') {
    //             console.log('invalid')
    //             allValid = false
    //         }
    //     })
    //     console.log(allValid)
    //     return allValid
    // }
}