function onEachAoi(feature, layer) {

    // var popup = L.popup();
    // let str_popup = '<h5 class="text-center" style="font-weight: bold">' + feature.properties.MUNI_NO + ', ' + feature.properties.MUNI_NAME+ '</h5>';
    // str_popup += '<h5 class="text-center">'+ feature.properties.MUNI_LIST_NAME_WITH_TYPE +'</h5>';

    // popup.setContent(str_popup);
    // layer.bindPopup(popup, popupOptions);


    layer.on('click', function (e) {

        let str_popup = '<a href="#" class="pull-right" style="padding:2px 5px 0 0" onclick="closeInfoPanel();"><i class="fa fa-close"></i></a>';
        str_popup += '<h5 class="text-center" style="font-weight: bold">' + feature.properties.MUNI_NO + ', ' + feature.properties.MUNI_NAME+ '</h5>';
        str_popup += '<h5 class="text-center">'+ feature.properties.MUNI_LIST_NAME_WITH_TYPE +'</h5>';

        infoView = 1;
        infoPanel.style.display = "block";

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    
        popup_info.update(str_popup);

    });

    layer.on('mouseover', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(map);

        // this.setStyle({
        //     'weight': 2,
        //     'color': "#fff",
        //     'opacity': 1,
        //     'fillColor': '#dd1c77',
        //     'fillOpacity': 0
        // });
    });

    layer.on('mouseout', function (e) {
        // e.target.closePopup();
        // console.log('out-aoi');

        // this.setStyle({
        //     'weight': 1,
        //     'color': "#fff",
        //     'opacity': 1,
        //     'fillColor': '#F7CCAC',
        //     'fillOpacity': .8
        // });
    });

}
function onEachMarker(feature, layer) {

    var icon = getIcon(feature.properties.category);
    var icon1 = icon[0];
    var icon2 = icon[1];
    var popup_icon=icon[2];
    layer.setIcon(icon1);

    let str_popup = '';
    str_popup += '<h5 class="text-center" style="font-weight: bold">'+ feature.properties.attraction_site +' ('+ popup_icon +') </h5>';
    str_popup += '<h5 class="text-center">'+ feature.properties.category + ' (' + feature.properties.review + ' <i class="material-icons" style="font-size:12px;color:orange">star_rate</i>)</h5>';
    str_popup += '<table style="width: 100%">';
    str_popup += '<tr><td class="text-center">Phone: +' + feature.properties.phone + ' Website: <a href="'+ feature.properties.website +'" target="_blank" title="'+ feature.properties.website +'">Click Here</a></td></tr>';
    str_popup += '<tr><td class="text-center"></td></tr>';
    str_popup += '<tr><td class="text-center">' + feature.properties.address + '</td></tr>';
    str_popup += '</table>';

    // popup.setContent(str_popup);
    // layer.bindPopup(popup, popupOptions);

    


    layer.on('click', function(e) {
        console.log(e);
        
    });

    layer.on('mouseover', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(map);
        // console.log(icon);
        layer.setIcon(icon2);

        infoView = 1;
        infoPanel.style.display = "block";

        popup_info.update('<a href="#" class="pull-right" style="padding:2px 5px 0 0" onclick="closeInfoPanel();"><i class="fa fa-close"></i></a>' + str_popup);

    });

    layer.on('mouseout', function (e) {
        // e.target.closePopup();
        layer.setIcon(icon1);
    });

}

var getIcon = function (type) {
    let gi = '';
    let gi2 = '';

    if(type=='Amusement park' || type=='City park' || type=='Dog park' || type=='Park' || type=='State park' || type=='Nature preserve' || type=='Recreation center' || type=='Water park' || type=='Skateboard park'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #34A853">park</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #34A853">park</i>';

    }else if(type=='Museum' || type=='History museum' || type=='Rail museum' || type=='Haunted house' || type=='Historical landmark'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #B25068">museum</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #B25068">museum</i>';

    }else if(type=='Arena' || type=='Bowling alley' || type=='Hockey rink'|| type=='Ice skating rink' || type=='Playground' || type=='Shooting range' || type=='Softball field' || type=='Sports complex' || type=='Stadium' || type=='Sports'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #4D77FF">sports</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #4D77FF">sports</i>';

    }else if(type=='Campground' || type=='Camp'){
        gi = '<i class="fas fa-campground g-icon-i" style="font-size:12px; color: #E45826"></i>';
        gi2 = '<i class="fas fa-campground g-icon-i" style="font-size:14px; color: #E45826"></i>';

    }else if(type=='Art gallery' || type=='Performing arts theater'){
        gi = '<i class="fas fa-palette g-icon-i" style="font-size:12px; color: #BD4291"></i>';
        gi2 = '<i class="fas fa-palette g-icon-i" style="font-size:14px; color: #BD4291"></i>';

    }else if(type=='Movie theater'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #D18CE0">local_movies</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #D18CE0">local_movies</i>';

    }else if(type=='Disc golf course' || type=='Golf club' || type=='Golf course'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #F473B9">golf_course</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #F473B9">golf_course</i>';

    }else if(type=='Tourist attraction'){
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #34A853">add_a_photo</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #34A853">add_a_photo</i>';

    }else if(type=='Hiking area'){
        gi = '<i class="fas fa-hiking g-icon-i" style="font-size:16px; color: #139487"></i>';
        gi2 = '<i class="fas fa-hiking g-icon-i" style="font-size:18px; color: #139487"></i>';

    }else if(type=='Resort' || type=='Ski resort'){
        gi = '<i class="fa fa-hotel g-icon-i" style="font-size:16px; color: #890F0D"></i>';
        gi2 = '<i class="fa fa-hotel g-icon-i" style="font-size:18px; color: #890F0D"></i>';

    }else{
        gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #4CACBC">place</i>';
        gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #4CACBC">place</i>';
    }


    var icon1 = GoogleIcon('<span class="g-icon">' + gi + '</span>');
    var icon2 = GoogleIcon('<span class="g-icon">' + gi2 + '</span>');
    return [icon1, icon2, gi];
}


function closeInfoPanel(){
    infoView = 0;
    infoPanel.style.display = "none";

}