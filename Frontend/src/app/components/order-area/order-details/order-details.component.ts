//@ts-nocheck
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityModel } from 'src/app/models/city.model';
import { MustMatch } from 'src/app/services/must-match.validator';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})

export class OrderDetailsComponent implements OnInit {
    city: string
    street: string
    shippingDate: Date
    creditCard: number
    submitted = false;
    today = new Date()
    now: Date;
    cities: CityModel[];
    detailsForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    async ngOnInit() {
        this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise()
        this.detailsForm = this.formBuilder.group({
            city: ['', [Validators.required, Validators.minLength(5)]],
            street: ['', [Validators.required, Validators.minLength(5)]],
            shippingDate: ['', [Validators.required]],
            creditCard: ['', [Validators.required, Validators.minLength(4)]]
        }, {
            validator: MustMatch('city', 'street', 'shippingDate', 'creditCard')
        });
        const dateSchedule = new DatePipe('en-Us');
        this.now = dateSchedule.transform(new Date(), 'yyyy-MM-dd');
    }

    get form() {
        return this.detailsForm.controls;
    }

    public async getCities(args: Event) {
        try {
            this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise();
            console.log(this.cities);
        }
        catch (err) {
            console.log(err);
        }
    }

    onSubmit() {
        this.submitted = true;
    }

    public checkDetailsForm() {
        if (this.detailsForm.valid) {
            this.router.navigateByUrl("/reception");
        }
        else {
            return
        }
    }
}