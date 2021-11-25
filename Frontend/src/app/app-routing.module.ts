import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-area/login/login.component';
import { OrderPageComponent } from './components/order-area/order-page/order-page.component';
import { ReceptionComponent } from './components/reception-area/reception/reception.component';
import { FormRegisterComponent } from './components/register-area/form-register/form-register.component';
import { page404 } from './components/shared-area/page404/page-404.component';
import { ProductCategoriesComponent } from './components/shopping-area/product-categories/product-categories.component';

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: FormRegisterComponent },
    { path: 'shopping', component: ProductCategoriesComponent },
    { path: 'order', component: OrderPageComponent },
    { path: 'reception', component: ReceptionComponent },
    // { path: '**', component: page404 },
    { path: '**', component: page404 }




    // { path: '**', pathMatch: 'full', redirectTo: '/login' }

    // { path: "missions", component: MissionsListComponent },
    // { path: "missions/new", component: AddMissionComponent },
    // { path: "**", component: Page404Component }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
