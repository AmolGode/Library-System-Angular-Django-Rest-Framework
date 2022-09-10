import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {

  constructor(private apiCallService: ApiCallService, private router: Router, private _snackBar: MatSnackBar, private adminDashboardComponent: AdminDashboardComponent) { }

  ngOnInit(): void {
    this.get_all_books();
  }

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ELEMENT_DATA: PeriodicElement[] = [

  ];

  displayedColumns: string[] = ['sr_no', 'book_name', 'author_name', 'publish_year', 'book_price', 'delete_or_edit_book'];
  dataSource:any;

  get_all_books() {
    this.apiCallService.get_all_books().subscribe((response: any) => {
      this.ELEMENT_DATA = response.resp;
      console.log(response);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
      this._snackBar.open(error, "OK")
    });
  }

  deleteBook(book_id: any) {
    this.apiCallService.delete_book(book_id).subscribe((response: any) => {
      console.log(response);
      this.get_all_books();
    }, (error) => {
      console.log(error);
    })
  }

  editing_book_name = '';
  editing_author_name = '';
  editing_book_price = '';
  editing_publish_year = '';

  editBook(book_id: any) {
    let editBookObj: any = null;
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].id === book_id) {
        editBookObj = this.ELEMENT_DATA[i];
        break;
      }
    }
    this.adminDashboardComponent.editing_book_name = editBookObj.book_name;
    this.adminDashboardComponent.editing_author_name = editBookObj.author_name;
    this.adminDashboardComponent.editing_book_price = editBookObj.book_price;
    this.adminDashboardComponent.editing_publish_year = editBookObj.publish_year;
    this.adminDashboardComponent.editing_book_id = editBookObj.id;

    this.adminDashboardComponent.saveChangesBtn = true;
  }

}


export interface PeriodicElement {
  id: number;
  book_name: string;
  author_name: number;
  publish_year: number;
  book_price: string;
}