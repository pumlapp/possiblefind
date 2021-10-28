import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, Output, EventEmitter, Renderer2 } from '@angular/core';
declare var H: any;
declare var mapsjs: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html'
})
export class HereMapComponent implements OnInit, OnChanges {

    @ViewChild("map", {static:false})
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
            "app_code": "RHqFN-bf3g7CsUfvYtKvUQ",
            "useHTTPS": "true"
        });
        var pixelRatio = window.devicePixelRatio || 1;
        var defaultLayers = platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
        });

        if (!navigator.geolocation) {

        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                if (this.map) {
                    this.map.removeObjects(this.map.getObjects())

                }
                else {
                    this.map = new H.Map(
                        this.mapElement.nativeElement,
                        defaultLayers.normal.map,
                        {
                            zoom: 8,
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
                    innerElementBorder1.style.background = "rgba(189, 232, 218, 0.7)";
                    innerElementBorder1.style.top = "-10px";
                    innerElementBorder1.style.left = "-10px";


                    innerElementBorder2.style.borderRadius = "50%";
                    innerElementBorder2.style.width = "100px";
                    innerElementBorder2.style.height = "100px";
                    innerElementBorder2.style.position = "absolute";
                    innerElementBorder2.style.zIndex = "0";
                    innerElementBorder2.style.background = "rgba(218, 242, 234, 0.3)";
                    innerElementBorder2.style.top = "-20px";
                    innerElementBorder2.style.left = "-20px";
                    innerElement.style.borderRadius = '50%';
                    innerElement.style.zIndex = `${zIndex++}`;
                    innerElement.style.width = '60px'
                    innerElement.style.height = '60px'
                    innerElement.style.lineHeight = "3.9em";
                    innerElement.style.fontSize = "15px";
                    innerElement.style.background = `#1AADAD`;
                    innerElement.style.color = `#fff`;
                    innerElement.style.position = 'relative';
                    innerElement.style.textAlign = `center`;
                    innerElement.innerHTML = item.distance;
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
                    window.addEventListener('resize', () => {
                        this.map.getViewPort().resize();
                    });
                });
                this.bindingLocationOnMapEvent(true);
                this.isBinding = false;
            });

        }
    }
    bindingLocationOnMapEvent(done) {
        this.bindingDone.emit({ done });
    }
}