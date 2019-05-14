import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';
import { NgxCarousel } from 'ngx-carousel';
import { environment } from '../../../environments/environment';

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
    genderModel = "Any Gender"
    isMapFilter: any = false;
    places: any = "";
    lstSuggests = [];

    searchParameter = {
        gender: 0,
        long: 0,
        lat: 0,
        offset: 0,
        limit:10,
        city:"",
        state: "",
        tagIds: 0,
        tagIds1: 0,
        tagIds2: 0,
    }

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
    }

    getAllCoaches() {
        this.http.getAllCoaches(this.offset, this.limit).subscribe(resp => {
            const res = resp.json();
            this.lstTrainer = this.lstTrainer.concat(res);
            this.lstTrainer.forEach((item) => {
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                item.user.businessImage = "/api/uploads/1185/render"
            })

            if (res && res.length < this.limit) {
                this.noMore = true;
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
            this.lstTopTrainer.forEach((item) => {
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                item.user.businessImage = "/api/uploads/1185/render"
            })

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
    getTopCity() {
        this.http.getTopCityCountry("Australia").subscribe(resp => {
            const res = resp.json();
            this.lstTopCity = res;
        })
    }

    searchByGender(gender) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        if (gender == 'Any Gender') {
            this.isSearch = false;
            this.offset = 0;
            this.limit = 30;
            this.lstTrainer = []
            this.getAllCoaches();
        }
        else {
            this.lstTrainer = []
            this.isSearch = true;
            this.offsetFilter = 0;
            this.limitFilter = 30;
            this.getCoachesByGender(gender);
        }
        this.genderModel = gender;
    }

    getCoachesByGender(gender) {
        this.searchParameter.gender = gender
        this.http.getCoaches(this.searchParameter).subscribe(resp => {
            const res = resp.json();

            this.lstTrainerFilter = res;
            this.lstTrainerFilter.forEach((item) => {
                item.user.tags.forEach((tag) => {
                    var tagParent = this.lstTag.filter(o => o.id == tag.id)[0];
                    if (tagParent) {
                        tag.color = tagParent.color;
                    }
                    else {
                        tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                    }
                })
                item.user.businessImage = "/api/uploads/1185/render"
            })
            if (res && res.length < this.limitFilter) {
                this.noMore = true;
            }

            this.isLoadMore = false;
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
        })
    }
    getMoreTrainerFilter() {
        this.isLoadMore = true;
        this.offsetFilter += this.limitFilter;
        this.getCoachesByGender(this.genderModel);
    }

    searchByTags(tag, e) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        tag.checked = !tag.checked;

        this.lstTag[this.lstTag.indexOf(tag)] = tag;

        this.lstTrainer = []
        this.isSearch = true;
        this.offset = 0;
        this.limit = 30;
        this.getAllCoaches();


    }

    showMapFilter() {
        this.isMapFilter = !this.isMapFilter;
    }

    searchPlacesFreetext() {
        if (this.places == "" || this.places.trim() == "") return;
        this.http.getGeocoderPlacesByFreetext(this.places).subscribe(resp => {
            if (resp && resp.suggestions && resp.suggestions.length > 0) {
                console.log(resp)
                this.lstSuggests = resp.suggestions;
            }
            else {
                this.lstSuggests = [];
            }

        })
    }

    searchTrainerByPlaces(suggestion) {
        this.http.getLocationByLocationId(suggestion.locationId,
            (result) => {
                let locations =  result.Response.View[0].Result;
                console.log(locations)
               let lat = locations[0].Location.DisplayPosition.Latitude;
               let lng = locations[0].Location.DisplayPosition.Longitude;
            },
            (error) => {
               
                    console.log('Ooops!');
               
            }
        )
    }




}