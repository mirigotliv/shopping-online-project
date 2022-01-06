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
    // type of variables
    email: string
    password: string
    passwordType: string = 'password'
    passwordShown: boolean = false
    wrongMessage: string

    // function to show/hide "text" when the user click on icon of "eye" 
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

    // function of fetch api of login
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
            // if the status = 200, then the user enter to shopping page:
                if (response.status === 200) {
                    response.json()
                        .then(data => window.localStorage.setItem('token', data.token))
                    console.log('res', response.body)
                    this.router.navigateByUrl("/shopping");
                }
                else {
            // if the status = 401, then the user get message of incorrect email:
                    if (response.status === 401) {
                        this.wrongMessage = "incorrect email"
                    }
            // if the status = 402, then the user get message of incorrect password:
                    if (response.status === 402) {
                        this.wrongMessage = "incorrect password"
                    }
                }
            })
    }

    loginForm: FormGroup;
    submitted = false;
    // validation = pattern to email:
    emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"

    constructor(private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        // validation to login inputs: email+password: 
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.minLength(11), Validators.pattern(this.emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(5)]],
        }, {
            // MustMatch is a 'service' to check that password + email are valid
            validator: MustMatch('email', 'password')
        });
    }

    // convenience getter for easy access to form fields
    get form() { return this.loginForm.controls; }

    // function onSubmit to submit data to backend
    onSubmit() {
        this.submitted = true;
    }
}