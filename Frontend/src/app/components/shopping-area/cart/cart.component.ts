// @ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

    @Input() currentCart = {}
    @Input() cart = []
    public products: ProductModel[];
    @Input onClickDelete: Function
    @Input totalPrice: number

    constructor() { }

    ngOnInit(): void {

    }
}