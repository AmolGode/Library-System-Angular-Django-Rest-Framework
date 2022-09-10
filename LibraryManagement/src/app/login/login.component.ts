import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiCallService } from '../services/api-call.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private apiCallService:ApiCallService, private router:Router,private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.email = localStorage.getItem('signup_email_id')
  }

  email_id = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email_id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email_id.hasError('email_id') ? 'Not a valid email' : '';
  }

  hide = true;
  spinnerFlag = false;


  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loginForm = new FormGroup({
    email_id : this.email_id,
    password : this.password
  });
  email:any;




  admin_login(data:any)
  {
    this.spinnerFlag = true;
    const fd = new FormData();
    fd.append('email_id',data.email_id);
    fd.append('password',data.password);

    this.apiCallService.admin_login(fd).subscribe((response:any)=>
    {
      this.spinnerFlag = false;
      console.warn(response);
      if(response.is_valid)
      {
        localStorage.setItem('admin_id',response.admin_id);
        this.router.navigate(['/admin-dashboard']);
      }
      this._snackBar.open(response.resp,'OK');
    },(error)=>
    {
      this.spinnerFlag = false;
      console.warn(error);
      this._snackBar.open('Server error..!','OK');
    });
  }



}

