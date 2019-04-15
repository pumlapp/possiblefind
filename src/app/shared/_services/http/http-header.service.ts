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

    if(isAuthorize){
      let pumlUser = JSON.parse(localStorage.getItem('pumlUser'));
      if (pumlUser && pumlUser.token) {
        headers.append('Authorization', `${pumlUser.token}`);
      }
    }
    headers.append('Accept', 'application/json');
    //headers.append('Content-Type', 'application/json; charset=utf-8');
    headers.append('Access-Control-Allow-Origin', '*');

    return headers;
  }  

  getRequestHeaderForUpload(isAuthorize:boolean = false): Headers {
    const headers = new Headers();

    if(isAuthorize){
      let pumlUser = JSON.parse(localStorage.getItem('pumlUser'));
      if (pumlUser && pumlUser.token) {
        headers.append('Authorization', `${pumlUser.token}`);
      }
    }
    headers.append('Content-Type', 'video/mp4');
    headers.append('Access-Control-Allow-Origin', '*');

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
