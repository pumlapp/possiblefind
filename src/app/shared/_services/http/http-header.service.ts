import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpRequestService } from './http-request.service';


function _window(): any {
  // return the global native browser window object
  return window;
}


@Injectable()
export class HttpHeaderService {

  private static instance: HttpHeaderService;
  constructor() {
    
  }

  public static getInstance(): HttpHeaderService {
    if (!HttpHeaderService.instance) {
      HttpHeaderService.instance = new HttpHeaderService();
    }
    return HttpHeaderService.instance;
  }


  getRequestHeader(isAuthorize:boolean = false): Headers {
    const headers = new Headers();

    // if(isAuthorize){
    //   let pumlUser = JSON.parse(localStorage.getItem('pumlUser'));
    //   if (pumlUser && pumlUser.token) {
    //     headers.append('Authorization', `${pumlUser.token}`);
    //   }
    // }
   // headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    //  headers.append('Access-Control-Allow-Origin', '*');
    //  headers.append("Access-Control-Allow-Headers", "X-Requested-With, X-Requested-By");
    //  headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

     headers.append("Access-Control-Allow-Origin", "*");
     headers.append("Access-Control-Allow-Credentials", "true");
     headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
     headers.append("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");


    return headers;
  }  
  getRequestHeaderFormData(isAuthorize:boolean = false): Headers {
    const headers = new Headers();

    if(isAuthorize){
      let pumlUser = JSON.parse(localStorage.getItem('pumlUser'));
      if (pumlUser && pumlUser.token) {
        headers.append('Authorization', `${pumlUser.token}`);
      }
    }
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }  
}
