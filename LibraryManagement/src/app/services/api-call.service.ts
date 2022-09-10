import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminBookListComponent } from '../admin-book-list/admin-book-list.component';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  api_url = 'http://127.0.0.1:8000';
  constructor(private http:HttpClient) { }

  admin_login(fd:any)
  {
    return this.http.post(this.api_url+'/admin_api/login/',fd);
  }

  admin_signup(fd:any)
  {
    return this.http.post(this.api_url+"/admin_api/save_admin/",fd);
  }

  save_book(fd:any)
  {
    return this.http.post(this.api_url+"/book_api/save_book/",fd);
  }

  update_book(fd:any,book_id:any)
  {
    return this.http.put(this.api_url+"/book_api/update_book/"+book_id+"/",fd);
  }

  get_all_books()
  {
    return this.http.get(this.api_url+"/book_api/get_all_books/");
  }

  delete_book(book_id:any)
  {
    return this.http.delete(this.api_url+"/book_api/delete_book/"+book_id+"/");
  }
}
