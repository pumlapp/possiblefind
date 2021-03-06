import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';
import { NgxCarousel } from 'ngx-carousel';
import { environment } from '../../../environments/environment.prod';
declare var $: any;
declare var bootbox: any;
@Component({
    moduleId: module.id,
    templateUrl: 'trainer-profile.component.html',
    styleUrls: ["./trainer-profile.component.scss"]

})

export class TrainerProfileComponent implements OnInit {
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
    starsCount: number;
    currentVideo: any;
    urlPrefix: any = environment.apiUrl;
    lstOfImages = []
    lstTestimonial = []
    trainer: any = undefined;
    trainerId: 0;
    lstTag: any[] = []
    carouselOne: NgxCarousel;
    requestCallBackForm: any;
    sendMessageForm: any;
    testimonialForm: any;
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
                this.getUserPhotos();
                this.getAllTestimonial();
            }
            else {
                this.router.navigate(['/'])
            }
        });

        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
    }
    ngOnInit() {
        this.carouselOne = {
            grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
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
        this.requestCallBackForm = this.formBuilder.group({
            'fullname': ['', [Validators.required]],
            'email': ['', [Validators.required, this.validationFormService.emailValidator]],
            'mobile': ['', [Validators.required]]

        });
        this.sendMessageForm = this.formBuilder.group({
            'fullname': ['', [Validators.required]],
            'email': ['', [Validators.required, this.validationFormService.emailValidator]],
            'message': ['', [Validators.required]]
        });
        this.testimonialForm = this.formBuilder.group({
            'name': ['', [Validators.required]],
            'location': ['', [Validators.required]],
            'comment': ['', [Validators.required]],
            'rating': ['', [Validators.required]]
        });
    }
    getTrainerProfile(id) {
        this.http.getCoachesById(id).subscribe(resp => {
            const res = resp.json();
            if (res) {
                this.trainer = res;
                if (this.trainer.user.businessId > 0) {
                    this.http.getBusinessById(this.trainer.user.businessId).subscribe(resp => {
                        const res = resp.json()
                        this.trainer.user.businessImage = res.imageUrl
                    })
                }
                this.getMobileCoachTrack(id);
            }
            $(document).ready(() => {
                $('html, body').animate({ scrollTop: $('.trainer-profile').offset().top - 350 }, 200);
            })
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
        })
    }

    getMobileCoachTrack(id) {
        this.http.getMobileCoachTrack(id).subscribe(resp => {
            const res = resp.json();
            this.trainer.user.points = res ? res.leads : 0;
        })
    }

    addATestimonial() {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        const params = {
            userId: this.trainer.user.id,
            userCommentId: 684,
            userCommentName: this.testimonialForm.get('name').value,
            userCommentLocation: this.testimonialForm.get('location').value,
            description: this.testimonialForm.get('comment').value,
            rating: this.testimonialForm.get('rating').value,
        };
        this.http.submitATestimonial(params).subscribe(resp => {
            const res = resp.json();
            console.log(res)
            $('#testimonialModal').modal('hide');
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
            bootbox.alert(`Thank you for your testimonial`);
        },
        (error) => {
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
            bootbox.alert(`Thank you for your testimonial`);
        })
    }

    sendCallBackOrMessage(isCallback = true) {
        this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, true);
        let params = {
        }
        if (isCallback == true) {
            params = {
                fullName: this.requestCallBackForm.get('fullname').value,
                email: this.requestCallBackForm.get('email').value,
                mobile: this.requestCallBackForm.get('mobile').value,
            }
        }
        else {
            params = {
                fullName: this.sendMessageForm.get('fullname').value,
                email: this.sendMessageForm.get('email').value,
                message: this.sendMessageForm.get('message').value,
            }
        }
        this.http.requestACallBackOrMessage(params).subscribe(resp => {
            const res = resp.json()
            $(`#${isCallback == true ? 'requestCallBackModal' : 'sendMessengeModal'}`).modal('hide');
            this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
            bootbox.alert(`Your ${isCallback == true ? 'request' : 'message'} has been sent.`)
        },
            (error) => {
                this.eventMsg.sendMessage(MESSAGE_EVENT.msg_show_loading, false);
                bootbox.alert(`Your ${isCallback == true ? 'request' : 'message'} has been sent.`)
            })
    }

    getUserTag() {
        this.http.getCoachesTag(this.trainerId).subscribe(resp => {
            const res = resp.json();
            this.lstTag = res;
            this.lstTag.forEach((item) => {
                let index = Math.floor(Math.random() * this.lstColor.length);
                item.color = this.lstColor[index].color;
            })
        })
    }

    getUserPhotos() {
        this.http.getCoachesPhotos(this.trainerId, 0, 10).subscribe(resp => {
            const res = resp.json();
            if (res && res.length == 0) return;
            this.lstOfImages = res;
        })
    }

    getAllTestimonial() {
        this.http.getAllTestimonial(this.trainerId, 0, 10).subscribe(resp => {
            const res = resp.json();
            if (res && res.length == 0) return;
            this.lstTestimonial = res.list;
        })
    }

    isPlay: any = false;
    videoUrl: any = "";
    currentTrainer: any;
    playVideo() {
        $('#playVideoModel').modal('show');
    }
}