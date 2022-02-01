//@ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MustMatch } from 'src/app/services/must-match.validator';
import { CityModel } from 'src/app/models/city.model';
import { DatePipe } from '@angular/common';

const SUCCESS = 200

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
    // @Input() cart = []

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
        }
        catch (err) {
            console.log(err);
        }
    }

    public areFieldsFilledCorrectly() {
        if (!this.detailsForm.value.city ||
            !this.detailsForm.value.street ||
            !this.detailsForm.value.shippingDate ||
            !this.detailsForm.value.creditCard ||
            this.detailsForm.value.street.length < 3 ||
            this.detailsForm.value.creditCard.length < 4
        ) {
            return false
        }
        return true
    }

    public onSubmit() {
        this.submitted = true;
        if (this.areFieldsFilledCorrectly()) {
            this.orderCart()
        }
    }

    public orderCart() {
        fetch('http://localhost:3001/orderCart',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                    city: this.detailsForm.value.city,
                    street: this.detailsForm.value.street,
                    shippingDate: this.detailsForm.value.shippingDate,
                    creditCard: this.detailsForm.value.creditCard
                })
            })
            .then(response => {
                if (response.status === SUCCESS) {
                    
                    this.router.navigateByUrl("/reception");
                }
            })
    }
}