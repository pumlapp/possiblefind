import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';

declare var $: any;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
    constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpRequestService) { }

    ngOnInit() {
     
    }
  
}