// @ts-nocheck
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-form-register',
    templateUrl: './form-register.component.html',
    styleUrls: ['./form-register.component.css']
})

export class FormRegisterComponent {

    showStep2: boolean = false
    submitted: boolean = false
    email: string = ''
    id: number = -1
    password: string = ''
    passwordConfirm: string = ''
    wrongMessageUser: string

    public toggleShowStep2() {
        this.showStep2 = !this.showStep2
    }

    constructor(private apiService: ApiService) { }
    signUp(
        {
            id,
            email,
            password,
            passwordConfirm,
            city,
            firstName,
            lastName,
            street,
        }
    ) {

        fetch('http://localhost:3001/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    email,
                    password,
                    passwordConfirm,
                    city,
                    firstName,
                    lastName,
                    street
                })
            })
            .then(response => {
                if (response.status === 403) {
                    this.toggleShowStep2()
                    this.wrongMessageUser = "id or email exists"
                }
            })
    }

    onSubmit = ({ city, firstName, lastName, street }) => {
        this.signUp({
            city,
            email: this.email,
            firstName,
            id: this.id,
            lastName,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            street,
        })
        this.submitted = true;
    }

    registerForm: FormGroup = new FormGroup({
        id: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        passwordConfirm: new FormControl(''),
        city: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        street: new FormControl('')
    })

    public checkAllValid() {
        let allValid = true
        Object.keys(this.registerForm.controls).forEach(key => {
            if (this.registerForm.controls[key].status === 'INVALID') {
                allValid = false
            }
        })
        return allValid
    }

    public onClickNext = (
        email,
        id,
        password,
        passwordConfirm
    ) => {
        this.submitted = true;
        if (this.checkAllValid()) {
            this.toggleShowStep2()
        }
        this.id = id
        this.email = email
        this.password = password
        this.passwordConfirm = passwordConfirm
    }

    registerUser(user) {
        this.apiService(user)
    }
}