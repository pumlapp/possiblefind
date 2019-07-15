import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { HttpHeaderService } from './http-header.service';
import { Logger } from '../logger/loger-service.service';
import { RequestOptions } from '@angular/http';
import { Subject, BehaviorSubject, Observable, identity } from 'rxjs';
import { HttpRequest, HttpParams, HttpHeaders, HttpEvent, HttpClient } from '@angular/common/http';
const log = new Logger('Http-Request');
declare var H: any;
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
  // private getHeaderForUpload(isAuthorize = false) {
  //   return new RequestOptions({ headers: HttpHeaderService.getInstance().getRequestHeaderForUpload(isAuthorize) });
  // }

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
      const user = JSON.parse(JSON.stringify(resp.json()));
      if (user && user.id) {
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

  getListTag(offset, limit) {
    return this.getRequestMethodGet(`api/searchTags?offset=${offset}&limit=${limit}`);
  }

  getAllCoaches(offset, limit) {
    return this.getRequestMethodGet(`api/coaches/getAllCoaches?offset=${offset}&limit=${limit}`);
  }
  getTopFeaturedCoaches(offset, limit) {
    return this.getRequestMethodGet(`api/coaches/getTopFeaturedCoaches?offset=${offset}&limit=${limit}`);
  }

  getBusinesses(businessId) {
    return this.getRequestMethodGet(`api/businesses/${businessId}`);
  }
  phoneNumberValidator(phone) {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any>(`http://apilayer.net/api/validate?access_key=073e4cae041f3556062f7611d1f21fe3&number=${phone}&country_code=&format = 1`, { headers: headers });
  }
  getUserIP() {
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any>('https://pro.ip-api.com/json?key=51iPzMPnp1eZMmi', { headers: headers });
  }
  getTopCityCountry(country) {
    return this.getRequestMethodGet(`api/topCityCountry/${country}/cities`);
  }
  getCoaches(params) {
    const formBody = [];
    for (const property in params) {
      if (property == "tagIds") {
        for (const tag in params[property]) {
          const encodedKey = property;
          const encodedValue = params[property][tag];
          if (encodedValue != undefined) {
            formBody.push(encodedKey + '=' + encodedValue);
          }
        }
      }
      else {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = params[property];
        if (encodedValue != undefined) {
          formBody.push(encodedKey + '=' + encodedValue);
        }
      }
    }
    return this.getRequestMethodGet(`api/coaches/searchdistanceV4?${formBody.join('&')}`);
  }

  getCoachesById(id) {
    return this.getRequestMethodGet(`api/coaches/${id}`);
  }

  getCoachesTag(id) {
    return this.getRequestMethodGet(`api/users/${id}/tags`);
  }

  getCoachesPhotos(id, offset, limit) {
    return this.getRequestMethodGet(`api/users/${id}/photos?offset=${offset}&limit=${limit}`);
  }

  getAllTestimonial(id, offset, limit) {
    return this.getRequestMethodGet(`api/users/${id}/getAllTestimonial?offset=${offset}&limit=${limit}`);
  }

  submitATestimonial(params){
    return this.getRequestMethodPost(`api/mobileCoachTrack`, params);
  }

  getBusinessById(id) {
    return this.getRequestMethodGet(`api/businesses/${id}`);
  }

  getMobileCoachTrack(id) {
    return this.getRequestMethodPost(`api/mobileCoachTrack`, { coachId: id });
  }

  requestACallBackOrMessage(params) {
    return this.getRequestMethodPost(`api/callBacks/requestACallBackOrMessage`, params);
  }

  /****HereMap API */
  getGeocoderPlacesByFreetext(freeText) {
    var params =
      'query=' + encodeURIComponent(freeText) +   // The search text which is the basis of the query
      '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token. 
      '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token. 
      '&maxresults=10' +  // The upper limit the for number of suggestions to be included 
      // in the response.  Default is set to 5.
      '&app_id=' + '4MAhCHY78b0WBe7MzQ1l' +
      '&app_code=' + 'RHqFN-bf3g7CsUfvYtKvUQ';
    const headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<any>(`https://autocomplete.geocoder.api.here.com/6.2/suggest.json?${params}`, { headers: headers });

  }

  getLocationByLocationId(locationId, onGeocodeSuccess, onGeocodeError) {
    let platform = new H.service.Platform({
      "app_id": "4MAhCHY78b0WBe7MzQ1l",
      "app_code": "RHqFN-bf3g7CsUfvYtKvUQ",
      "useHTTPS": "true"
    });
    var geocoder = platform.getGeocodingService();
    let geocodingParameters = {
      locationId: locationId
    };

    geocoder.geocode(
      geocodingParameters,
      onGeocodeSuccess,
      onGeocodeError
    );
  }
  getAddressByLocation(lat, long, onGeocodeSuccess, onGeocodeError) {
    let platform = new H.service.Platform({
      "app_id": "4MAhCHY78b0WBe7MzQ1l",
      "app_code": "RHqFN-bf3g7CsUfvYtKvUQ",
      "useHTTPS": "true"
    });
    var geocoder = platform.getGeocodingService(),
      reverseGeocodingParameters = {
        prox: `${lat},${long}`, // Berlin
        mode: 'retrieveAddresses',
        maxresults: '1',
        jsonattributes: 1
      };

    geocoder.reverseGeocode(
      reverseGeocodingParameters,
      onGeocodeSuccess,
      onGeocodeError
    );
  }

  /****End Heremap API */
}




