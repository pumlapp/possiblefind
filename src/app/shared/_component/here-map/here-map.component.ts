import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;
declare var mapsjs: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html'
})
export class HereMapComponent implements OnInit {

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
    public width: any;

    @Input()
    public height: any;

    public constructor() { }

    public ngOnInit() { }

    public ngAfterViewInit() {
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

                let map = new H.Map(
                    this.mapElement.nativeElement,
                    defaultLayers.normal.map,
                    {
                        zoom: 4,
                        center: { lat: position.coords.latitude, lng: position.coords.longitude },
                        pixelRatio: pixelRatio
                    }
                );
                // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
                var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

                // Create the default UI components
                var ui = H.ui.UI.createDefault(map, defaultLayers);

                let zIndex = 900;
                this.locations.forEach((item) => {


                    var outerElement = document.createElement('div'),
                        innerElement = document.createElement('div');

                    outerElement.style.userSelect = 'none';
                    outerElement.style.webkitUserSelect = 'none';
                    outerElement.style.msUserSelect = 'none';
                    outerElement.style.cursor = 'default';

                  
                    //innerElement.style.border = '10px solid rgba(248, 138, 72, 0.7)';
                   
                    innerElement.style.borderRadius = '50%';
                    innerElement.style.width = '80px';
                    innerElement.style.zIndex = `${zIndex++}`;
                    innerElement.style.height = '80px';

                    // add negative margin to inner element
                    // to move the anchor to center of the div
                    if (item.user.imageUrl == null) {
                        innerElement.style.lineHeight = "3em";
                        innerElement.style.fontSize = "20px";
                        innerElement.style.background = `#ff5a0f`;
                        innerElement.style.color = `#fff`; 
                        innerElement.style.textAlign = `center`;
                        innerElement.innerHTML = item.distance;
                    }
                    else {
                        innerElement.style.background = `url(http://api.pummel.fit/${item.user.imageUrl}?width=80&height=80`;
                        innerElement.style.backgroundRepeat = 'no-repeat';
                        innerElement.style.backgroundSize = 'cover';
                        innerElement.style.backgroundPosition = 'center';

                    }
                    outerElement.appendChild(innerElement);


                    //create dom icon and add/remove opacity listeners
                    var domIcon = new H.map.DomIcon(outerElement);

                    // Marker for Chicago Bears home
                    var bearsMarker = new H.map.DomMarker({ lat: item.lat, lng: item.long }, {
                        icon: domIcon
                    });
                    map.addObject(bearsMarker);

                    map.addEventListener('tap', function (evt) {
                        if (evt.target instanceof mapsjs.map.Marker) {
                          // increase z-index of the marker that was tapped
                          evt.target.setZIndex(zIndex++);
                        }
                      });

                      window.addEventListener('resize', function () {
                        map.getViewPort().resize(); 
                    });

                    // var madridMarker = new H.map.Marker({ lat: item.lat, lng: item.long });
                    // map.addObject(madridMarker);
                    // console.log(item.long, item.lat)
                });




            });
            
        }



    }

}