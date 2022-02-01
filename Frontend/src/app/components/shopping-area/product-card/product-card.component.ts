import { Component, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent  {

    @Input()
    public product: ProductModel;
    public display = "none";
}
