import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-student-book-list',
  templateUrl: './student-book-list.component.html',
  styleUrls: ['./student-book-list.component.css']
})
export class StudentBookListComponent implements OnInit {

  constructor(private apiCallService: ApiCallService,private router: Router) { }

  ngOnInit(): void {
    this.get_all_books();
  }

  @ViewChild(MatPaginator) paginator: any;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ELEMENT_DATA: PeriodicElement[] = [

  ];

  displayedColumns: string[] = ['sr_no', 'book_name', 'author_name', 'publish_year', 'book_price'];
  dataSource:any;

  get_all_books() {
    this.apiCallService.get_all_books().subscribe((response: any) => {
      this.ELEMENT_DATA = response.resp;
      console.log(response);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    },(error:any) => {
      console.log(error);
    });
  }

}

export interface PeriodicElement {
  id: number;
  book_name: string;
  author_name: number;
  publish_year: number;
  book_price: string;
}
