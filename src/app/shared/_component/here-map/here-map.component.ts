import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, Output, EventEmitter, Renderer2 } from '@angular/core';

import { Observable, Observer, interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
declare var H: any;
declare var mapsjs: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html'
})
export class HereMapComponent implements OnInit, OnChanges {

    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public locations: any[] = [];

    @Input()
    public lat: any;
    @Input()
    public changeInscrement: any;

    @Input()
    public width: any;

    @Input()
    public height: any;
    @Output() bindingDone = new EventEmitter();

    private map: any;

    public constructor(private renderer2: Renderer2) { 

    }
    private isBinding: any = false;
    public ngOnInit() { }
    public ngOnChanges(): void {
        if (this.isBinding == true) return;
        this.isBinding = true;
        this.bindDataIntoMaps();
    }
    public ngAfterViewInit() {
        if (this.isBinding == true) return;
        this.isBinding = true;
        this.bindDataIntoMaps();

    }

    public bindDataIntoMaps() {
        let platform = new H.service.Platform({
            "app_id": "4MAhCHY78b0WBe7MzQ1l",
            "app_code": "RHqFN-bf3g7CsUfvYtKvUQ"
        });
        var pixelRatio = window.devicePixelRatio || 1;
        var defaultLayers = platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });


        // let defaultLayers = platform.createDefaultLayers();
        if (!navigator.geolocation) {

        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                if(this.map){
                    this.map.removeObjects(this.map.getObjects())
               
                }
            else{
                this.map = new H.Map(
                    this.mapElement.nativeElement,
                    defaultLayers.normal.map,
                    {
                        zoom: 2,
                        center: { lat: position.coords.latitude, lng: position.coords.longitude },
                        pixelRatio: pixelRatio
                    }
                );
                 // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
                 var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
                 behavior.disable(H.mapevents.Behavior.WHEELZOOM);
                 // Create the default UI components
                 var ui = H.ui.UI.createDefault(this.map, defaultLayers);
            }
              
                console.log(this.map)
            
               

                let zIndex = 900;
                this.locations.forEach((item) => {


                    var outerElement = document.createElement('div'),
                        innerElement = document.createElement('div'),
                        innerElementBorder1 = document.createElement('div'),
                        innerElementBorder2 = document.createElement('div');

                    outerElement.style.userSelect = 'none';
                    outerElement.style.webkitUserSelect = 'none';
                    outerElement.style.msUserSelect = 'none';
                    outerElement.style.cursor = 'default';



                    innerElementBorder1.style.borderRadius = "50%";
                    innerElementBorder1.style.width = "80px";
                    innerElementBorder1.style.height = "80px";
                    innerElementBorder1.style.position = "absolute";
                    innerElementBorder1.style.zIndex = "3";
                    innerElementBorder1.style.background = "rgba(253, 146, 104, 0.6)";
                    innerElementBorder1.style.top = "-10px";
                    innerElementBorder1.style.left = "-10px";


                    innerElementBorder2.style.borderRadius = "50%";
                    innerElementBorder2.style.width = "100px";
                    innerElementBorder2.style.height = "100px";
                    innerElementBorder2.style.position = "absolute";
                    innerElementBorder2.style.zIndex = "0";
                    innerElementBorder2.style.background = "rgba( 241, 220 ,213, 0.7)";
                    innerElementBorder2.style.top = "-20px";
                    innerElementBorder2.style.left = "-20px";

                    //innerElement.style.border = '10px solid rgba(248, 138, 72, 0.7)';

                    innerElement.style.borderRadius = '50%';
                    innerElement.style.zIndex = `${zIndex++}`;
                    // innerElement.style.height = '80px';
                    // innerElement.style.width = '80px';

                    // add negative margin to inner element
                    // to move the anchor to center of the div
                    // if (item.user.imageUrl == null) {
                    innerElement.style.width = '60px'
                    innerElement.style.height = '60px'
                    innerElement.style.lineHeight = "3.9em";
                    innerElement.style.fontSize = "15px";
                    innerElement.style.background = `#ff5a0f`;
                    innerElement.style.color = `#fff`;
                    innerElement.style.position = 'relative';
                    innerElement.style.textAlign = `center`;
                    innerElement.innerHTML = item.distance;
                    // }
                    // else {
                    //     innerElement.style.background = `url(http://api.pummel.fit/${item.user.imageUrl}?width=80&height=80`;
                    //     innerElement.style.backgroundRepeat = 'no-repeat';
                    //     innerElement.style.backgroundSize = 'cover';
                    //     innerElement.style.backgroundPosition = 'center';

                    // }
                    outerElement.appendChild(innerElement);
                    outerElement.appendChild(innerElementBorder2);
                    outerElement.appendChild(innerElementBorder1);
                    //create dom icon and add/remove opacity listeners
                    var domIcon = new H.map.DomIcon(outerElement);

                    // Marker for Chicago Bears home
                    var bearsMarker = new H.map.DomMarker({ lat: item.lat, lng: item.long }, {
                        icon: domIcon
                    });
                    this.map.addObject(bearsMarker);

                    // map.addEventListener('tap', function (evt) {
                    //     if (evt.target instanceof mapsjs.map.Marker) {
                    //         // increase z-index of the marker that was tapped
                    //         evt.target.setZIndex(999999);
                    //     }
                    // });

                    window.addEventListener('resize', () => {
                        this.map.getViewPort().resize();
                    });

                    // var madridMarker = new H.map.Marker({ lat: item.lat, lng: item.long });
                    // map.addObject(madridMarker);
                    // console.log(item.long, item.lat)
                });
                this.bindingLocationOnMapEvent(true);
                this.isBinding = false;
            });

        }
    }
    bindingLocationOnMapEvent(done) {
        this.bindingDone.emit({ done });

        console.log('done')
    }
}