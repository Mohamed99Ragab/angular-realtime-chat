import { GenericService } from './../../../core/services/generic.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  token:string|null;
  constructor(private _AuthService:AuthService,private httpClient:HttpClient) {
    
    this.token = this._AuthService.authToken;
  }

  getSockets(): Echo {
    return new Echo({
      broadcaster: 'pusher',
      key: environment.pusher_key,
      cluster: environment.pusher_cluster,
      // wsHost: window.location.hostname,      // This Can Work
      wsHost: environment.pusher_host,          // This is also Can Work
      authEndpoint: `${environment.broadcastBaseUrl}`,
      
      auth: {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      },
      encrypted: false,   // set it to true when use custom SSL certificate
      forceTLS: false,    // it's important to added this line
      wsPort: 6001,
      disableStats: true,
      // enabledTransports: ['ws']  // it's optional
    });
  }


  sendMessage(message: string, socketId: string) {
    // We Insert the Token in header here and not in AuthTokenInterceptor because we want to send 'X-Socket-ID' with headers
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ` + this.token,
        'X-Socket-ID': socketId
      })
    };
    return this.httpClient.post(`${environment.BaseUrl}send-message`, message, options);
  }

  sendDirectMessage(message: string, authUserId: number, socketId: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
        'X-Socket-ID': socketId
      })
    };
    const data = { message, authUserId };
    return this.httpClient.post(`${environment.BaseUrl}send-direct-message`, data, options);
  }




}
