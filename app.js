(() => {
  "use strict";

  const config = window.CRF_CONFIG;
  const locations = window.CRF_LOCATIONS;

  if (!config || !Array.isArray(locations)) {
    console.error("Climate Refuge Philly could not load its configuration or location data.");
    return;
  }

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
    const searchable = [
      location.name,
      location.type,
      location.address,
      location.neighborhood,
      location.zip,
      location.transit
    ].join(" ").toLowerCase();

    const queryMatch = !query || searchable.includes(query);
    const featureMatch = selected.every(feature =>
      ["confirmed", "reported"].includes(location.features[feature])
    );

    return queryMatch && featureMatch && location.distance <= maxDistance;
  }

  function statusText(status) {
    return config.statusLabels[status] || config.statusLabels.unknown;
  }

  function safeText(value) {
    return String(value ?? "").replace(/[&<>"]/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    })[character]);
  }

  function renderCard(location) {
    const features = Object.entries(location.features).map(([key, status]) => `
      <div class="feature">
        <span class="status-dot status-${safeText(status)}" aria-hidden="true"></span>
        <span>${safeText(config.featureLabels[key] || key)}: <strong>${safeText(statusText(status))}</strong></span>
      </div>
    `).join("");

    const websiteLink = location.website
      ? `<a href="${safeText(location.website)}" target="_blank" rel="noopener">Official website</a>`
      : "";

    return `
      <article class="refuge-card">
        <div class="card-top">
          <div>
            <p class="card-kicker">${safeText(location.type)} · ${safeText(location.neighborhood)}</p>
            <h3>${safeText(location.name)}</h3>
            <p class="address">${safeText(location.address)}</p>
          </div>
          <span class="distance-chip">${Number(location.distance).toFixed(1)} mi</span>
        </div>
        <div class="feature-grid">${features}</div>
        <div class="card-footer">
          <span><strong>Nearby transit:</strong> ${safeText(location.transit)}</span>
          <button type="button" data-report="${safeText(location.id)}">Report an update</button>
        </div>
        ${websiteLink}
        <p class="address">Last checked: ${safeText(location.verified)}</p>
      </article>
    `;
  }

  function filteredLocations() {
    return locations.filter(matchesFilters);
  }

  function render() {
    const filtered = filteredLocations();
    resultCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "location" : "locations"}`;
    listView.innerHTML = filtered.length
      ? filtered.map(renderCard).join("")
      : `
        <div class="empty-state">
          <h3>Nothing nearby checks every box yet.</h3>
          <p>Try a larger travel distance, remove one filter, or search another neighborhood.</p>
        </div>`;
    updateMap(filtered);
  }

  function initializeMap() {
    if (map || typeof L === "undefined") return;
    map = L.map("map", { scrollWheelZoom: false }).setView(config.defaultCenter, config.defaultZoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    markers = L.layerGroup().addTo(map);
  }

  function updateMap(filtered) {
    if (!map || !markers) return;
    markers.clearLayers();

    filtered.forEach(location => {
      L.circleMarker([location.lat, location.lng], {
        radius: 9,
        color: "#142126",
        weight: 3,
        fillColor: "#f2c14e",
        fillOpacity: 1
      })
        .bindPopup(`<strong>${safeText(location.name)}</strong><br>${safeText(location.address)}`)
        .addTo(markers);
    });

    if (userPosition) {
      L.circleMarker(userPosition, {
        radius: 8,
        color: "#ffffff",
        weight: 3,
        fillColor: "#0b4f6c",
        fillOpacity: 1
      })
        .bindPopup("Your approximate location")
        .addTo(markers);
    }
  }

  function openReportForm(locationId) {
    if (!config.reportFormUrl) {
      alert("The correction form is not connected yet. Add its URL in config.js when it is ready.");
      return;
    }

    const separator = config.reportFormUrl.includes("?") ? "&" : "?";
    const url = `${config.reportFormUrl}${separator}location=${encodeURIComponent(locationId)}`;
    window.open(url, "_blank", "noopener");
  }

  checkboxes.forEach(box => box.addEventListener("change", render));
  searchInput.addEventListener("input", render);
  distanceSelect.addEventListener("change", render);

  document.getElementById("clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    distanceSelect.value = String(config.defaultDistanceMiles);
    checkboxes.forEach(box => { box.checked = false; });
    render();
    searchInput.focus();
  });

  viewButtons.forEach(button => {
    button.addEventListener("click", () => {
      const showMap = button.dataset.view === "map";
      viewButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
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
    if (button) openReportForm(button.dataset.report);
  });

  render();
})();
