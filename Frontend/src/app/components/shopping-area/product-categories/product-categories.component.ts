import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/models/product.model';

const MILK_EGGS_CATEGORY_ID = "6139071ca12a4c3bbb0e808b"

@Component({
    selector: 'app-product-categories',
    templateUrl: './product-categories.component.html',
    styleUrls: ['./product-categories.component.css']
})
export class ProductCategoriesComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public display = "none";
    public count = 1;

    constructor(private http: HttpClient, private myRouter: Router) { }

    async ngOnInit() {
        try {
            this.categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + MILK_EGGS_CATEGORY_ID).toPromise()
        }
        catch (err) {
            console.log(err)
        }
    }

    public async productsByCategory(id: string) {
        try {
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + id).toPromise()
        }
        catch (error) {
            console.log(error)
        }
    }

    openModal() {
        this.display = "block";
    }
    onCloseHandled() {
        this.display = "none";
    }

    addNum() {
        this.count++;
    };

    reset() {
        this.count = 1;
    };

    async addProduct() {
        console.log('add')
    }
}



