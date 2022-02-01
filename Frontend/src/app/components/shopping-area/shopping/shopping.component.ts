import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';

const MILK_EGGS_CATEGORY_ID = "6139071ca12a4c3bbb0e808b"
const SUCCESS = 200

type Product = {
    _id: string,
    productName: string,
    price: number,
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

    public cart: any[] = [];
    public categories: CategoryModel[];
    public currentCart: CurrentCart = {}
    public displayModal = "none";
    public price: number
    public productId: string
    public productName: string
    public products: ProductModel[];
    public productsToDisplay: ProductModel[]
    public searchResult: any[] = []
    public totalPrice: number = 0
    public _id: any;
    @Input() isUserLoggedIn: Boolean = false

    public calculateTotalPrice() {
        this.totalPrice = 0
        this.cart.forEach(product => {
            this.totalPrice += product.price
            this.totalPrice = +this.totalPrice.toFixed(2)
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

    public fetchAddProductToCart(product?: Product) {
        fetch('http://localhost:3001/addProductCart',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: window.localStorage.getItem('token'),
                    productId: product?._id || this.productId,
                    productName: product?.productName || this.productName,
                    price: product?.price || this.price,
                    oldCart: this.currentCart,
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
                this.calculateTotalPrice()
                this.onCloseModal && this.onCloseModal()
            })
    }

    public deleteProduct(productId: number) {
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
                    const newCart: any = []
                    Object.keys(this.currentCart)
                        .forEach(productId => {
                            newCart.push({
                                //@ts-ignore
                                ...this.currentCart[productId],
                                _id: productId
                            })
                        })
                    this.cart = newCart
                    this.totalPrice -= productPrice
                    this.totalPrice = +this.totalPrice.toFixed(2)
                }
            })
    }

    public fetchSearchProduct(searchValue: string) {
        if (!searchValue) {
            this.searchResult = []
            return
        }
        fetch('http://localhost:3001/getProducts',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: searchValue.toLowerCase()
                })
            })
            .then(response => response.json())
            .then(productsResult => {
                this.searchResult = productsResult
            })
    }
    //@ts-ignore
    const onSearchProduct = this.fetchSearchProduct.bind(this)
    //@ts-ignore
    const addProductToCart = this.fetchAddProductToCart.bind(this)
    //@ts-ignore
    const onClickDelete = this.deleteProduct.bind(this)
}