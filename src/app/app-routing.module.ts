import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guard/auth.guard';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: '', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
