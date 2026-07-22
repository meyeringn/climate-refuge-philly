const locations = [
  {
    id: 1,
    name: "Charles Santore Library",
    type: "Library",
    address: "932 S 7th St, Philadelphia, PA 19147",
    neighborhood: "Bella Vista",
    zip: "19147",
    lat: 39.9382,
    lng: -75.1545,
    distance: 0.7,
    verified: "July 2026",
    transit: "Routes 47 and 57",
    features: { stepFree: "confirmed", restroom: "reported", seating: "confirmed", quiet: "reported", airConditioning: "confirmed", cleanAir: "unknown", water: "confirmed", power: "reported" }
  },
  {
    id: 2,
    name: "Philadelphia City Institute Library",
    type: "Library",
    address: "1905 Locust St, Philadelphia, PA 19103",
    neighborhood: "Rittenhouse",
    zip: "19103",
    lat: 39.9491,
    lng: -75.1732,
    distance: 1.4,
    verified: "July 2026",
    transit: "Routes 9, 12, 21, and 42",
    features: { stepFree: "confirmed", restroom: "unknown", seating: "confirmed", quiet: "confirmed", airConditioning: "confirmed", cleanAir: "unknown", water: "reported", power: "reported" }
  },
  {
    id: 3,
    name: "South Philadelphia Library",
    type: "Library",
    address: "1700 S Broad St, Philadelphia, PA 19145",
    neighborhood: "Point Breeze",
    zip: "19145",
    lat: 39.9283,
    lng: -75.1696,
    distance: 1.8,
    verified: "July 2026",
    transit: "Broad Street Line and Route 4",
    features: { stepFree: "confirmed", restroom: "confirmed", seating: "confirmed", quiet: "reported", airConditioning: "confirmed", cleanAir: "reported", water: "confirmed", power: "confirmed" }
  },
  {
    id: 4,
    name: "Lucien E. Blackwell West Philadelphia Regional Library",
    type: "Library",
    address: "125 S 52nd St, Philadelphia, PA 19139",
    neighborhood: "West Philadelphia",
    zip: "19139",
    lat: 39.9573,
    lng: -75.2253,
    distance: 4.8,
    verified: "July 2026",
    transit: "Market-Frankford Line and Route 52",
    features: { stepFree: "confirmed", restroom: "confirmed", seating: "confirmed", quiet: "reported", airConditioning: "confirmed", cleanAir: "unknown", water: "confirmed", power: "reported" }
  },
  {
    id: 5,
    name: "Kingsessing Recreation Center",
    type: "Recreation center",
    address: "4901 Kingsessing Ave, Philadelphia, PA 19143",
    neighborhood: "Kingsessing",
    zip: "19143",
    lat: 39.9429,
    lng: -75.2180,
    distance: 4.2,
    verified: "Demonstration record",
    transit: "Trolley Routes 13 and 34",
    features: { stepFree: "reported", restroom: "reported", seating: "confirmed", quiet: "unknown", airConditioning: "reported", cleanAir: "unknown", water: "reported", power: "unknown" }
  },
  {
    id: 6,
    name: "Lloyd Hall",
    type: "Community space",
    address: "1 Boathouse Row, Philadelphia, PA 19130",
    neighborhood: "Fairmount",
    zip: "19130",
    lat: 39.9692,
    lng: -75.1862,
    distance: 2.7,
    verified: "Demonstration record",
    transit: "Routes 7, 32, and 48",
    features: { stepFree: "reported", restroom: "reported", seating: "reported", quiet: "unknown", airConditioning: "unknown", cleanAir: "unknown", water: "reported", power: "unknown" }
  }
];

const featureLabels = {
  stepFree: "Step-free entrance",
  restroom: "Accessible restroom",
  seating: "Indoor seating",
  quiet: "Quieter space",
  airConditioning: "Air conditioning",
  cleanAir: "Enhanced filtration",
  water: "Drinking water",
  power: "Power outlets"
};

const listView = document.getElementById("listView");
const mapView = document.getElementById("mapView");
const resultCount = document.getElementById("resultCount");
const searchInput = document.getElementById("searchInput");
const distanceSelect = document.getElementById("distanceSelect");
const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
const viewButtons = [...document.querySelectorAll("[data-view]")];
let map;
let markers;
let userPosition = null;

