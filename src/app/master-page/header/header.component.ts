import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpRequestService } from '../../shared/_services/http/http-request.service';

declare var $: any;
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpRequestService) { }
    username: any;
    ngOnInit() {
        this.getProfileInfo();

        $(document).on("click", "#sidebar, #btnToggleMenu",function(e){
                e.stopPropagation();
        })
        $(document).click(function(e){
        $('#sidebar').removeClass('showSidebar');
        $('#content').removeClass('expandeContent');
        })
    }
    getProfileInfo() {

      
    }

    logOut() {
        bootbox.confirm("Are you sure that you want to logout?", (result) => {
            if (result) {
                this.http.logout();
                this.router.navigateByUrl('home')
            }
        });
    }

    toggleMenu() {
        if(window.innerWidth <= 768){
            $('#sidebar').toggleClass('showSidebar');
        }
        else{
            $('#sidebar').toggleClass('hiddenSidebar');
          
        }
        $('#content').toggleClass('expandeContent');
        $('.navbar').toggleClass('narExpande');
      
    }
}