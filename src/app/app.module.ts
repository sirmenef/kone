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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BulkComponent } from './bulk/bulk.component';
import { AccordionModule } from 'primeng/accordion';
//import { MenuItem } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PostComponent,
    GetComponent,
    EditComponent,
    BulkComponent,
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
    AccordionModule


  ],
  providers: [ApiService],
  entryComponents: [
    PostComponent,
    EditComponent,
    GetComponent,
    ContactsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
