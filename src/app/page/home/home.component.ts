import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';
import { NgxCarousel } from 'ngx-carousel';
import { environment } from '../../../environments/environment.prod';
declare var bootbox: any;

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {
    lstColor = [
        { color: 'cl-blue', background: 'bg-blue' },
        { color: 'cl-light-orange', background: 'bg-light-orange' },
        { color: 'cl-medium-orange', background: 'bg-medium-orange' },
        { color: 'cl-orange', background: 'bg-orange' },
        { color: 'cl-light-gray', background: 'bg-light-gray' },
        { color: 'cl-light-red', background: 'bg-light-red' },
        { color: 'cl-light-purple', background: 'bg-light-purple' },
        { color: 'cl-light-madison', background: 'bg-light-madison' },
        { color: 'cl-turquoise', background: 'bg-turquoise' },
        { color: 'cl-radical-red', background: 'bg-radical-red' },
    ]
    urlPrefix: any = environment.apiUrl;
    lstTopTrainer: any[] = []
    lstTag: any = [];
    lstTrainer: any = [];
    lstTopCity: any[] = []
    lstTrainerFilter: any[] = []
    offset: any = 0;
    limit: any = 30;
    offsetFilter: any = 0;
    limitFilter: any = 30;
    carouselOne: NgxCarousel;
    carouselTwo: NgxCarousel;
    carouselThree: NgxCarousel;
    noMore: any = false;
    isSearch: any = false;
    isViewMap: any = false;
    lstSuggests = [];

    model: any = {
        places: "",
        gender: 'Any Gender',
        cbViewMap: false,
        sort: 'All'
    }

    searchParameter = {
        gender: undefined,
        long: undefined,
        lat: undefined,
        offset: undefined,
        limit: 10,
        city1: undefined,
        city2: undefined,
        state: undefined,
        tagIds: []
    }

    listOfSort: Array<any> = [
        { sort: 'ALL', name: 'All' },
        { sort: 'FEATURED', name: 'Featured' },
        { sort: 'NEWEST', name: 'Newest' },
        { sort: 'NAME', name: 'Name' },
        { sort: 'RATING', name: 'Rating' }
    ];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpRequestService,
        private validationFormService: ValidationFormService,
        private eventMsg: EventMessage
    ) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true)
        this.carouselOne = {
            grid: { xs: 2, sm: 3, md: 4, lg: 5, all: 0 },
            slide: 1,
            speed: 600,
            interval: 3000,
            point: {
                visible: false
            },
            load: 1,
            touch: true,
            custom: 'banner',
            loop: true
        };

    }

    async ngOnInit() {
        await this.getListTag();
        this.getTopFeaturedCoaches();
        this.getTopCity();
        this.getAllCoaches();

        if (!navigator.geolocation) {

        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                this.searchParameter.lat = position.coords.latitude;
                this.searchParameter.long = position.coords.longitude;
                this.http.getAddressByLocation(position.coords.latitude, position.coords.longitude,
                    (result) => {

                        if (result.response.view && result.response.view.length > 0 && result.response.view[0].result && result.response.view[0].result.length > 0 && result.response.view[0].result[0].location) {
                           

                            if(result.response.view[0].result[0].location.address.district)
                                 this.searchParameter.city1 = result.response.view[0].result[0].location.address.district;
                            this.searchParameter.city2 = result.response.view[0].result[0].location.address.city;
                            this.searchParameter.state = result.response.view[0].result[0].location.address.state;
                            //console.log('currentLocation', result.response.view[0].result[0])
                        }

                    }, (error) => {

                    });

            });
        }
    }

    getAllCoaches() {
        this.http.getAllCoaches(this.offset, this.limit).subscribe(resp => {
            const res = resp.json();
            if(res == undefined || res == []) return;
            this.lstTrainer = this.lstTrainer.concat(res);
            for (let item of this.lstTrainer) {
             
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                if (item.user.businessId > 0) {
                    this.http.getBusinessById(item.user.businessId).subscribe(resp => {
                        const res = resp.json()
                        item.user.businessImage = res.imageUrl
                        //console.log( item.user.businessImage )
                    })
                }
            }

            if (res && res.length < this.limit) {

                this.noMore = true;
            }
            if (this.isViewMap == true) {
                this.lstTrainerFilter = this.lstTrainer;
            }
            this.isLoadMore = false;
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);


            if ($('#searchResultId').length > 0) {
                $('html, body').animate({ scrollTop: $('#searchResultId').offset().top - 350 }, 1000);
            }
        })
    }
    getTopFeaturedCoaches() {
        this.http.getTopFeaturedCoaches(this.offset, this.limit).subscribe(resp => {
            const res = resp.json();
            this.lstTopTrainer = res;
            for (let item of this.lstTopTrainer) {
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                if (item.user.businessId > 0) {
                    this.http.getBusinessById(item.user.businessId).subscribe(resp => {
                        const res = resp.json()
                        item.user.businessImage = res.imageUrl;
                        
                    })
                }
            }

        })
    }
    isLoadMore: any = false;
    getMoreTrainer() {
        this.isLoadMore = true;
        this.offset += this.limit;
        this.getAllCoaches();
    }
    offsetTag: any = 0;
    limitTag: any = 20;
    async getListTag() {
        this.http.getListTag(this.offsetTag, this.limitTag).subscribe(async resp => {
            const res = resp.json();
            this.lstTag = this.lstTag.concat(res);
            this.lstTag = this.lstTag.sort((tag) => {
                return tag.id;
            })
            this.lstTag.forEach((item) => {
                let index = Math.floor(Math.random() * this.lstColor.length);
                item.color = this.lstColor[index].color;
                item.background = this.lstColor[index].background;
                item.checked = false;
            })
            if (res && res.length == 0) {
                return;
            }
            this.offsetTag += this.limitTag;
            await this.getListTag();
        })
    }

    async getTopCity() {
        let currentLocation = await this.http.getUserIP().toPromise();
        this.http.getTopCityCountry(currentLocation ? currentLocation.country : "Australia").subscribe(resp => {
            const res = resp.json();
            this.lstTopCity = res;
        })
    }

    searchByGender(gender) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        if (this.isSearch == false && gender == 'Any Gender') {
            this.isSearch = false;
            this.offset = 0;
            this.limit = 30;
            this.lstTrainer = []
            this.model.places = ''
            this.isDisabledSearch = false;
            this.getAllCoaches();
        }
        else {
            this.lstTrainerFilter = []
            this.isSearch = true;
            this.searchParameter.limit = 30;
            this.searchParameter.offset = 0;
            this.searchParameter.gender = gender == 'Any Gender' ? undefined : gender;
            this.getCoaches();
        }
        this.noMore = false;
        this.model.gender = gender;
    }


    getTrainerByCity(city) {
        //console.log(city)
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        this.isDisabledSearch = true;
        this.model.places = city.city;
        this.searchParameter.city2 = city.city;
        this.searchParameter.lat = city.lat == 0 || city.lat == null ? undefined : city.lat;
        this.searchParameter.long = city.long == 0 || city.long == null ? undefined : city.long;
        this.searchParameter.offset = 0;
        this.searchParameter.limit = 30;
        this.isSearch = true;
        this.lstTrainerFilter = []
        this.getCoaches();

    }
    getMoreTrainerFilter() {
        this.isLoadingMap = true;
        if (this.isViewMap == true && this.isSearch != true) {
            this.getMoreTrainer();
        }
        else {
            this.isLoadMore = true;
            this.searchParameter.offset += this.searchParameter.limit;
            this.getCoaches();
        }

    }
    getCoaches() {
        if (this.searchParameter.lat == undefined || this.searchParameter.long == undefined || this.searchParameter.city2 == undefined) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.searchParameter.lat = this.searchParameter.lat == undefined ? position.coords.latitude : this.searchParameter.lat;
                    this.searchParameter.long = this.searchParameter.long == undefined ? position.coords.longitude : this.searchParameter.lat;
                    this.http.getAddressByLocation(position.coords.latitude, position.coords.longitude,
                        (result) => {
                            if (result.response.view && result.response.view.length > 0 && result.response.view[0].result && result.response.view[0].result.length > 0 && result.response.view[0].result[0].location) {
                                if(result.response.view[0].result[0].location.address.district)
                                    this.searchParameter.city1 = result.response.view[0].result[0].location.address.district;
                                   
                                this.searchParameter.city2 = result.response.view[0].result[0].location.address.city;
                                this.searchParameter.state = result.response.view[0].result[0].location.address.state;
                                this.isDisabledSearch = true;
                                this.model.places = this.searchParameter.city2;
                                this.isDisabledSearch = false;
                            }
                        }, (error) => {

                        });
                });
            } else {
                return;
            }
        }

        this.http.getCoaches(this.searchParameter).subscribe(resp => {
            const res = resp.json();
            if(res == undefined || res == []) return;
            this.lstTrainerFilter = this.lstTrainerFilter.concat(res);
            this.lstTrainerFilter = res;
            for (let item of this.lstTrainerFilter) {
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                if (item.user.businessId > 0) {
                    this.http.getBusinessById(item.user.businessId).subscribe(resp => {
                        const res = resp.json()
                        item.user.businessImage = res.imageUrl
                    })
                }
            }
            if (res && res.length < this.limitFilter) {
                this.noMore = true;
            }

            this.isLoadMore = false;
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
            if ($('#searchResultId').length > 0) {
                $('html, body').animate({ scrollTop: $('#searchResultId').offset().top - 350 }, 1000);
            }
        })
    }

    get totalImagesShown (): number {
        return (this.lstTrainer.filter(o => o.user.imageShow) || []).length;
      }

    searchByTags(tag, e) {
        var lstTagSelect = this.lstTag.filter(o => o.checked == true);
        if (tag.checked == false && lstTagSelect && lstTagSelect.length == 4) {
            bootbox.alert("You already selected maximum 4 tags.");
            return;
        }
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        tag.checked = !tag.checked;
        this.lstTag[this.lstTag.indexOf(tag)] = tag;
        let lst = this.searchParameter.tagIds.filter(o => o == tag.id);
        if (lst && lst.length > 0) {
            for (const item of lst) {
                this.searchParameter.tagIds.splice(this.searchParameter.tagIds.indexOf(item), 1);
                if (this.searchParameter.tagIds.length == 0 && (this.model.places == undefined || this.model.places.length == 0)) {
                    this.isSearch = false;
                    this.noMore = false;
                    this.searchByGender('Any Gender')
                    return;
                }
            }
        }
        else {
            this.searchParameter.tagIds.push(tag.id);
        }
        if (this.isSearch != true) {
            this.lstTrainerFilter = []
            this.isSearch = true;
            this.searchParameter.offset = 0;
            this.searchParameter.limit = 30;
        }
        this.getCoaches();
    }

    showMapFilter() {
        if (this.isViewMap == false && this.isSearch != true) {
            this.lstTrainerFilter = this.lstTrainer;
        }
        this.isViewMap = !this.isViewMap;
    }

    searchPlacesFreetext() {
        if (this.isDisabledSearch == true) return;
        if (this.model.places == "" || this.model.places.trim() == "") return;
        this.http.getGeocoderPlacesByFreetext(this.model.places).subscribe(resp => {
            if (resp && resp.suggestions && resp.suggestions.length > 0) {
                //console.log(resp)
                this.lstSuggests = resp.suggestions;
            }
            else {
                this.lstSuggests = [];
            }

        })
    }
    isDisabledSearch = false;
    searchTrainerByPlaces(suggestion, event) {
        this.isSearch = true;
        this.searchParameter.limit = 30;
        this.searchParameter.offset = 0;
        this.isDisabledSearch = true;
        this.lstSuggests = [];
        this.model.places = `${suggestion.address.district ? suggestion.address.district.replace('<mark>', '').replace('</mark>', '') + ',' : ''} ${suggestion.address.city.replace('<mark>', '').replace('</mark>', '')} ${suggestion.address.state ? suggestion.address.state.replace('<mark>', '').replace('</mark>', '') : '' } ${suggestion.address.postalCode ? suggestion.address.postalCode.replace('<mark>', '').replace('</mark>', '') + ',' : ''} ${suggestion.address.country ? suggestion.address.country.replace('<mark>', '').replace('</mark>', '') : ''}`
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        this.http.getLocationByLocationId(suggestion.locationId,
            (result) => {
                let locations = result.Response.View[0].Result;
                this.searchParameter.lat = locations[0].Location.DisplayPosition.Latitude;
                this.searchParameter.long = locations[0].Location.DisplayPosition.Longitude;
                this.searchParameter.city1 = suggestion.address.district ? suggestion.address.district.replace('<mark>', '').replace('</mark>', '') : undefined;
                this.searchParameter.city2 = suggestion.address.city ? suggestion.address.city.replace('<mark>', '').replace('</mark>', '') : undefined;
                this.searchParameter.state =suggestion.address.state ? suggestion.address.state.replace('<mark>', '').replace('</mark>', '') : undefined;

                this.getCoaches();
                this.isDisabledSearch = false;
            },
            (error) => {
                //console.log('Ooops!');
            }
        )
    }
    removeSearchPlace() {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        this.model.places = "";
        this.model.cbViewMap = false;
        this.model.gender = "Any Gender";
        this.searchParameter.tagIds = [];
        this.lstTag.forEach(tag => {
            tag.checked = false;
        });
        this.noMore = false;
        this.isViewMap = false;
        this.isSearch = false;
        this.offset = 0;
        this.limit = 30;
        this.getAllCoaches();
    }
    isLoadingMap: any = true;
    bindingLocationOnMap(done) {
        this.isLoadingMap = !done
    }
}