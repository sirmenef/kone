import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarModule } from '@angular/material'
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'


@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<GetComponent>,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit() {
  }

  onClose() {

    this.dialogBox.close();
    this.api.filter('Register click');
  }

  onSubmit(form: NgForm, id: number) {
    this.api.editContact(form.value).subscribe(res => {
      res.toString(), 'Saved!', {
        duration: 5000,
        vertticalPosition: 'top'
      }
      this.dialogBox.close();
    })
  }
}
