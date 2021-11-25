import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string
    password: string
    passwordType: string = 'password'
    passwordShown: boolean = false
    wrongMessage: string

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

    onLogin(email: string, password: string) {
        console.log('email', email);
        console.log('password--', password);
        fetch('http://localhost:3001/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                if (response.status === 200) {
                    this.router.navigateByUrl("/shopping");
                }
                else {
                    if (response.status === 401) {
                        this.wrongMessage = "incorrect email"
                    }
                    if (response.status === 402) {
                        this.wrongMessage = "incorrect password"
                    }
                    // const USER_NOT_FOUND = 401
                    // const WRONG_PASSWORD = 402
                }
            }
            )
    }

    loginForm: FormGroup;
    submitted = false;
    emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

    constructor(private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(11), Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        }, {
            validator: MustMatch('email', 'password')
        });
    }

    // convenience getter for easy access to form fields
    get form() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
    }
}







