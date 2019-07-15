import { environment } from '../environments/environment';
import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { MESSAGE_EVENT } from '../constants';
import { EventMessage } from './shared/_services/event-message/event-message.service';
import { filter } from 'rxjs/operators';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  isShowLoading = false;
  constructor(private http: HttpClient, private router: Router, private eventMsg: EventMessage) {
    this.eventMsg.onMessage(MESSAGE_EVENT.msg_show_loading)
    .subscribe((res: any) => {
      this.isShowLoading = res;
    });
  }

  ngOnInit(): void { 
  }

  smoothScroll(element) {
    (document.querySelector(element)).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }
}
