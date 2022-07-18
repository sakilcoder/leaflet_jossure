
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
    center: [50.59140881901119, -98.19305419921876],
    zoom: 8,
    layers: [basemapCarto, aoiLayer, markers] // default checked layers
});

map.options.minZoom = 5;
// map.fitBounds(aoiLayer.getBounds());

var baseLayers = {
    'Carto': basemapCarto,
    'Google': googleTerrain,
    'OSM': OpenStreetMap_Mapnik,
    'Satellite': Esri_WorldImagery,
};


var marker_geojson = { "type": "FeatureCollection" }

fetchText(csvUrl).then(text => {
    let pois = d3.csvParse(text);
    // console.log(pois);
    let features = [];

    for (i = 0; i < pois.length; i++) {

        if(pois[i].coordinates.trim()=='')
            continue;

        let latlng = pois[i].coordinates.split(',')

        let feature = {
            "type": "Feature",
            "properties": {
                "SLNo": pois[i].SLNo,
                "muin_city": pois[i].muin_city,
                "attraction_site": pois[i].attraction_site,
                "coordinates": pois[i].coordinates,
                "category": pois[i].category,
                "review": pois[i].review,
                "website": pois[i].website,
                "phone": pois[i].phone,
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
    map.setView([50.59140881901119, -98.19305419921876], 8);
    // map.fitBounds(aoiLayer.getBounds());
}).addTo(map);

let polylineMeasure = L.control.polylineMeasure ({position:'topleft', unit:'kilometres', showBearings:true, clearMeasurementsOnStop: false, showClearControl: true, showUnitControl: true});
polylineMeasure.addTo (map);

document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';

L.Control.geocoder().addTo(map);

// ---------------------------------
var popup_info = L.control({ position: 'topright' });
popup_info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info-panle');
    this.update();
    return this._div;
};

popup_info.update = function (html) {
    if (html == null)
        html = '';
    this._div.innerHTML = html;
};

popup_info.addTo(map);

let infoView = 0;
var infoPanel = document.getElementsByClassName("info-panle")[0];

// -------------------------


// var layerControl = L.control.layers(baseLayers, overlays).addTo(map);
// var crownHill = L.marker([39.75, -105.09]).bindPopup('This is Crown Hill Park.');
// var rubyHill = L.marker([39.68, -105.00]).bindPopup('This is Ruby Hill Park.');
// var parks = L.layerGroup([crownHill, rubyHill]);
// layerControl.addOverlay(parks, 'Parks');
// layerControl.addBaseLayer(OpenStreetMap_Mapnik, 'OSM');



