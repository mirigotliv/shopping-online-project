// @ts-nocheck

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cart = {}
    cartKeys = []
    constructor() { }

    ngOnInit(): void {
        Object.keys(this.cart).forEach(key => this.cartKeys.push(this.cart[key]))
    }

    cart = {
        milk: {
            name: 'milk',
            price: 5.9
        }
    }
    public displayCartData() {
        console.log('sss')
        Object.keys(this.cart).forEach(key => cartKeys.push(cart[key]))
        // cartKeys = console.log(Object.keys(this.cart)) || Object.keys(this.cart)
    }
    displayCartData()
}
