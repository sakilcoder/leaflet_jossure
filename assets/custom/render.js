function onEachAoi(feature, layer) {

    // var popup = L.popup();
    // let str_popup = '<h5 class="text-center" style="font-weight: bold">' + feature.properties.MUNI_NO + ', ' + feature.properties.MUNI_NAME+ '</h5>';
    // str_popup += '<h5 class="text-center">'+ feature.properties.MUNI_LIST_NAME_WITH_TYPE +'</h5>';

    // popup.setContent(str_popup);
    // layer.bindPopup(popup, popupOptions);


    layer.on('click', function (e) {
        console.log(e);
    });

    layer.on('mouseover', function (e) {
        // var popup = e.target.getPopup();
        // popup.setLatLng(e.latlng).openOn(map);

        this.setStyle({
            'weight': 2,
            'color': "#fff",
            'opacity': 1,
            'fillColor': '#dd1c77',
            'fillOpacity': 0
        });
    });

    layer.on('mouseout', function (e) {
        // e.target.closePopup();
        // console.log('out-aoi');
        this.setStyle({
            'weight': 1,
            'color': "#fff",
            'opacity': 1,
            'fillColor': '#6baed6',
            'fillOpacity': 1
        });
    });

}
function onEachMarker(feature, layer) {

    var popup = L.popup();
    let str_popup = '<h5 class="text-center" style="font-weight: bold">'+ feature.properties.attraction_site +'</h5>';
    str_popup += '<h5 class="text-center">'+ feature.properties.muin_city +'</h5>';
    str_popup += '<table style="width: 100%">';
    str_popup += '<tr><td class="text-center">'+feature.properties.address + '</td></tr>';
    str_popup += '<tr><td class="text-center">'+feature.properties.description + '</td></tr>';
    str_popup += '</table>';

    popup.setContent(str_popup);
    layer.bindPopup(popup, popupOptions);

    var icon = getIcon();
    var icon1 = icon[0];
    var icon2 = icon[1];
    layer.setIcon(icon1);


    // layer.on('click', function(e) {
    //     console.log(e);
    // });

    layer.on('mouseover', function (e) {
        var popup = e.target.getPopup();
        popup.setLatLng(e.latlng).openOn(map);
        // console.log(icon);
        layer.setIcon(icon2);

    });

    layer.on('mouseout', function (e) {
        e.target.closePopup();
        layer.setIcon(icon1);
    });

}

var getIcon = function () {
    let gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #f768a1">place</i>';
    let gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #f768a1">place</i>';
    var icon1 = GoogleIcon('<span class="g-icon">' + gi + '</span>');
    var icon2 = GoogleIcon('<span class="g-icon">' + gi2 + '</span>');
    return [icon1, icon2];
}
