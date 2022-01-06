import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/models/product.model';

const MILK_EGGS_CATEGORY_ID = "6139071ca12a4c3bbb0e808b"

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

    public categories: CategoryModel[];
    public products: ProductModel[];
    public display = "none";
    public count = 1;
    public price: number
    public productName: string
    public _searchText: string
    public productsToDisplay: ProductModel[]
    public productId: string


    get searchText(): string {
        return this._searchText
    }

    set searchText(value: string) {
        this._searchText = value;
        this.http.get<ProductModel[]>(environment.productsByCategoryUrl + MILK_EGGS_CATEGORY_ID).toPromise()
        this.productsToDisplay = this.setProductsToDisplay(value)
    }

    public setProductsToDisplay(searchingText: string) {
        return this.products.filter(product =>
            product.productName.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1)
    }

    constructor(private http: HttpClient, private router: Router) { }
    async ngOnInit() {
        try {
            this.categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + MILK_EGGS_CATEGORY_ID).toPromise()
            console.log('products', this.products)
            this.productsToDisplay = this.products
        }
        catch (err) {
            console.log(err)
        }
    }

    public async onClickCategory(id: string) {
        try {
            this.productsToDisplay = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl + id).toPromise()
        }
        catch (error) {
            console.log(error)
        }
    }

    public openModal(productId: string) {
        this.display = "block";
        this.productId = productId
    }

    public onCloseHandled() {
        this.display = "none";
    }

    public addNum() {
        this.count++;
    };

    public reset() {
        this.count = 1;
    };

    public addProductToCart() {
        console.log('this.productId', this.productId);
        console.log('window--', window);
        console.log('token', window.localStorage.getItem('token'))
        fetch('http://localhost:3001/addProductCart',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                    productId: this.productId
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
            })
    }

    //     addProduct() {
    //         console.log('add')
    //         // window.localStorage.setItem('token', token);
    //     }
}



