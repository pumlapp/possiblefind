import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';

declare var H: any;
declare var mapsjs: any;

@Component({
    selector: 'one-point',
    templateUrl: './one-point.component.html'
})
export class OnePointComponent implements OnInit {

    @ViewChild("onepoint")
    public mapElement: ElementRef;

    @Input()
    public appId: any;

    @Input()
    public appCode: any;

    @Input()
    public long: any;
    @Input()
    public pointInfo: any;

    @Input()
    public lat: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

private urlPrefix: any = environment.apiUrl;

    public constructor() { }

    public ngOnInit() { }

    public ngAfterViewInit() {
        let platform = new H.service.Platform({
            "app_id": "4MAhCHY78b0WBe7MzQ1l",
            "app_code": "RHqFN-bf3g7CsUfvYtKvUQ",
            "useHTTPS": "true"
        });
        var pixelRatio = window.devicePixelRatio || 1;
        var defaultLayers = platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });

        let map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 14,
                center: { lat: this.pointInfo.lat, lng: this.pointInfo.long},
                pixelRatio: pixelRatio
            }
        );

        //map.addObject(madridMarker);

        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        behavior.disable(H.mapevents.Behavior.WHEELZOOM);
        // Create the default UI components
        var ui = H.ui.UI.createDefault(map, defaultLayers);

        var outerElement = document.createElement('div'),
        innerOverlayElement = document.createElement('div'),
            innerElement = document.createElement('div');

        outerElement.style.userSelect = 'none';
        outerElement.style.webkitUserSelect = 'none';
        outerElement.style.msUserSelect = 'none';
        outerElement.style.cursor = 'default';


        //innerElement.style.border = '10px solid rgba(248, 138, 72, 0.7)';

        innerOverlayElement.style.borderRadius = "50%";
        innerOverlayElement.style.width = "320px";
        innerOverlayElement.style.height = "320px";
        innerOverlayElement.style.position = "absolute";
        innerOverlayElement.style.zIndex = "0";
        innerOverlayElement.style.background = "rgba(253, 146, 104, 0.6)";
        innerOverlayElement.style.top = "-133px";
        innerOverlayElement.style.left = "-133px";
     

        innerElement.style.borderRadius = '50%';
        innerElement.style.width = '50px';
        innerElement.style.zIndex = '900';
        innerElement.style.height = '50px';
        innerElement.style.position = 'relative';

        // add negative margin to inner element
        // to move the anchor to center of the div
    
        if (this.pointInfo.user.imageUrl == null) {
            innerElement.style.lineHeight = "3em";
            innerElement.style.fontSize = "20px";
            innerElement.style.background = `#ff5a0f`;
            innerElement.style.color = `#fff`;
            innerElement.style.textAlign = `center`;
            innerElement.innerHTML = this.pointInfo.distance;
        }
        else {
            let imageUrl = this.pointInfo.user.imageUrl && this.pointInfo.user.imageUrl.indexOf('render') > -1 ?
            `${this.urlPrefix}${this.pointInfo.user.imageUrl}?width=80&height=80` : 
            this.pointInfo.user.imageUrl.replace('height=200&width=200','width=80&height=80')
      
            innerElement.style.border = '1px solid #ff5a0f'
            innerElement.style.background = `url(${imageUrl})`;
            innerElement.style.backgroundRepeat = 'no-repeat';
            innerElement.style.backgroundSize = 'cover';
            innerElement.style.backgroundPosition = 'center';

        }
        outerElement.appendChild(innerOverlayElement);
        outerElement.appendChild(innerElement);


        //create dom icon and add/remove opacity listeners
        var domIcon = new H.map.DomIcon(outerElement);

        // Marker for Chicago Bears home
        var bearsMarker = new H.map.DomMarker({ lat: this.pointInfo.lat, lng: this.pointInfo.long }, {
            icon: domIcon
        });
        map.addObject(bearsMarker);

      
        window.addEventListener('resize', function () {
            map.getViewPort().resize(); 
        });


        // var madridMarker = new H.map.Marker({ lat: item.lat, lng: item.long });
        
        // console.log(item.long, item.lat)
    }

}
