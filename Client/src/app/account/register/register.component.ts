import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { FormBuilder, Validators, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, finalize } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errors:string[]|null=null;
  //using formbuilder service from reactive form
constructor(private formBuilder:FormBuilder,private accountService:AccountService , private router : Router){

}
 complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";

registerForm = this.formBuilder.group({
  displayName:['',Validators.required],
  email:['',[Validators.required,Validators.email],[this.validateEmailNotToken()]],
  password:['',[Validators.required,Validators.pattern(this.complexPassword)]],
})

onSubmit(){
  this.accountService.login(this.registerForm.value).subscribe({
    next: ()=>this.router.navigateByUrl('/shop'),
    error:errorSubmit => this.errors = errorSubmit.errors
  })
}

validateEmailNotToken():AsyncValidatorFn{
  return(control: AbstractControl) => {
    return (this.accountService.checkEmailExists(control.value).pipe(
      map(result => result ? {emailExists: true} : null ),
      finalize(()=> control.markAllAsTouched())
    ))
  }
}

}
