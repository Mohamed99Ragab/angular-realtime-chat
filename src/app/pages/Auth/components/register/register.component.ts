import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,ValidatorFn, Validators ,AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm:FormGroup;
  constructor(
    private _authService:AuthService,
    private formBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private toaster:ToastrService,
    private router:Router
  ) {
    this.myForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.email,Validators.required]),
      password: new FormControl('',[Validators.required]),
      c_password: new FormControl('',[Validators.required]),
    
    });

    this.myForm.setValidators(this.passwordMatchValidator());

   }

  ngOnInit(): void {
  }


  
    register(){
  
    
  
      if(this.myForm.valid){
  
        this.spinner.show();
          this._authService.register(this.myForm.value).subscribe(res=>{
            this.spinner.hide();
  
            if(res.success == true){
              
                
          
              this.toaster.success(res.message);
  
              this.router.navigate(['/signin']);
  
            }else{
              this.toaster.error(res.message);
  
            }
          })
  
  
      }
    }

    passwordMatchValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('c_password');
    
        if (password && confirmPassword && password.value !== confirmPassword.value) {
          return { passwordMismatch: true };
        }
    
        return null;
      };
    }

}
