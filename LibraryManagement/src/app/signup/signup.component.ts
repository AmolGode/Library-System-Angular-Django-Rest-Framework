import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ApiCallService } from '../services/api-call.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private apiCallService:ApiCallService, private router:Router,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  email_id = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email_id.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email_id.hasError('email') ? 'Not a valid email' : '';
  }

  hide = true;
  spinnerFlag = false;

  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  signupForm = new FormGroup({
    first_name : this.first_name,
    last_name : this.last_name,
    email_id : this.email_id,
    password : this.password
  });


  admin_signup(data:any)
  {
    this.spinnerFlag = true;
    const fd = new FormData();
    fd.append('first_name',data.first_name);
    fd.append('last_name',data.last_name);
    fd.append('email_id',data.email_id);
    fd.append('password',data.password);

    this.apiCallService.admin_signup(fd).subscribe((response:any)=>
    {
      this.spinnerFlag = false;
      console.warn(response);
      if(response.acc_created)
      {
        localStorage.setItem('signup_email_id',data.email_id);
        this.router.navigate(['/']);
      }
      this._snackBar.open(response.resp,'OK');
    },(error)=>
    {
      this.spinnerFlag = false;
      console.warn(error);
      this._snackBar.open('Sorry Account Not Created..! Server error..!','OK');
    });
  }

}
