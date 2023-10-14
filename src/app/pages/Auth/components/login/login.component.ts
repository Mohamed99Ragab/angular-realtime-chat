import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  myForm: FormGroup;


  constructor(
    private _authService:AuthService,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private router:Router) {

      this.myForm= new FormGroup({
        email: new FormControl('',[Validators.email,Validators.required]),
        password: new FormControl('',[Validators.required])
      
      });


    
   }

  ngOnInit(): void {
  }






  login(){

  

    if(this.myForm.valid){

      this.spinner.show();
        this._authService.login(this.myForm.value).subscribe(res=>{
          this.spinner.hide();

          if(res.success == true){
            
              
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data));


            this.toaster.success(res.message);

            this.router.navigate(['chat']);

          }else{
            this.toaster.error(res.message);

          }
        })


    }
  }



   

}
