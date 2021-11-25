// @ts-nocheck
import { Component } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

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

    signUp(
        id: number,
        email: string,
        password: string,
        passwordConfirm: string,
        city: string,
        street: string,
        firstName: string,
        lastName: string,
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
                    city,
                    email,
                    firstName,
                    id,
                    lastName,
                    password,
                    passwordConfirm,
                    street
                })
            });
    }

    onSubmit = (city, firstName, lastName, street) => {

        console.log('submit')
        console.log(city)
        console.log(this)
        console.log('this.id ', this.id)
        // console.log(this.id, this.email, this.password,
        //     this.passwordConfirm,
        //     city, street, firstName, lastName)
        this.signUp(this.id, this.email, this.password,
            this.passwordConfirm,
            city, street, firstName, lastName)
        this.submitted = true;
    }

    registerForm: FormGroup = new FormGroup({
        city: new FormControl(''),
        email: new FormControl(''),
        firstName: new FormControl(''),
        id: new FormControl(''),
        lastName: new FormControl(''),
        password: new FormControl(''),
        passwordConfirm: new FormControl(''),
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
        console.log('valid')
        if (this.checkAllValid()) {
            console.log('aaa')
            this.toggleShowStep2()
        }
        this.id = id
        this.email = email
        this.password = password
        this.passwordConfirm = passwordConfirm

        // this.toggleShowStep2()
    }

    // public bindClickNext = this.onClickNext.bind(this)
}