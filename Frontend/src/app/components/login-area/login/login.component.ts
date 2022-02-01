import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';

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
    emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    loginForm: FormGroup;
    submitted = false;

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
        fetch('http://localhost:3001/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => window.localStorage.setItem('token', data.token))
                    this.router.navigateByUrl("/shopping");
                }
                else {
                    if (response.status === 401) {
                        this.wrongMessage = "incorrect email"
                    } else if (response.status === 402) {
                        this.wrongMessage = "incorrect password"
                    }
                }
            })
    }

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(11), Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        }, {
            validator: MustMatch('email', 'password')
        });
    }

    get form() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;
    }
}