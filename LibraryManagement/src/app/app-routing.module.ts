import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBookListComponent } from './admin-book-list/admin-book-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentBookListComponent } from './student-book-list/student-book-list.component';


const routes: Routes = [
  {
    path: '',
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:'full'
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    pathMatch:'full'
  },
  {
    path:'student-book-list',
    component:StudentBookListComponent,
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
