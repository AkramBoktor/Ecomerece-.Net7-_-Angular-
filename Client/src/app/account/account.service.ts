import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { IUser } from '../shared/Models/user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<IUser | null>(null!);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient,private router:Router) { }

  loadCurrentUser(token: string){
let headers = new HttpHeaders();
headers = headers.set('Authorization',`Bearer ${token}`);
return this.httpClient.get<IUser>(this.baseUrl + 'account', {headers}).pipe(
  map(user=>{
    localStorage.setItem('token',user.token);
    this.currentUserSource.next(user);
  })
)
  }

  login(user:any){
    return this.httpClient.post<IUser>(this.baseUrl+'account/login',user).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  register(user:IUser){
    return this.httpClient.post<IUser>(this.baseUrl+'account/register',user).pipe(
      map(user=>{
        localStorage.setItem('token',user.token);
        this.currentUserSource.next(user);
      })
    )
  }

  logout(){
   localStorage.removeItem('token');
   this.currentUserSource.next(null);
   this.router.navigateByUrl('/');
  }
  
  checkEmailExists(email:string){
    return this.httpClient.get<boolean>(this.baseUrl+'account/emailexists?email='+email);
  }
}
