
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

let parks_lg = L.layerGroup();
let museums_lg = L.layerGroup();
let cafe_restaurent_shop_lg = L.layerGroup();
let playgrounds_lg = L.layerGroup();
let campgrounds_lg = L.layerGroup();
let art_gallery_lg = L.layerGroup();
let golf_courses_lg = L.layerGroup();
let tourist_atts_lg = L.layerGroup();
let hiking_lg = L.layerGroup();
let resorts_lg = L.layerGroup();
let others_lg = L.layerGroup();


var map = L.map('map', {
    center: [50.59140881901119, -98.19305419921876],
    zoom: 8,
    layers: [basemapCarto, aoiLayer, parks_lg, museums_lg, campgrounds_lg, golf_courses_lg, tourist_atts_lg, hiking_lg] // default checked layers
});

map.options.minZoom = 5;
// map.fitBounds(aoiLayer.getBounds());

var baseLayers = {
    'Carto': basemapCarto,
    'Google': googleTerrain,
    'OSM': OpenStreetMap_Mapnik,
    'Satellite': Esri_WorldImagery,
};

var parks_geojson = { "type": "FeatureCollection" }
var museums_geojson = { "type": "FeatureCollection" }
var cafe_restaurent_shop_geojson = { "type": "FeatureCollection" }
var playgrounds_geojson = { "type": "FeatureCollection" }
var campgrounds_geojson = { "type": "FeatureCollection" }
var art_gallery_geojson = { "type": "FeatureCollection" }
var golf_courses_geojson = { "type": "FeatureCollection" }
var tourist_atts_geojson = { "type": "FeatureCollection" }
var hiking_geojson = { "type": "FeatureCollection" }
var landmarks_geojson = { "type": "FeatureCollection" }
var resorts_geojson = { "type": "FeatureCollection" }
var others_geojson = { "type": "FeatureCollection" }

let parks= [];
let museums= [];
let cafe_restaurent_shop= [];
let playgrounds= [];
let campgrounds= [];
let art_gallery= [];
let golf_courses= [];
let tourist_atts= [];
let hikings= [];
let resorts= [];
let others= [];

