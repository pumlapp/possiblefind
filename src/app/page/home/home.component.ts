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
        //this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true)
       
    }

    ngOnInit() {
        this.lstTag = JSON.parse('[{"id":46,"title":"Body Building","type":0,"createdAt":null,"updatedAt":null},{"id":51,"title":"Body Composition","type":0,"createdAt":null,"updatedAt":null},{"id":16,"title":"Body Sculpting","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":8,"title":"Body Transformation","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":3,"title":"Boxing","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":15,"title":"Calisthenics","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":6,"title":"Core Strength","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":10,"title":"Cross Training","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":47,"title":"Cycling","type":0,"createdAt":null,"updatedAt":null},{"id":25,"title":"Functional Training","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":17,"title":"Gymnastics","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":9,"title":"HIIT","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":53,"title":"Metafit","type":0,"createdAt":null,"updatedAt":null},{"id":14,"title":"Muscular Hypertrophy","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":4,"title":"Nutrition","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":24,"title":"Olympic Lifting","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":26,"title":"Performance","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":1,"title":"Pilates","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":19,"title":"Pre-Post Natal","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"},{"id":7,"title":"Rehabilitation","type":0,"createdAt":"2016-08-31T14:24:44.000Z","updatedAt":"2016-08-31T14:24:44.000Z"}]');
        this.lstTag = this.lstTag.sort((tag) => {
            return tag.id;
        })

        this.lstTag.forEach((item) => {
            item.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
        })

        console.log('123')
        this.lstTrainer = JSON.parse('[{"userId":1509,"qualifications":"NASM CPT Certified","stripeCustomerId":null,"achievements":"","yearsOfExperience":null,"distance":50,"nProduct":0,"level":0,"totalTestimonial":0,"hourlyRate":null,"serviceArea":null,"lat":null,"long":null,"websiteUrl":null,"verifiedAt":null,"createdAt":"2019-04-09T00:03:19.000Z","updatedAt":"2019-04-09T00:03:23.000Z","user":{"id":1509,"email":"galushgr12@gmail.com","firstname":"Greg","lastname":" ","imageUrl":"/api/uploads/1697/render","videoUrl":null,"mobile":"919-604-6309","dob":"1994-10-12T00:00:00.000Z","gender":"Male","weight":90,"height":185,"messageNotification":1,"sessionNotification":1,"newleadNotification":1,"status":1,"nNotification":0,"mNotification":0,"lNotification":0,"sNotification":0,"cNotification":0,"emergencyMobile":"","fbId":null,"emergencyName":"","bio":"Whether you’re looking to get into shape for summer, run a half marathon, or just make exercise fun.  Let’s make it happen.","units":"Metric","rating":1,"connectionCount":0,"postCount":0,"mixpanel_id":null,"facebookUrl":"","twitterUrl":"","instagramUrl":"","createdAt":"2019-04-08T16:31:28.000Z","updatedAt":"2019-04-09T22:29:34.000Z","businessId":0,"tags":[{"id":20,"title":"Mind Coaching","userTag":{"createdAt":"2019-04-08T23:56:43.000Z","updatedAt":"2019-04-08T23:56:43.000Z","tagId":20,"userId":1509}},{"id":22,"title":"Plyometrics","userTag":{"createdAt":"2019-04-08T23:56:36.000Z","updatedAt":"2019-04-08T23:56:36.000Z","tagId":22,"userId":1509}},{"id":28,"title":"Strength and Conditioning","userTag":{"createdAt":"2019-04-08T23:56:32.000Z","updatedAt":"2019-04-08T23:56:32.000Z","tagId":28,"userId":1509}},{"id":35,"title":"12 Week Challange","userTag":{"createdAt":"2019-04-08T23:58:26.000Z","updatedAt":"2019-04-08T23:58:26.000Z","tagId":35,"userId":1509}},{"id":38,"title":"Anytime Fitness","userTag":{"createdAt":"2019-04-08T23:56:15.000Z","updatedAt":"2019-04-08T23:56:15.000Z","tagId":38,"userId":1509}}]}}]')
        this.lstTrainer = this.lstTrainer.concat(this.lstTrainer);
        this.lstTrainer = this.lstTrainer.concat(this.lstTrainer);
        this.lstTrainer = this.lstTrainer.concat(this.lstTrainer);


        this.lstTrainer.forEach((item) => {
            item.user.tags.forEach((tag) => {
                tag.color = this.lstColor[Math.floor(Math.random() * this.lstColor.length)]
            })
        })


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