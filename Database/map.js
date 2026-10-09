// SRM University center coordinates (from GPS track)
const SRM_CENTER = [28.9192, 77.1302];

// Initialize map
const map = L.map('map').setView(SRM_CENTER, 18);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// ─── CLEAN ROAD SEGMENTS based on real GPS walk ───
// Each array is one straight road segment drawn separately for tidiness

const roadSegments = [
  // 1. Parking → Main Gate (horizontal entry road)
  [
    [28.92004, 77.12669],
    [28.92003, 77.12784],  // Main Gate
  ],

  // 2. Main Gate → inside junction (slight diagonal entry path)
  [
    [28.92008, 77.12784],  // Main Gate
    [28.92003, 77.12789],
    [28.91987, 77.12800],
    [28.91984, 77.12835],  // junction near Boys Hostel path
  ],

  // 3. Junction → Boys Hostel (short spur)
  [
    [28.91984, 77.12835],
    [28.91960, 77.12835],
    [28.91949, 77.12827],  // Boys Hostel
  ],

  // 4. Junction → Girls Hostel / Stationery (south path)
  [
    [28.91984, 77.12835],
    [28.91920, 77.12832],
    [28.91914, 77.12864],  // turn point
    [28.91851, 77.12852],  // Girls Hostel
    [28.91835, 77.12864],  // Stationery/Bunny's Kitchen
  ],

  // 5. Main internal road (hostel side → vertical road going south)
  [
    [28.91984, 77.12835],
    [28.91920, 77.12832],
    [28.91907, 77.12874],  // vertical road along hostel boundary
    [28.91861, 77.12875],
    [28.91835, 77.12864],
  ],

  // 6. Main central road (east-west, parking to admin/cafe area)
  [
    [28.91929, 77.12836],  // central junction
    [28.91929, 77.12980],
    [28.91929, 77.13029],  // Admin Block junction
    [28.91929, 77.13116],  // Royal Cafe junction
    [28.91929, 77.13200],
    [28.91915, 77.13231],
    [28.91907, 77.13253],  // Sports Ground junction
  ],

  // 7. Admin Block spur
  [
    [28.91929, 77.13029],
    [28.91927, 77.13029],  // Admin Block
  ],

  // 8. Royal Cafe / ATM spur
  [
    [28.91929, 77.13116],
    [28.91927, 77.13116],  // Royal Cafe
    [28.91914, 77.13134],  // ATM
  ],

  // 9. Sports Ground spur
  [
    [28.91907, 77.13253],
    [28.91895, 77.13253],  // Sports Ground
  ],

  // 10. Hospital spur
  [
    [28.91907, 77.13253],
    [28.91886, 77.13216],  // Hospital
  ],

  // 11. Library / Engineering block road (north-south internal)
  [
    [28.91929, 77.13040],  // central road junction
    [28.91888, 77.13040],
    [28.91881, 77.13042],  // Engineering Block
    [28.91864, 77.13014],  // Auditorium
  ],

  // 12. Library branch
  [
    [28.91888, 77.13040],
    [28.91888, 77.13120],
    [28.91887, 77.13121],
    [28.91873, 77.13129],  // Library
    [28.91864, 77.13135],  // ATM
  ],

  // 13. Central road → Engineering area diagonal
  [
    [28.91929, 77.12980],
    [28.91929, 77.13040],
  ],
];

// Draw clean road segments — each as its own polyline
const trackPolylines = roadSegments.map(segment =>
  L.polyline(segment, {
    color: '#2196F3',
    weight: 3,
    opacity: 0.65,
    dashArray: '8, 6'
  }).addTo(map)
);

// Helper to hide/show all track lines
function hideTrack() {
  trackPolylines.forEach(p => p.setStyle({ opacity: 0 }));
}
function showTrack() {
  trackPolylines.forEach(p => p.setStyle({ opacity: 0.65 }));
}

// Store locations and routing control
let locations = [];
let routingControl = null;

// Custom colored markers
function createColoredIcon(color) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
}

function getMarkerColor(category) {
  const colors = {
    entrance: '#4CAF50',
    department: '#2196F3',
    library: '#9C27B0',
    cafeteria: '#FF9800',
    administrative: '#F44336',
    hostel: '#00BCD4',
    sports: '#8BC34A',
    parking: '#607D8B',
    facility: '#FF5722',
    auditorium: '#795548'
  };
  return colors[category] || '#2196F3';
}

// Category icons/emojis
function getCategoryEmoji(category) {
  const emojis = {
    entrance: '🚪',
    department: '🏫',
    library: '📚',
    cafeteria: '🍽️',
    administrative: '🏢',
    hostel: '🏠',
    sports: '⚽',
    parking: '🅿️',
    facility: '🏪',
    auditorium: '🎭'
  };
  return emojis[category] || '📍';
}

