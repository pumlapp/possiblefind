import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


declare var $: any;
declare var Hls: any;
@Component({
  selector: 'puml-video-player',
  templateUrl: './puml-video-player.component.html',
  styleUrls: ['puml-video-player.component.scss'],
})
export class PumlVideoPlayerComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  backgroundUrl:any = '';
  @Input() videoUrl: any;
  @Input() trainer: any;

  constructor(private sanitizer: DomSanitizer) {
  }
  ngOnInit() {
    let style = `background: url('http://api.pummel.fit/${this.trainer.user.imageUrl}?width=768&height=1024')`;
    this.backgroundUrl = this.sanitizer.bypassSecurityTrustStyle(style); 

  }
  isPlaying: any = false;
  ngOnChanges() {
    this.play();
    
  }
  ngOnDestroy() {
    this.close();

  }
  play() {
    var url = this.videoUrl;
    // if (Hls.isSupported()) {
    //   var hls = new Hls();
    //   hls.loadSource(url);
    //   hls.attachMedia(this.videoPlayer.nativeElement);
    //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //     this.videoPlayer.nativeElement.play();
    //   });
    // }
    $('#playVideoModel').modal('show');
   
  }
  close() {
    //this.videoPlayer.nativeElement.pause();
    $('#playVideoModel').modal('hide');
  }

  showSendMessageModal(){
    $('#sendMessengeModal').modal('show');
    $('#requestCallBackModal').modal('hide');
    $('#playVideoModel').modal('hide');
  }
  
  showRequestCallBackModal(){
    $('#requestCallBackModal').modal('show');
    $('#sendMessengeModal').modal('hide');
    $('#playVideoModel').modal('hide');
  }
}