import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { LoginComponent } from './components/login-area/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './components/header-area/logo/logo.component';
import { HelloGuestComponent } from './components/header-area/hello-guest/hello-guest.component';
import { AboutUsComponent } from './components/login-area/about-us/about-us.component';
import { TotalQuantityComponent } from './components/login-area/total-quantity/total-quantity.component';
import { StepOneComponent } from './components/register-area/step-one/step-one.component';
import { StepTwoComponent } from './components/register-area/step-two/step-two.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    LogoComponent,
    HelloGuestComponent,
    AboutUsComponent,
    TotalQuantityComponent,
    StepOneComponent,
    StepTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
