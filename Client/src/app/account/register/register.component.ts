import { Component } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  //using formbuilder service from reactive form
constructor(private formBuilder:FormBuilder,private accountService:AccountService , private router : Router){

}
 complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";

registerForm = this.formBuilder.group({
  displayName:['',Validators.required],
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern(this.complexPassword)]],
})

onSubmit(){
  this.accountService.login(this.registerForm.value).subscribe({
    next: ()=>this.router.navigateByUrl('/shop')
  })
}

}
