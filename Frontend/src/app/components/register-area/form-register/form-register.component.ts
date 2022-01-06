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

    public toggleShowStep2() {
        this.showStep2 = !this.showStep2
    }

    constructor(private apiService: ApiService) { }
    registerUser(user) {
        this.apiService(user)
    }

    signUp(
        {
            id,
            email,
            password,
            passwordConfirm,
            city,
            firstName,
            lastName,
            street, }
    ) {
        console.log('id', id);
        console.log('email', email);
        console.log('password', password);
        console.log('passwordConfirm', passwordConfirm);
        console.log('city', city);
        console.log('street', street);
        console.log('name', firstName);
        console.log('lastName', lastName);

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
            });
    }

    onSubmit = ({ city, firstName, lastName, street }) => {
        console.log('submit')
        console.log(city)
        console.log(this)
        console.log('this.id ', this.id)
        this.signUp({
            city,
            email: this.email,
            firstName,
            id: this.id,
            lastName,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            street,
        }
        )
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

    checkAllValid() {
        let allValid = true
        // console.log(typeof this.registerForm.controls)
        Object.keys(this.registerForm.controls).forEach(key => {
            // console.log('key', this.registerForm.controls[key])
            // console.log(this.registerForm.controls[key].status)
            if (this.registerForm.controls[key].status === 'INVALID') {
                console.log('invalid')
                allValid = false
            }
        })
        console.log(allValid)
        return allValid
    }

    public onClickNext = (
        email,
        id,
        password,
        passwordConfirm
    ) => {
        console.log('id', id)
        this.submitted = true;
        console.log(this.registerForm.controls)
        // stop here if form is invalid
        // console.log('valid')
        if (this.checkAllValid()) {
            console.log('aaa')
            // console.log('check', this.registerForm.value)
            this.toggleShowStep2()
        }
        this.id = id
        this.email = email
        this.password = password
        this.passwordConfirm = passwordConfirm
    }
    // public bindClickNext = this.onClickNext.bind(this)
}