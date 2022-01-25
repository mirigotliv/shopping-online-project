import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/app/models/product.model';

const MILK_EGGS_CATEGORY_ID = "6139071ca12a4c3bbb0e808b"
const SUCCESS = 200

type Product = {
    name: string,
    price: number,
    quantity: number
}
type CurrentCart = {
    [productId: number]: Product
}

@Component({
    selector: 'app-shopping',
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.css']
})

export class ShoppingComponent implements OnInit {
    public categories: CategoryModel[];
    public products: ProductModel[];
    public displayModal = "none";
    public countProducts = 1;
    public price: number
    public productName: string
    public productId: string
    public productsToDisplay: ProductModel[]
    public cart: any[] = [];
    public currentCart: CurrentCart = {}
    public totalPrice: number = 0


    public setProductsToDisplay(searchingText: string) {
        return this.products.filter(product =>
            product.productName.toLowerCase().indexOf(searchingText.toLowerCase()) !== -1)
    }

    public calculateTotalPrice() {
        this.cart.forEach(product => {
            this.totalPrice += product.price
        })
    }

    constructor(private http: HttpClient) { }

    async ngOnInit() {
        try {
            this.categories = await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
            this.products = await this.http.get<ProductModel[]>(environment.productsByCategoryUrl
                + MILK_EGGS_CATEGORY_ID).toPromise()
            this.productsToDisplay = this.products
            this.getCart()
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

    public openModal(
        productId: string,
        productName: string,
        price: number
    ) {
        this.displayModal = "block";
        this.productId = productId,
            this.productName = productName,
            this.price = price
    }

    public onCloseModal() {
        this.displayModal = "none";
    }

    public getCart() {
        fetch('http://localhost:3001/getCart',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                })
            })
            .then(response => response.json())
            .then(cart => {
                this.currentCart = cart
                Object.keys(this.currentCart)
                    .forEach(productId => this.cart.push({
                        //@ts-ignore
                        ...this.currentCart[productId],
                        _id: productId
                    }))
                this.calculateTotalPrice()
            })
    }

    public addProductToCart() {
        fetch('http://localhost:3001/addProductCart',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                    productId: this.productId,
                    productName: this.productName,
                    price: this.price,
                    oldCart: this.currentCart
                })
            })
            //@ts-ignore
            .then(response => response.json())
            .then(cart => {
                this.cart = []
                this.currentCart = cart
                Object.keys(cart)
                    .forEach(productId => this.cart.push({
                        //@ts-ignore
                        ...this.currentCart[productId],
                        _id: productId
                    })
                    )
                this.totalPrice += this.price
                Math.round((this.totalPrice + Number.EPSILON) * 100) / 100
                this.onCloseModal()
            })
    }

    public onClickDelete(productId: number) {
        let productPrice = this.currentCart[productId]?.price || 0
        delete this.currentCart[productId]
        fetch('http://localhost:3001/deleteProductCart',
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                    cart: this.currentCart
                })
            })
            .then(response => {
                if (response.status === SUCCESS) {

                    this.cart = []
                    Object.values(this.currentCart)
                        .forEach(product => {
                            this.cart.push(product)
                        })
                    this.totalPrice -= productPrice
                    this.totalPrice.toFixed(2)
                }
            })
    }

    public onSearchProduct(searchValue: string) {
        fetch('http://localhost:3001/getProducts',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: searchValue
                })
            })
            .then(response => response.json())
            .then(date => console.log('data', date))
    }
}