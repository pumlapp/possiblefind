import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';

declare var $: any;
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls:['header.component.scss']
})
export class HeaderComponent {
    constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpRequestService) { }

    isMobile:any = false;
    ngOnInit() {
    }
}