import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { LoginComponent } from './components/login-area/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './components/header-area/logo/logo.component';
import { HelloGuestComponent } from './components/header-area/hello-guest/hello-guest.component';
import { AboutUsComponent } from './components/login-area/about-us/about-us.component';
import { TotalQuantityComponent } from './components/login-area/total-quantity/total-quantity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepOneComponent } from './components/register-area/step-one/step-one.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactUsComponent } from './components/header-area/contact-us/contact-us.component';
import { MatIconModule } from "@angular/material/icon";
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { OrderComponent } from './components/shopping-area/order/order.component';
import { CartComponent } from './components/shopping-area/cart/cart.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { OrderDetailsComponent } from './components/order-area/order-details/order-details.component';
import { OrderPageComponent } from './components/order-area/order-page/order-page.component';
import { ReceptionComponent } from './components/reception-area/reception/reception.component';
import { StepTwoComponent } from './components/register-area/step-two/step-two.component';
import { ApiService } from './services/api.service';
import { FormRegisterComponent } from './components/register-area/form-register/form-register.component';
import { page404 } from './components/shared-area/page404/page-404.component';
import { ProductCardComponent } from './components/shopping-area/product-card/product-card.component';
import { SearchBarComponent } from './components/shopping-area/search-product/search-bar.component';

@NgModule({
    declarations: [
        LayoutComponent,
        LoginComponent,
        LogoComponent,
        HelloGuestComponent,
        AboutUsComponent,
        TotalQuantityComponent,
        StepOneComponent,
        ContactUsComponent,
        SearchBarComponent,
        ShoppingComponent,
        OrderComponent,
        CartComponent,
        OrderDetailsComponent,
        OrderPageComponent,
        ReceptionComponent,
        StepTwoComponent,
        FormRegisterComponent,
        page404,
        ProductCardComponent
    ],
    imports: [
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
    ],
    providers: [ApiService],
    bootstrap: [LayoutComponent]
})
export class AppModule { }
