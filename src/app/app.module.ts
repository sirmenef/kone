import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { JwtInterceptor } from './services/jwtInterceptor';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, } from '@angular/material/input';
import { ContactsComponent } from './contacts/contacts.component';
import { PostComponent } from './contacts/post/post.component';
import { GetComponent } from './contacts/get/get.component';
import { EditComponent } from './contacts/edit/edit.component';
import { MatIconModule, MatDialogModule, MatTableModule, MatSortModule, MatButtonModule, MatSnackBarModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { LoginComponent } from './login/login.component';
//import { MenuItem } from 'primeng/api';

import { AlertComponent } from './_components/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PostComponent,
    GetComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    //MenuItem,
    AccordionModule,
    ReactiveFormsModule,
    RouterModule,


  ],
  providers: [ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [
    PostComponent,
    EditComponent,
    GetComponent,
    ContactsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
