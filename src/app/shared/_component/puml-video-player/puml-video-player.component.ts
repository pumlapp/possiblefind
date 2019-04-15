import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges } from '@angular/core';


declare var $: any;
declare var Hls: any;
@Component({
  selector: 'puml-video-player',
  templateUrl: './puml-video-player.component.html',
  styleUrls: ['puml-video-player.component.scss'],
})
export class PumlVideoPlayerComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;

  @Input() video: any;


  constructor() {
  }
  ngOnInit() {

  }
  ngOnChanges() {
  this.play();
  }
  ngOnDestroy() {
  this.close();
  
  }
  play() {
    var url = this.video.m3u8Url;
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(this.videoPlayer.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoPlayer.nativeElement.play();
      });
    }
    $('#playVideoModel').modal('show');
  }
  close() {
   this.videoPlayer.nativeElement.pause();
    $('#playVideoModel').modal('hide');
  }

}