// Fetch locations from backend
async function loadLocations() {
  try {
    const response = await fetch('http://localhost:5000/api/locations');
    locations = await response.json();

    const fromSelect = document.getElementById('fromLocation');
    const toSelect = document.getElementById('toLocation');

    // Group locations by category for display
    const categories = {};
    locations.forEach(loc => {
      if (!categories[loc.category]) categories[loc.category] = [];
      categories[loc.category].push(loc);
    });

    locations.forEach(loc => {
      const color = getMarkerColor(loc.category);
      const emoji = getCategoryEmoji(loc.category);
      const icon = createColoredIcon(color);

      // Add marker on map
      const marker = L.marker([parseFloat(loc.latitude), parseFloat(loc.longitude)], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: Arial; min-width: 150px;">
            <h3 style="margin: 0 0 5px; color: ${color}; font-size: 14px;">
              ${emoji} ${loc.name}
            </h3>
            <p style="margin: 0 0 3px; font-size: 12px; color: #666;">
              📂 ${loc.category}
            </p>
            <p style="margin: 0; font-size: 12px;">${loc.description}</p>
          </div>
        `);

      // Add to dropdowns
      const option1 = new Option(`${emoji} ${loc.name}`, loc.id);
      const option2 = new Option(`${emoji} ${loc.name}`, loc.id);
      fromSelect.add(option1);
      toSelect.add(option2);
    });

    // Update location count
    document.getElementById('location-count').textContent = `${locations.length} locations loaded`;

  } catch (error) {
    document.getElementById('location-count').textContent = '⚠️ Backend not connected';
    console.error('Could not load locations:', error);
  }
}

// Get route between two locations
function getRoute() {
  const fromId = document.getElementById('fromLocation').value;
  const toId = document.getElementById('toLocation').value;

  if (!fromId || !toId) {
    alert('Please select both starting point and destination!');
    return;
  }

  if (fromId === toId) {
    alert('Starting point and destination cannot be the same!');
    return;
  }

  const fromLoc = locations.find(l => l.id == fromId);
  const toLoc = locations.find(l => l.id == toId);

  const fromCoords = L.latLng(parseFloat(fromLoc.latitude), parseFloat(fromLoc.longitude));
  const toCoords = L.latLng(parseFloat(toLoc.latitude), parseFloat(toLoc.longitude));

  // Remove existing route
  if (routingControl) {
    map.removeControl(routingControl);
  }

  // Hide campus track lines so the route is clearly visible
  hideTrack();

  // If either point is the Main Gate, add a waypoint just inside
  // the campus to prevent OSRM looping around the external road
  const waypoints = [fromCoords];
  const mainGateLat = 28.92008, mainGateLng = 77.12784;
  const isFromGate = Math.abs(parseFloat(fromLoc.latitude) - mainGateLat) < 0.0003;
  const isToGate   = Math.abs(parseFloat(toLoc.latitude)   - mainGateLat) < 0.0003;

  if (isFromGate) {
    // Add a point just inside the campus gate so routing goes inward
    waypoints.push(L.latLng(28.91987, 77.12800));
  }
  if (isToGate) {
    waypoints.push(L.latLng(28.91987, 77.12800));
  }
  waypoints.push(toCoords);

  // Draw new route
  routingControl = L.Routing.control({
    waypoints,
    routeWhileDragging: false,
    show: false,
    router: L.Routing.osrmv1({
      serviceUrl: 'https://router.project-osrm.org/route/v1',
      profile: 'foot'
    }),
    lineOptions: {
      styles: [{ color: '#e74c3c', weight: 5, opacity: 0.85 }]
    }
  }).addTo(map);

  // Show distance and time
  routingControl.on('routesfound', function(e) {
    const route = e.routes[0];
    const distanceM = Math.round(route.summary.totalDistance);
    const distanceKm = (distanceM / 1000).toFixed(2);
    const timeMin = Math.ceil(route.summary.totalTime / 60);

    const infoBox = document.getElementById('info-box');
    infoBox.style.display = 'block';
    document.getElementById('from-info').textContent = fromLoc.name;
    document.getElementById('to-info').textContent = toLoc.name;
    document.getElementById('distance-info').textContent =
      `📍 ${distanceM} meters (${distanceKm} km)`;
    document.getElementById('time-info').textContent =
      `🚶 ~${timeMin} minute(s) walking`;
  });

  // Fit map to show both points
  map.fitBounds([fromCoords, toCoords], { padding: [50, 50] });
}

// Show my current location
function showMyLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  const btn = document.getElementById('locate-btn');
  btn.textContent = '📍 Locating...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Remove previous location marker if exists
      if (window.myLocationMarker) {
        map.removeLayer(window.myLocationMarker);
      }

      // Add pulsing blue dot for current location
      const myIcon = L.divIcon({
        className: 'my-location',
        html: `<div style="
          background-color: #2196F3;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 4px rgba(33,150,243,0.3);
          animation: pulse 2s infinite;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      window.myLocationMarker = L.marker([lat, lng], { icon: myIcon })
        .addTo(map)
        .bindPopup('<b>📍 You are here</b>')
        .openPopup();

      map.setView([lat, lng], 18);
      btn.textContent = '📍 My Location';
      btn.disabled = false;
    },
    function(error) {
      alert('Could not get your location. Please enable GPS/Location permission.');
      btn.textContent = '📍 My Location';
      btn.disabled = false;
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// Clear route
function clearRoute() {
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
  document.getElementById('info-box').style.display = 'none';
  document.getElementById('fromLocation').value = '';
  document.getElementById('toLocation').value = '';
  // Bring back the campus path lines
  showTrack();
}

// Load locations when page opens
loadLocations();
