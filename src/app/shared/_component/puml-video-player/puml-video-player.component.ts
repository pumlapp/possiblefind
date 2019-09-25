import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment.prod';


declare var $: any;
declare var Hls: any;
@Component({
  selector: 'puml-video-player',
  templateUrl: './puml-video-player.component.html',
  styleUrls: ['puml-video-player.component.scss'],
})
export class PumlVideoPlayerComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('video', {static:false}) video: ElementRef;
  backgroundUrl: any = '';
  @Input() videoUrl: any;
  @Input() trainer: any;
  isPlay: any = false;
  urlPrefix: any = environment.apiUrl;
  imageUrl: any = ''
  constructor(private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    this.imageUrl = this.trainer.user.imageUrl && this.trainer.user.imageUrl.indexOf('render') > -1 ?
      `${environment.apiUrl}${this.trainer.user.imageUrl}?width=768&height=1024` :
      this.trainer.user.imageUrl.replace('height=200&width=200', 'width=768&height=1024')

    let style = `background: url('${this.imageUrl}')`;
    this.backgroundUrl = this.sanitizer.bypassSecurityTrustStyle(style);
    // this.video.nativeElement.addEventListener('playing', function () {
    // })
    this.video.nativeElement.addEventListener('pause', ()=> {
      this.isPlay = false;
    })
  }
  ngOnChanges() {

  }
  ngOnDestroy() {
    this.close();
  }
  play() {
    this.isPlay = true;
    this.video.nativeElement.play();
  }
  close() {
    this.isPlay = false;
    this.video.nativeElement.currentTime = 0;
    this.videoUrl = undefined;
    this.video.nativeElement.pause();
    $('#playVideoModel').modal('hide');
  }

  showSendMessageModal() {
    this.close();
    $('#sendMessengeModal').modal('show');
    $('#requestCallBackModal').modal('hide');

  }

  showRequestCallBackModal() {
    this.close();
    $('#requestCallBackModal').modal('show');
    $('#sendMessengeModal').modal('hide');

  }
}