(() => {
  "use strict";

  const config = window.CRF_CONFIG || {};
  const locations = Array.isArray(window.CRF_LOCATIONS) ? window.CRF_LOCATIONS : [];
  const form = document.getElementById("reportForm");
  const locationSelect = document.getElementById("locationSelect");
  const otherLocationGroup = document.getElementById("otherLocationGroup");
  const otherLocation = document.getElementById("otherLocation");
  const details = document.getElementById("details");
  const detailsCount = document.getElementById("detailsCount");
  const formErrors = document.getElementById("formErrors");
  const copyStatus = document.getElementById("copyStatus");

  function populateLocations() {
    const fragment = document.createDocumentFragment();
    locations
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(location => {
        const option = document.createElement("option");
        option.value = location.id;
        option.textContent = `${location.name} — ${location.neighborhood}`;
        fragment.appendChild(option);
      });
    locationSelect.insertBefore(fragment, locationSelect.lastElementChild);
  }

  function preselectLocation() {
    const locationId = new URLSearchParams(window.location.search).get("location");
    if (locationId && locations.some(location => location.id === locationId)) {
      locationSelect.value = locationId;
    }
  }

  function toggleOtherLocation() {
    const isOther = locationSelect.value === "other";
    otherLocationGroup.hidden = !isOther;
    otherLocation.required = isOther;
    if (!isOther) otherLocation.value = "";
  }

  function selectedLocationName() {
    if (locationSelect.value === "other") return otherLocation.value.trim();
    const location = locations.find(item => item.id === locationSelect.value);
    return location ? `${location.name} (${location.address})` : "Unknown location";
  }

  function reportText() {
    const data = new FormData(form);
    return [
      "## Community location update",
      "",
      `**Location:** ${selectedLocationName()}`,
      `**Type of update:** ${data.get("reportType") || "Not provided"}`,
      `**Feature involved:** ${data.get("feature") || "Not sure or not applicable"}`,
      `**Date observed:** ${data.get("observedDate") || "Not provided"}`,
      `**Current status:** ${data.get("status") || "Not sure"}`,
      "",
      "### What was observed",
      data.get("details") || "No details provided.",
      "",
      "### Review note",
      "This is a community-submitted report. Verify it before changing the public listing."
    ].join("\n");
  }

  function validateForm() {
    const errors = [];
    if (!locationSelect.value) errors.push("Choose a location.");
    if (locationSelect.value === "other" && !otherLocation.value.trim()) errors.push("Enter the unlisted location name and address.");
    if (!document.getElementById("reportType").value) errors.push("Choose the type of update.");
    if (!document.getElementById("observedDate").value) errors.push("Enter the date you observed the issue or feature.");
    if (!details.value.trim()) errors.push("Describe what you observed.");
    if (!document.getElementById("accuracyCheck").checked) errors.push("Confirm that this is a good-faith report based on what you observed.");

    formErrors.hidden = errors.length === 0;
    formErrors.innerHTML = errors.length
      ? `<strong>Please fix the following:</strong><ul>${errors.map(error => `<li>${escapeHtml(error)}</li>`).join("")}</ul>`
      : "";
    if (errors.length) formErrors.focus();
    return errors.length === 0;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
  }

  async function copyReport() {
    if (!validateForm()) return;
    try {
      await navigator.clipboard.writeText(reportText());
      copyStatus.textContent = "Report copied. You can paste it into an email, message, or document.";
    } catch (error) {
      copyStatus.textContent = "Your browser could not copy automatically. Select and copy the report from the GitHub preview instead.";
    }
  }

  function openGitHubIssue() {
    const repoUrl = String(config.githubRepoUrl || "").replace(/\/$/, "");
    if (!repoUrl) {
      copyStatus.textContent = "Add githubRepoUrl in config.js to enable GitHub reports. The copy option is ready now.";
      return;
    }
    const title = `Location update: ${selectedLocationName().split(" (")[0]}`;
    const url = `${repoUrl}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(reportText())}&labels=${encodeURIComponent("community-report")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  locationSelect.addEventListener("change", toggleOtherLocation);
  details.addEventListener("input", () => {
    detailsCount.textContent = `${details.value.length.toLocaleString()} of 1,500 characters`;
  });
  document.getElementById("copyReport").addEventListener("click", copyReport);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (validateForm()) openGitHubIssue();
  });

  document.getElementById("contrastToggle").addEventListener("click", event => {
    const active = document.body.classList.toggle("high-contrast");
    event.currentTarget.setAttribute("aria-pressed", String(active));
    event.currentTarget.textContent = active ? "Standard contrast" : "High contrast";
  });

  populateLocations();
  preselectLocation();
  toggleOtherLocation();
  document.getElementById("observedDate").max = new Date().toISOString().split("T")[0];
})();
