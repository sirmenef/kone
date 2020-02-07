import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarModule } from '@angular/material'
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<EditComponent>,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }


  onClose() {

    this.dialogBox.close();
    this.api.filter('Register click');
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.api.formData = {
      id: 0,
      name: '',
      phoneNum: '',
      email: ''
    }
  }

  onSubmit(form: NgForm) {
    this.api.editContact(form.value).subscribe(res => {
      this.snackBar.open(res.toString(), '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    })
    this.onClose();
  }
}
