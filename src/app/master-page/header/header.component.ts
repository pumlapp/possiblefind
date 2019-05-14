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
       
        // $(document).on("click", "#sidebar, #btnToggleMenu",function(e){
        //         e.stopPropagation();
        // })
        // $(document).click(function(e){
        // $('#sidebar').removeClass('showSidebar');
        // $('#content').removeClass('expandeContent');
        // })
    }
}