import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';
import { NgxCarousel } from 'ngx-carousel';
import { environment } from '../../../environments/environment';

declare var bootbox: any;
@Component({
    moduleId: module.id,
    templateUrl: 'trainer-profile.component.html',
    styleUrls: ["./trainer-profile.component.scss"],
})

export class TrainerProfileComponent {
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
    urlPrefix: any = environment.orginUrl;
    lstOfImages = [
      
    ]
    trainer:any = undefined;
    trainerId: 0;
    lstTag:any[] = []
    carouselOne: NgxCarousel;
    constructor(
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http: HttpRequestService,
        private validationFormService: ValidationFormService,
        private eventMsg: EventMessage
    ) {

        this.activatedRoute.params.subscribe((res) => {
            var id = res["id"];
            
            if (id) {
                this.trainerId = id;
                this.getTrainerProfile(id);
                this.getUserTag();
            }
            else {
            }
        });

        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true)
        // this.carouselOne = {
        //     grid: { xs: 2, sm: 3, md: 4, lg: 5, all: 0 },
        //     slide: 1,
        //     speed: 600,
        //     interval: 3000,
        //     point: {
        //         visible: false
        //     },
        //     load: 1,
        //     touch: true,
        //     custom: 'banner',
        //     loop: true
        // };
    }
    
    

    getTrainerProfile(id) {
         this.http.getCoachesById(id).subscribe(resp => {
             const res = resp.json();
             if(res){
                this.trainer = res;
                console.log(res)
             }
           
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
         })
    }

     getUserTag() {
        this.http.getCoachesTag(this.trainerId).subscribe( resp => {
            const res = resp.json();
            this.lstTag = res;
           
            this.lstTag.forEach((item) => {
                let index = Math.floor(Math.random() * this.lstColor.length);
                item.color = this.lstColor[index].color;
            })
        })
    }
    getUserPhotos() {
        this.http.getCoachesPhotos(this.trainerId, 0, 10).subscribe( resp => {
            const res = resp.json();
            this.lstOfImages = []
            //if(res && res.length == 0) return;
           // this.lstOfImages = res;
        })
    }
}