const searchParams = new URLSearchParams(window.location.search);
const tparam = searchParams.get('t');
var track = [];

if (tparam !== null) {
    var flat_track = tparam.split(",").map(parseFloat);  
    
    while (flat_track.length > 0) {
        track.push(flat_track.splice(0, 2));
    }
}

console.log(track);
const map = L.map('map').setView([42.573, 8.74], 15);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

if (track.length > 0) {
    const drifter_track = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": track,
                },
                "properties": {
                    "popupContent": "drifter03",
                },
                "id": 3
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": track[track.length-1],
                },
                "properties": {
                    "popupContent": "last_position",
                },
                "id": 30
            }
            
        ]
    };

    const drifter_trackLayer = L.geoJSON(drifter_track).addTo(map);
}

