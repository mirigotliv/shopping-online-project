import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})

export class CartComponent {

    public products: ProductModel[];
    @Input() currentCart = {}
    //@ts-ignore
    @Input() cart = []
    @Input() onClickDelete: Function
    @Input() totalPrice: number
}