function matchesFilters(location) {
  const query = searchInput.value.trim().toLowerCase();
  const selected = checkboxes.filter(box => box.checked).map(box => box.value);
  const maxDistance = Number(distanceSelect.value);
  const searchable = `${location.name} ${location.type} ${location.address} ${location.neighborhood} ${location.zip}`.toLowerCase();
  const queryMatch = !query || searchable.includes(query);
  const featureMatch = selected.every(feature => ["confirmed", "reported"].includes(location.features[feature]));
  return queryMatch && featureMatch && location.distance <= maxDistance;
}

function statusText(status) {
  return status === "confirmed" ? "Confirmed" : status === "reported" ? "Visitor reported" : "Not verified";
}

function renderCard(location) {
  const features = Object.entries(location.features).map(([key, status]) => `
    <div class="feature">
      <span class="status-dot status-${status}" aria-hidden="true"></span>
      <span>${featureLabels[key]}: <strong>${statusText(status)}</strong></span>
    </div>
  `).join("");

  return `
    <article class="refuge-card">
      <div class="card-top">
        <div>
          <p class="card-kicker">${location.type} · ${location.neighborhood}</p>
          <h3>${location.name}</h3>
          <p class="address">${location.address}</p>
        </div>
        <span class="distance-chip">${location.distance.toFixed(1)} mi</span>
      </div>
      <div class="feature-grid">${features}</div>
      <div class="card-footer">
        <span><strong>Nearby transit:</strong> ${location.transit}</span>
        <button type="button" data-report="${location.id}">Report an update</button>
      </div>
      <p class="address">Last checked: ${location.verified}</p>
    </article>
  `;
}

function filteredLocations() {
  return locations.filter(matchesFilters);
}

function render() {
  const filtered = filteredLocations();
  resultCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "location" : "locations"}`;
  listView.innerHTML = filtered.length ? filtered.map(renderCard).join("") : `
    <div class="empty-state">
      <h3>Nothing nearby checks every box yet.</h3>
      <p>Try a larger travel distance, remove one filter, or search another neighborhood.</p>
    </div>`;
  updateMap(filtered);
}

function initializeMap() {
  if (map || typeof L === "undefined") return;
  map = L.map("map", { scrollWheelZoom: false }).setView([39.9526, -75.1652], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  markers = L.layerGroup().addTo(map);
}

function updateMap(filtered) {
  if (!map) return;
  markers.clearLayers();
  filtered.forEach(location => {
    const marker = L.circleMarker([location.lat, location.lng], {
      radius: 9,
      color: "#142126",
      weight: 3,
      fillColor: "#f2c14e",
      fillOpacity: 1
    }).bindPopup(`<strong>${location.name}</strong><br>${location.address}`);
    marker.addTo(markers);
  });
  if (userPosition) {
    L.circleMarker(userPosition, { radius: 8, color: "#fff", weight: 3, fillColor: "#0b4f6c", fillOpacity: 1 })
      .bindPopup("Your approximate location")
      .addTo(markers);
  }
}

checkboxes.forEach(box => box.addEventListener("change", render));
searchInput.addEventListener("input", render);
distanceSelect.addEventListener("change", render);

document.getElementById("clearFilters").addEventListener("click", () => {
  searchInput.value = "";
  distanceSelect.value = "5";
  checkboxes.forEach(box => { box.checked = false; });
  render();
  searchInput.focus();
});

viewButtons.forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    viewButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const showMap = view === "map";
    listView.hidden = showMap;
    mapView.hidden = !showMap;
    if (showMap) {
      initializeMap();
      setTimeout(() => {
        map.invalidateSize();
        updateMap(filteredLocations());
      }, 50);
    }
  });
});

document.getElementById("contrastToggle").addEventListener("click", event => {
  const active = document.body.classList.toggle("high-contrast");
  event.currentTarget.setAttribute("aria-pressed", String(active));
  event.currentTarget.textContent = active ? "Standard contrast" : "High contrast";
});

document.getElementById("useLocation").addEventListener("click", event => {
  const button = event.currentTarget;
  if (!navigator.geolocation) {
    button.textContent = "Location unavailable";
    return;
  }
  button.textContent = "Finding you…";
  navigator.geolocation.getCurrentPosition(position => {
    userPosition = [position.coords.latitude, position.coords.longitude];
    button.textContent = "Location added";
    if (map) {
      map.setView(userPosition, 13);
      updateMap(filteredLocations());
    }
  }, () => {
    button.textContent = "Could not use location";
  }, { enableHighAccuracy: false, timeout: 8000 });
});

listView.addEventListener("click", event => {
  const button = event.target.closest("[data-report]");
  if (!button) return;
  alert("The correction form will be connected in the next build. For now, this button demonstrates the intended workflow.");
});

render();
