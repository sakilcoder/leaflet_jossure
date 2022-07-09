function onEachAoi(feature, layer) {

    layer.on('click', function (e) {
        console.log(e);
    });

    layer.on('mouseover', function (e) {
        this.setStyle({
            'fillColor': '#a3bf82'
        });
    });

    layer.on('mouseout', function (e) {
        // console.log('out-aoi');
        this.setStyle({
            'fillColor': '#719b6b'
        });
    });

}
function onEachMarker(feature, layer) {

    var icon = getIcon(feature.properties.type);
    var icon1 = icon[0];
    var icon2 = icon[1];
    layer.setIcon(icon1);


    // layer.on('click', function(e) {
    //     console.log(e);
    // });

    layer.on('mouseover', function (e) {

        // console.log(icon);
        layer.setIcon(icon2);

    });

    layer.on('mouseout', function (e) {
        layer.setIcon(icon1);
    });

}

var getIcon = function (type) {
    let gi = '<i class="material-icons g-icon-i" style="font-size:16px; color: #f768a1">place</i>';
    let gi2 = '<i class="material-icons g-icon-i" style="font-size:18px; color: #f768a1">place</i>';
    var icon1 = GoogleIcon('<span class="g-icon">' + gi + '</span>');
    var icon2 = GoogleIcon('<span class="g-icon">' + gi2 + '</span>');
    return [icon1, icon2];
}
