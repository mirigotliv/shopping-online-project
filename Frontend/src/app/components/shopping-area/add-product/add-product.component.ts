import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{
    public product: ProductModel = new ProductModel();

  constructor(private http: HttpClient, private myRouter: Router) { }

//   async ngOnInit(){

     async addProduct() {
        try {
            await this.http.post<ProductModel>(environment.productsUrl, this.product).toPromise();
            alert("המשימה התווספה לטבלת המטלות!");
            this.myRouter.navigateByUrl("/products");
        }
        catch (err) {
            alert(err);
        }
    }
  }
// }