fetchText(csvUrl).then(text => {
    let pois = d3.csvParse(text);
    // console.log(pois);

    
console.log(pois);
    for (i = 0; i < pois.length; i++) {

        if(pois[i].coordinates.trim()=='')
            continue;

        let latlng = pois[i].coordinates.split(',')

        let feature = {
            "type": "Feature",
            "properties": {
                "id": pois[i].id,
                // "muin_city": pois[i].muin_city,
                "attraction_site": pois[i].attraction_site,
                "coordinates": pois[i].coordinates,
                "prime_cat": pois[i].prime_cat,
                "category": pois[i].category,
                "review": pois[i].review,
                "website": pois[i].website,
                "phone": pois[i].phone,
                "address": pois[i].address,
                // "description": pois[i].description
            },
            "geometry": { "type": "Point", "coordinates": [parseFloat(latlng[1].trim()), parseFloat(latlng[0].trim())] }
        };

        let type = pois[i].prime_cat;

        if(type=='Art gallery' || type=='Performing arts theater'){
            art_gallery.push(feature);
        }else if(type=='Tourist attraction' || type=='Airport' || type=='Association' || type=='Auditorium' || type=='Bank' || type=='Beach' 
        || type=='Bridge' || type=='Community center' ){
            tourist_atts.push(feature);
        }else if(type=='Park' || type=='Dog park' ){
            parks.push(feature);
    
        }else if(type=='Museum' || type=='History museum' || type=='Rail museum' || type=='Haunted house' || type=='Historical landmark'){
            museums.push(feature);
    
        }else if(type=='Arena' || type=='Bowling alley' || type=='Hockey rink'|| type=='Ice skating rink' || type=='Playground' || type=='Shooting range' || type=='Softball field' || type=='Sports complex' || type=='Stadium' || type=='Sports' || type=='Sporta'){
            playgrounds.push(feature);
    
        }else if(type=='Campground' || type=='Camp'){
            campgrounds.push(feature);
    
        }else if(type=='Golf' || type=='Golf club' || type=='Golf course'){
            golf_courses.push(feature);
    
        }else if(type=='Cafe' || type=='Café' || type=='Cfe' || type=='Gym' || type=='Pharmacy' || type=='Salon' || type=='Shop' || type=='Spa'){
            cafe_restaurent_shop.push(feature);
    
        }else if(type=='Hiking'){
            hikings.push(feature);
    
        }else if(type=='Resort' || type=='Ski resort' || type=='Hotel'){
            resorts.push(feature);
    
        }else{
            others.push(feature);
        }

    }

    parks_geojson.features = parks;
    museums_geojson.features = museums;
    cafe_restaurent_shop_geojson.features = cafe_restaurent_shop;
    playgrounds_geojson.features = playgrounds;
    campgrounds_geojson.features = campgrounds;
    art_gallery_geojson.features = art_gallery;
    golf_courses_geojson.features = golf_courses;
    tourist_atts_geojson.features = tourist_atts;
    hiking_geojson.features = hikings;
    resorts_geojson.features = resorts;
    others_geojson.features = others;

    L.geoJSON(parks_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(parks_lg);

    L.geoJSON(museums_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(museums_lg);

    L.geoJSON(cafe_restaurent_shop_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(cafe_restaurent_shop_lg);

    L.geoJSON(playgrounds_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(playgrounds_lg);

    L.geoJSON(campgrounds_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(campgrounds_lg);

    L.geoJSON(art_gallery_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(art_gallery_lg);

    L.geoJSON(golf_courses_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(golf_courses_lg);

    L.geoJSON(tourist_atts_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(tourist_atts_lg);

    L.geoJSON(hiking_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(hiking_lg);

    L.geoJSON(resorts_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(resorts_lg);

    L.geoJSON(others_geojson, {
        onEachFeature: onEachMarker,
    }).addTo(others_lg);


    let park_str = 'Parks (' + parks.length + ')';
    let museums_str = 'Museums (' + museums.length + ')';
    let playgrounds_str = 'Playgrounds (' + playgrounds.length + ')';
    let campgrounds_str = 'Campgrounds (' + campgrounds.length + ')';
    let art_gallery_str = 'Art Gallery (' + art_gallery.length + ')';
    let golf_courses_str = 'Golf Courses (' + golf_courses.length + ')';
    let tourist_atts_str = 'Tourist Attraction (' + tourist_atts.length + ')';
    let hiking_str = 'Hiking (' + hikings.length + ')';
    let resorts_str = 'Resorts (' + resorts.length + ')';
    let cafe_restaurent_shop_str = 'Cafe/Restaurent/Shop (' + cafe_restaurent_shop.length + ')';
    let others_str = 'Others (' + others.length + ')';


    let overlays ={};
    overlays['MANITOBA MUNICIPALITIES'] = aoiLayer;
    overlays[museums_str] = museums_lg;
    overlays[playgrounds_str] = playgrounds_lg;
    overlays[campgrounds_str] = campgrounds_lg;
    overlays[art_gallery_str] = art_gallery_lg;
    overlays[golf_courses_str] = golf_courses_lg;
    overlays[tourist_atts_str] = tourist_atts_lg;
    overlays[hiking_str] = hiking_lg;
    overlays[resorts_str] = resorts_lg;
    overlays[cafe_restaurent_shop_str] = cafe_restaurent_shop_lg;
    overlays[others_str] = others_lg;
    
/*    var overlays = {
        // 'Tulum': tulumLayer,
        'MANITOBA MUNICIPALITIES': aoiLayer,
        park_str : parks_lg,
        'Museums': museums_lg,
        'Playgrounds': playgrounds_lg,
        'Campgrounds': campgrounds_lg,
        'Art Gallery': art_gallery_lg,
        'Golf Courses': golf_courses_lg,
        'Tourist Attraction': tourist_atts_lg,
        'Hiking': hiking_lg,
        'Resorts': resorts_lg,
        'Others': others_lg,
    };
*/
    var layerControl = L.control.layers(baseLayers, overlays).addTo(map);

});




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



