import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';
import { NgxCarousel } from 'ngx-carousel';

declare var bootbox: any;
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ["./home.component.scss"],
})

export class HomeComponent implements OnInit {
    lstColor = [
        'cl-blue',
        'cl-light-orange',
        'cl-medium-orange',
        'cl-orange',
        'cl-light-gray',
        'cl-light-red ',
        'cl-light-purple',
        'cl-light-madison',
        'cl-turquoise',
        'cl-radical-red'
    ]
    lstTag: any = [];
    lstTrainer: any = [];
    carouselOne: NgxCarousel;
    carouselTwo: NgxCarousel;
    carouselThree: NgxCarousel;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpRequestService,
        private validationFormService: ValidationFormService,
        private eventMsg: EventMessage
    ) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true)
       
    }

    ngOnInit() {
        // this.lstTag = JSON.parse('[{"id":46,"title":"Body Building","type":0,"createdAt":null,"updatedAt":null},{"id":51,"title":"Body Composition","type":0,"createdAt":null,"updatedAt":null},{"id":16,"title":"Body Sculpting","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":8,"title":"Body Transformation","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":3,"title":"Boxing","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":15,"title":"Calisthenics","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":6,"title":"Core Strength","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":10,"title":"Cross Training","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":47,"title":"Cycling","type":0,"createdAt":null,"updatedAt":null},{"id":25,"title":"Functional Training","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":17,"title":"Gymnastics","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":9,"title":"HIIT","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":53,"title":"Metafit","type":0,"createdAt":null,"updatedAt":null},{"id":14,"title":"Muscular Hypertrophy","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":4,"title":"Nutrition","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":24,"title":"Olympic Lifting","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":26,"title":"Performance","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":1,"title":"Pilates","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":19,"title":"Pre-Post Natal","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":7,"title":"Rehabilitation","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"}]');
        // this.lstTag = this.lstTag.sort((tag) => {
        //     return tag.id;
        // })

        // this.lstTag.forEach((item) => {
        //     item.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
        // })
        this.getListTag();
        this.getAllCoaches();
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
            loop: false
        };
        this.carouselTwo = {
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
            loop: false
        };
        this.carouselThree = {
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
            loop: false
        };

    }
    offset:any = 0;
    limit:any  =20;
    getAllCoaches() {
        this.http.getAllCoaches(this.offset, this.limit).subscribe(resp => {
            const res = resp.json();
            console.log(res)
            this.lstTrainer = res;
            
            this.lstTrainer.forEach((item) => {
                item.user.tags.forEach((tag) => {
                    tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
                })
            })
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false)

        })
    }
    getMoreTrainer(){
        this.offset += this.limit;
        this.getAllCoaches();
    }
    getListTag() {
        this.http.getListTag(0, 20).subscribe(resp => {
            const res = resp.json();
            this.lstTag = res;
            this.lstTag = this.lstTag.sort((tag) => {
                return tag.id;
            })
            this.lstTag.forEach((item) => {
                item.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
            })

        })
    }
}