import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { MESSAGE_EVENT } from '../../../constants';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationFormService } from '../../shared/_services/validation-form/validation-form.service';
import { EventMessage } from '../../shared/_services/event-message/event-message.service';

declare var bootbox: any;
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
    model: any = {};
    isloading = false;
    returnUrl: string;
    loginForm: any;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpRequestService,
        private validationFormService: ValidationFormService,
        private eventMsg: EventMessage
    ) {
        console.log('login')
      //this.router.navigate(['home']);
    }

    ngOnInit() {
    
    }
}