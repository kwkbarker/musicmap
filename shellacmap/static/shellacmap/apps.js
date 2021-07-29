// Global variable containing all collection titles
const collections = [
    "Select a Collection",
    "Excavated Shellac",
    "Live With Me on Earth: World Folk Rock"
]

// Global variables to control markers, windows and default zoom
let allMarkers = [];
let openWindow = null;
let zoomValue = 2.5;

// initialize map using gmaps api
function initMap() {

    var selectedMap = 'none';

    // define map options
    var options = {
        // center on Brooklyn
        center: { lat: 40.6782, lng: -73.9442 },
        restriction: {
            // restrict to prevent map repeating with scroll
            latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180,
            },
            strictBounds: true,
        },
        zoom: zoomValue,

        // initialize map controls to show on screen
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER,
    },
    scaleControl: true,
    }

    // create initialized map
    const map = new google.maps.Map(document.getElementById("map"), options);

    // render title heading on map
    const titleHeading = document.querySelector('#titleHeading');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(titleHeading);

    // // const collectionHeading = document.querySelector('#collectionHeading');
    // // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(collectionHeading);

    // create select menu for collections
    const selector = document.querySelector('#menu');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(selector);
    var selectList = document.createElement("select");
    selectList.id = "selector";
    selector.appendChild(selectList);
    selectList.addEventListener("change", () => {
        selectedMap = selectList.value;
        if (selectedMap && selectedMap != 'Select a Collection') {
            document.querySelector("#collectionHeading").innerHTML = "";
            const heading = document.querySelector("#collectionHeading");
            var headingContent = document.createElement("div");
            headingContent.innerHTML = selectedMap;
            headingContent.id = "headingContent";
            heading.appendChild(headingContent);
        } else {
            document.querySelector("#collectionHeading").innerHTML = "";
        }
        renderMap(selectedMap, map);
    })

    for (var i = 0; i < collections.length; i++) {
        var option = document.createElement("option");
        option.value = collections[i];
        option.text = collections[i];
        selectList.appendChild(option);
    }

    // render map
    renderMap(selectedMap, map);

    // render top and bottom headings
    const topHeading = document.querySelector('#topHeading');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(topHeading);
    topHeading.innerHTML = "<h1 id='titleHeading'>MusicMap</h1><br>";

    const bottomHeading = document.querySelector('#bottomHeading');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(bottomHeading);
    bottomHeading.innerHTML = "<span id='collectionHeading'></span>";

}





function renderMap(selectedMap, map) {    

    // remove any existing markers
    for (var i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(null);
    }

    allMarkers = [];


    // fetch markers for selected map

    fetch('/markers', {
        method: 'POST',
        body: JSON.stringify({
            'map': selectedMap,
        })
    })
    .then(response => response.json())
    .then(result => {
        const markers = result;
        console.log(markers);

        // add markers to map

        for (var i = 0; i < markers.length; i++) {
            addMarker(markers[i], map);
        }
    })
    .catch(error => {
        console.log('Error:', error);
    })

    
  
}


function addMarker(marker, map) {
    // define marker image
    const image = "http://maps.google.com/mapfiles/kml/paddle/go.png";
    
    //create marker using data in 'marker'
    const newMarker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(marker['lat']), parseFloat(marker['lng'])),     
        map: map,
        title: `${marker['heading']}`,
        icon: image,
        optimized: false,
    });

    // extract marker content, format to html
    const contentString = 
        '<div id="content">' +
        `<h3>${marker['heading']}</h3>` +
        `<p>${marker['audiolabel']}</p>` +
        `<audio controls src="${marker['audio']}"></audio>` +
        `<p>${marker['text']}</p>` +
        `<p>- from <a href="${marker['textref']}" target="_blank">${marker['textref']}</a>` +
        "</div>"
    ;

    // define listener
    newMarker.addListener("click", () => {

        const infoWindow = new google.maps.InfoWindow({
            width: 500,
        });
  
        infoWindow.setContent(contentString);
        // close open window
        if (openWindow != null){
            openWindow.close();
        }
        // default zoom to 4 for proper display
        if (map.zoom < 4) {
            map.setZoom(4);
        }
        infoWindow.open(map, newMarker);
        openWindow = infoWindow;
    });

    // add marker to array of markers
    allMarkers.push(newMarker);

    // contain window within map borders if zoom increases
    map.addListener("zoom_changed", () => {

        if (openWindow != null) {
            if (map.zoom <= 3) {
                // calculate proper height given zoom level
                var heightvar = (map.zoom * 150 - (openWindow.getPosition().lat()));

                if (openWindow.getPosition().lat() > 40) {
                    heightvar = heightvar - openWindow.getPosition().lat();
                }
                iwContainter = document.querySelector("#content");
                iwContainter.style.height = `${heightvar}px`;
            } else if (map.zoom > 3) {
                iwContainter.style.height = "500px";
            }
        }
    })



    
}