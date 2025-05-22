let map = L.map('map').setView([0, 0], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([0, 0]).addTo(map);

function sendLocationToServer(lat, lng) {
    fetch('/update_location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: lat, lng: lng })
    }).catch(err => console.error('Error sending location:', err));
}

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(position => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], 18);

        sendLocationToServer(lat, lng);
    }, error => {
        console.error('Geolocation error:', error);
        alert("Location access is required!");
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    });
} else {
    alert("Geolocation is not supported by this browser.");
}