import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminBookListComponent } from '../admin-book-list/admin-book-list.component';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private apiCallService: ApiCallService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('admin_id') == undefined)
    {
      this.router.navigate(['']);
    }
  }

  spinnerFlag = false;

  bookForm = new FormGroup({
    book_name: new FormControl('', [Validators.required]),
    author_name: new FormControl('', [Validators.required]),
    book_price: new FormControl('', [Validators.required]),
    publish_year: new FormControl('', [Validators.required]),
  });

  editing_book_name = '';
  editing_author_name = '';
  editing_book_price = '';
  editing_publish_year = '';
  editing_book_id = '';

  saveChangesBtn = false;

  save_book(data: any) {
    const fd = new FormData();
    fd.append('book_name', data.book_name);
    fd.append('author_name', data.author_name);
    fd.append('book_price', data.book_price);
    fd.append('publish_year', data.publish_year);

    this.apiCallService.save_book(fd).subscribe((response: any) => {
      console.log(response);
      this._snackBar.open(response.resp, "OK");
      if (response.is_success) {
        this.bookForm.reset();
      }

    }, (error) => {
      console.log(error);
      this._snackBar.open(error, "OK");
    });

  }

  update_book(data: any) {
    this.spinnerFlag = true;
    const fd = new FormData();
    fd.append('book_name', data.book_name);
    fd.append('author_name', data.author_name);
    fd.append('book_price', data.book_price);
    fd.append('publish_year', data.publish_year);

    this.apiCallService.update_book(fd,this.editing_book_id).subscribe((response: any) => {
      this.spinnerFlag = false;


      console.log(response);

      if (response.is_success) {
        this.bookForm.reset();
        this.saveChangesBtn = false;
        this.editing_book_name = '';
        this.editing_author_name = '';
        this.editing_book_price = '';
        this.editing_publish_year = '';
        this.editing_book_id = '';
      }
      this._snackBar.open(response.resp, "OK");
    }, (error) => {
      this.spinnerFlag = false;
      console.log(error);
      this._snackBar.open(error, "OK");
    });

  }

  reset() {
    this.saveChangesBtn = false;
    this.editing_book_name = '';
    this.editing_author_name = '';
    this.editing_book_price = '';
    this.editing_publish_year = '';
    this.editing_book_id = '';
  }

}
