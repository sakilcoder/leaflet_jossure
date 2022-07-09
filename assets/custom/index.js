
const fetchText = async (url) => {
    const response = await fetch(url);
    return await response.text();
}
// const csvUrl = 'assets/data/pois.csv';
const csvUrl = 'assets/data/rms_of_manitoba.csv';

let travers = 0;
// --------------------------------------------------------------------

// var tulumLayer = L.geoJSON(tulum, {
//     style: styleArea,
//     onEachFeature: onEachArea,
// });

var aoiLayer = L.geoJSON(manitoba, {
    style: styleAoi,
    onEachFeature: onEachAoi,
});

// aoiLayer.on('click', function(e) { console.log(e.layer) });

var markers = L.layerGroup();

var map = L.map('map', {
    center: [49.59140881901119, -98.19305419921876],
    zoom: 10,
    layers: [googleTerrain, aoiLayer, markers] // default checked layers
});

// map.options.minZoom = 14;
// map.fitBounds(aoiLayer.getBounds());

var baseLayers = {
    'Google': googleTerrain,
    'OSM': OpenStreetMap_Mapnik,
    'Satellite': Esri_WorldImagery,
    'Carto': basemapCarto,
};


var marker_geojson = { "type": "FeatureCollection" }

fetchText(csvUrl).then(text => {
    let pois = d3.csvParse(text);
    console.log(pois);
    let features = [];

    for (i = 0; i < pois.length; i++) {

        if(pois[i].coordinates.trim()=='')
            continue;

        let latlng = pois[i].coordinates.split(',')

        console.log(latlng[1].trim());

        let feature = {
            "type": "Feature",
            "properties": {
                "SLNo": pois[i].SLNo,
                "muin_city": pois[i].muin_city,
                "attraction_site": pois[i].attraction_site,
                "coordinates": pois[i].coordinates,
                "address": pois[i].address,
                "description": pois[i].description
            },
            "geometry": { "type": "Point", "coordinates": [parseFloat(latlng[1].trim()), parseFloat(latlng[0].trim())] }
        };
        features.push(feature);
    }
    marker_geojson.features = features;

    // console.log(marker_geojson);

    L.geoJSON(marker_geojson, {
        // style: styleAoi,
        onEachFeature: onEachMarker,
    }).addTo(markers);

});

var overlays = {
    // 'Tulum': tulumLayer,
    'MANITOBA MUNICIPALITIES': aoiLayer,
    'Markers': markers
};

var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

L.easyButton('fa-home fa-lg', function () {
    // map.setView([20.204919296905683, -87.47374525771015], 17);
    map.fitBounds(aoiLayer.getBounds());
}).addTo(map);

let infoView = 1;
var infoPanel = document.getElementById("info");
L.easyButton('fa-navicon fa-lg', function () {
    if (infoView == 1) {
        infoView = 0;
        infoPanel.style.display = "none";
    } else {
        infoView = 1;
        infoPanel.style.display = "block";
    }
}).setPosition('topright');

// infoPanel.addTo(map);

let polylineMeasure = L.control.polylineMeasure ({position:'topleft', unit:'kilometres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true});
polylineMeasure.addTo (map);

document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

// var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
// var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
// var rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');
// var parks = L.layerGroup([crownHill, rubyHill]);
// layerControl.addOverlay(parks, 'Parks');
// layerControl.addBaseLayer(OpenStreetMap_Mapnik, 'OSM');



