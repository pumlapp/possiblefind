import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpHeaderService } from './http-header.service';
import { Logger } from '../logger/loger-service.service';
import { RequestOptions } from '@angular/http';
import { Subject, BehaviorSubject, Observable, identity } from 'rxjs';
import { HttpRequest, HttpParams, HttpHeaders, HttpEvent, HttpClient } from '@angular/common/http';
const log = new Logger('Http-Request');

interface LoginInfo {
  userId?: any;
  loggedIn: any;
  email?: any;
  token?: any;
  fullname?: any;
  type?: any;
}

@Injectable()
export class HttpRequestService {
  private httpService: HttpService;
  public loginInfo: BehaviorSubject<LoginInfo>;
  constructor(private http: HttpService, private httpClient: HttpClient) {
    this.httpService = http;
    let pumlUser = JSON.parse(localStorage.getItem('pumlUser'));
    if (pumlUser == null) {
      this.loginInfo = new BehaviorSubject<LoginInfo>({ loggedIn: false, email: "", token: "", userId: 0, });
    }
    else {
      this.loginInfo = new BehaviorSubject<LoginInfo>({
        loggedIn: true,
        email: pumlUser.email,
        token: pumlUser.token,
        userId: pumlUser.userId,
        fullname: pumlUser.fullname,
        type: pumlUser.type
      })
    }
  }

  private getHeader(isAuthorize = false) {
    return new RequestOptions({ headers: HttpHeaderService.getInstance().getRequestHeader(isAuthorize) });
  }
  private getHeaderForUpload(isAuthorize = false) {
    return new RequestOptions({ headers: HttpHeaderService.getInstance().getRequestHeaderForUpload(isAuthorize) });
  }

  private getHeaderFormData(isAuthorize = false) {
    return new RequestOptions({ headers: HttpHeaderService.getInstance().getRequestHeaderFormData(isAuthorize) });
  }
  private getRequestMethodPost(ApiUrl, bodyData, isAuthorize = false) {
    return this.httpService.post(ApiUrl, bodyData, this.getHeader(isAuthorize));
  }

  private getRequestMethodGet(ApiUrl, isAuthorize = false) {
    return this.httpService.get(ApiUrl, this.getHeader(isAuthorize));
  }

  login(params) {
    return this.getRequestMethodPost('/api/login', params).map(resp => {
      // login successful if there's a jwt token in the response
      const user = JSON.parse(JSON.stringify(resp.json()));
      //console.log(user)
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.loginInfo.next({ loggedIn: true, email: "", token: user.id, userId: user.userId, fullname: "" });
        localStorage.clear();
        localStorage.setItem('pumlUser', JSON.stringify({
          userId: user.userId,
          email: "",
          token: user.id,
          fullname: "",
          type: user.type
        }));
      }

      return resp;
    });;
  }
  logout() {
    this.loginInfo.next({ loggedIn: false });
    localStorage.clear();

  }
  public get isAuthenticated() {
    return typeof this.loginInfo != "undefined" ? this.loginInfo.value.loggedIn : false;
  }

  public get LoginInfo() {
    return typeof this.loginInfo != "undefined" ? this.loginInfo.value : null;
  }


  getFormUrlEncoded(toConvert) {

    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  getFormUrlNotEncoded(toConvert) {

    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = toConvert[property];
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  getListTag(offset, limit){
    return this.getRequestMethodGet(`api/searchTags?offset=${offset}&limit=${limit}`);
  }

}



