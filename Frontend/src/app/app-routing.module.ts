import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login-area/login/login.component';
import { StepOneComponent } from './components/register-area/step-one/step-one.component';
// import { HomeComponent } from './components/layout-area/home/home.component';
// import { Page404Component } from './components/layout-area/page404/page404.component';
// import { AddMissionComponent } from './components/missions-area/add-mission/add-mission.component';
// import { MissionsListComponent } from './components/missions-area/missions-list/missions-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: StepOneComponent },

  { path: '**', pathMatch: 'full', redirectTo: '/login' }

  // { path: "home", component: HomeComponent },
  // { path: "missions", component: MissionsListComponent },
  // { path: "missions/new", component: AddMissionComponent },
  // { path: "", redirectTo: "/missions", pathMatch: "full" },
  // { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
