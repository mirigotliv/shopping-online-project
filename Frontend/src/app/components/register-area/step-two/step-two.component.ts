// @ts-nocheck
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CityModel } from '../../../models/city.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Input, TemplateRef } from '@angular/core';
import { identity } from 'rxjs';


@Component({
    selector: 'app-step-two',
    templateUrl: './step-two.component.html',
    styleUrls: ['./step-two.component.css']
})
export class StepTwoComponent implements OnInit {
    // @Input email: TemplateRef<string>;
    @Input() onSubmit2: any;
    @Input()
    public email: string
    @Input()
    public id: number;
    @Input()
    public password: string;
    @Input()
    public passwordConfirm: string;

    registerForm: FormGroup;
    submitted = false;

    constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
    public cities: CityModel[];

    ngOnInit() {
        try {
            // console.log(email.value)
            this.http.get<CityModel[]>(environment.citiesUrl).toPromise()
                .then(cities => this.cities = cities);
        }
        catch (err) {
            console.log(err);
        }

        this.registerForm = this.formBuilder.group({
            city: ['', [Validators.required]],
            street: ['', [Validators.required, Validators.minLength(5)]],
            firstName: ['', [Validators.required, Validators.minLength(5)]],
            lastName: ['', [Validators.required, Validators.minLength(5)]]
        }, {
            validator: MustMatch('city', 'street', 'firstName', 'lastName')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    // onSubmit() {
    //     this.submitted = true;
    // }
    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    // }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    // }

    onSubmit() {
        console.log('hi submit')
        // console.log(this.registerForm.value.city)
        // console.log(city)
        // console.log(this.city)
        // console.log(this.registerForm)
        // console.log(this.registerForm.city)
        this.onSubmit2(
            this.registerForm.value.city,
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.street
        )
        this.submitted = true;
        if (this.registerForm.valid) {
            this.router.navigateByUrl("/shopping");
        }
    }

    registerUser() {
        console.log('ccc')
        // console.log(this.email.value)
        // console.log(email, city, street, firstName, lastName)
        new ApiService().registerUser(
            this.email,
            this.id,
            this.password,
            this.passwordConfirm,
            city, street, firstName, lastName
        )
    }
}