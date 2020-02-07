import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBarModule } from '@angular/material'
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public dialogBox: MatDialogRef<PostComponent>,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resetForm();
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

    this.api.addContact(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open(res.toString(), '', {
        duration: 2500,
        verticalPosition: 'top'
      });
    })
    this.onClose();
    // console.log(form.value);

  }

  onClose() {

    this.dialogBox.close();
    // this.api.filter('Register click');
  }
}