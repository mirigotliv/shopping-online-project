import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-area/login/login.component';
import { FormRegisterComponent } from './components/register-area/form-register/form-register.component';
import { ShoppingComponent } from './components/shopping-area/shopping/shopping.component';
import { OrderDetailsComponent } from './components/order-area/order-details/order-details.component';
import { ReceptionComponent } from './components/reception-area/reception/reception.component';
import { page404 } from './components/shared-area/page404/page-404.component';

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: FormRegisterComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'order', component: OrderDetailsComponent },
    { path: 'reception', component: ReceptionComponent },
    { path: '**', component: page404 }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }