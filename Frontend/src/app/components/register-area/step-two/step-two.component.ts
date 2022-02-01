// @ts-nocheck
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CityModel } from '../../../models/city.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Input } from '@angular/core';

@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.css']
})

export class StepTwoComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    @Input()
    onSubmit2: (Function);
    @Input()
    public email: string
    @Input()
    public id: number;
    @Input()
    public password: string;
    @Input()
    public passwordConfirm: string;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    public cities: CityModel[];

    ngOnInit() {
        try {
            this.http.get<CityModel[]>(environment.citiesUrl).toPromise()
                .then(cities => this.cities = cities);
        }
        catch (err) {
            console.log(err);
        }

        this.registerForm = this.formBuilder.group({
            city: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.minLength(3)]],
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]]
        }, {
            validator: MustMatch('city', 'street', 'firstName', 'lastName')
        });
    }

    public areFieldsFilledCorrectly() {
        if (!this.registerForm.value.city ||
            !this.registerForm.value.street ||
            !this.registerForm.value.firstName ||
            this.registerForm.value.firstName.length < 3 ||
            this.registerForm.value.street.length < 3 ||
            this.registerForm.value.lastName.length < 3 ||
            !this.registerForm.value.lastName) {
            return false
        }
        return true
    }

    get form() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.onSubmit2(
            {
                city: this.registerForm.value.city,
                firstName: this.registerForm.value.firstName,
                lastName: this.registerForm.value.lastName,
                street: this.registerForm.value.street
            }
        )
        this.submitted = true;
        if (this.registerForm.valid) {
            this.router.navigateByUrl("/shopping");
        }
    }

    registerUser() {
        new ApiService().registerUser(
            this.id,
            this.email,
            this.password,
            this.passwordConfirm,
            city,
            street,
            firstName,
            lastName
        )
    }
}