import { GetComponent } from './get/get.component';
import { PostComponent } from './post/post.component';
import { ApiService } from '../services/api.service';
import { Contact } from './../models/contact-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource, MatSort, MatDialog,
  MatDialogConfig
} from '@angular/material';
import { MatSnackBar, MatDialogRef } from '@angular/material'
import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})


export class ContactsComponent implements OnInit {

  constructor(private apiService: ApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    // private dialogBox: MatDialogRef<ContactsComponent>
  ) {

    this.apiService.listen().subscribe((m: any) => {
      console.log(m);
      this.refreshList();
    })
  }

  public contactData: MatTableDataSource<any>;
  displayedColoumn: string[] = ['Name', 'options'];
  public cont;
  public contDel;

  @ViewChild(MatSort, null) sort: MatSort;


  ngOnInit() {
    this.refreshList();
  }

  refreshList() {

    this.apiService.getContactList().subscribe(data => {
      this.contactData = new MatTableDataSource(data);
      this.contactData.sort = this.sort;
    })

  }

  applyFilter(filtervalue: string) {
    this.contactData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onEdit(cont: Contact) {
    //cont.id = id;
    this.apiService.formData = cont;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(EditComponent, dialogConfig);

    //console.log(cont);
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(PostComponent, dialogConfig);

  }

  // onClose() {

  //   this.dialogBox.close();
  //   this.apiService.filter('Register click');
  // }

  onDelete(id: number) {

    this.apiService.deleteContact(id).subscribe(res => {
      this.refreshList();
      this.snackBar.open(res.toString(), '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    })
    this.refreshList();
    // this.dialog.closeAll();
    
    //console.log(id);
  }


  //onGet(id: number) {
  // this.ApiService.getContact(id).subscribe(data => {
  //   this.cont = data;
  // });
  // this.ApiService.formData = this.cont;
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  // dialogConfig.width = "70%";
  // this.dialog.open(GetComponent, dialogConfig);


  //}

  onGet(cont: Contact) {
    this.apiService.formData = cont;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    this.dialog.open(GetComponent, dialogConfig);

  }

  openModal(templateRef, cont: Contact) {

    this.contDel = cont;
    let dialogRef = this.dialog.open(templateRef, {
      width: '60vw',
      height: '60vh',
      // data: { Name: cont.name, Phone: cont.phoneNum, Email: cont.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ');
      // this.animal = result;
    });
  }

}
