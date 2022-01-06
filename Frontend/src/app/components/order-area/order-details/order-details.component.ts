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
    street: string
    city: string
    shippingDate: Date
    creditCard: number
    detailsForm: FormGroup;
    submitted = false;
    today = new Date()
    now: Date;

    constructor(private formBuilder: FormBuilder,
        private http: HttpClient,
        private router: Router
    ) { }

    cities: CityModel[];

    async ngOnInit() {
        this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise()
        // display message-check if all the fields in the form are full:
        this.detailsForm = this.formBuilder.group({
            city: ['', [Validators.required, Validators.minLength(5)]],
            street: ['', [Validators.required, Validators.minLength(5)]],
            shippingDate: ['', [Validators.required]],
            creditCard: ['', [Validators.required, Validators.minLength(4)]]
        }, {
            validator: MustMatch('city', 'street', 'shippingDate', 'creditCard')
        });
        // possibility for the user to select a date 'from today'
        //  and not an expired date on the schedule:
        const dateSchedule = new DatePipe('en-Us');
        this.now = dateSchedule.transform(new Date(), 'yyyy-MM-dd');
    }

    // function for getting the list of all the cities in the select box:
    public async getCities(args: Event) {
        try {
            this.cities = await this.http.get<CityModel[]>(environment.citiesUrl).toPromise();
            console.log(this.cities);
        }
        catch (err) {
            console.log(err);
        }
    }

    // convenience getter for easy access to form fields
    get form() { return this.detailsForm.controls; }

    // function to check fields when the user click on the button "Order" in the form
    public checkDetailsForm() {
        // this.submitted = true;
        if (this.detailsForm.valid) {
            this.router.navigateByUrl("/reception");
        }
        else {
            return
        }
    }

    // function to submit data:
    onSubmit() {
        this.submitted = true;
    }
}