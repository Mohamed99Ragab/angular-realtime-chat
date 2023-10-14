import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { ApiResponseVM } from '../interfaces/api-response-vm';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _GenericService:GenericService,http:HttpClient) { }


    login(data:any):Observable<ApiResponseVM>
    {


      return this._GenericService.post(data,'login');
    }


    register(data:any):Observable<ApiResponseVM>
    {


      return this._GenericService.post(data,'register');
    }


    get authToken (){

      return localStorage.getItem('token');
    }

    get user (){

     let user =  localStorage.getItem('user');
      if(user != null){
        return JSON.parse(user);

      }
    }


    get logout(){


        this._GenericService.post(null,'logout').subscribe(res=>{

        });
        localStorage.removeItem('token');

        return true;

    }

}
