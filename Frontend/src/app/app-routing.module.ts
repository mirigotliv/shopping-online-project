import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-area/login/login.component';
import { OrderPageComponent } from './components/order-area/order-page/order-page.component';
import { ReceptionComponent } from './components/reception-area/reception/reception.component';
import { FormRegisterComponent } from './components/register-area/form-register/form-register.component';
import { page404 } from './components/shared-area/page404/page-404.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: FormRegisterComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'order', component: OrderPageComponent },
    { path: 'reception', component: ReceptionComponent },
    { path: '**', component: page404 } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
