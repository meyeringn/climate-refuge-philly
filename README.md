# Climate Refuge Philly

When it's 98 degrees on the Broad Street Line platform and you can't remember the last time you drank water, you don't need a dashboard — you need a place to go. Climate Refuge Philly is a mobile-first tool that helps you find somewhere nearby to cool down, catch a breath of cleaner air, sit for a minute, refill a water bottle, use an accessible restroom, or plug in a wheelchair, CPAP, or phone when it matters most.

This is a prototype — a working sketch of what the real thing could be, built to get feedback before it becomes something people in Kensington, Hunting Park, or Southwest Philly actually rely on during a heat emergency.

## Why this matters

Philly's heat doesn't land evenly. Formerly redlined neighborhoods run hotter — sometimes 10+ degrees hotter — than leafier parts of the city, and the people most exposed are often the least likely to have reliable AC, a car to escape in, or the spare income to just "go somewhere cooler." Add poor air quality on code orange/red days, and a shaded bench with a working water fountain stops being a nice-to-have and becomes infrastructure.

This tool isn't trying to be a hero. It's trying to point people toward what already exists — a rec center, a library, a shaded plaza — and make that information easy to get to on a phone, fast, with no login and no nonsense.

## Current prototype includes

- Philly-specific visual identity, with a custom skyline illustration (inline SVG, no image dependencies)
- Accessible filter controls (cooling, air quality, rest, water, accessible restroom, charging)
- Clear "confirmed," "reported," and "unknown" status on every location — because bad data is worse than no data
- Responsive refuge cards that hold up on a cracked phone screen in direct sun
- Optional map view (OpenStreetMap via Leaflet) alongside the list view
- Browser geolocation, opt-in
- High-contrast mode and reduced-motion support
- Six demonstration locations to show the shape of the thing

## ⚠️ Before this goes anywhere near "public safety resource"

**All location data in this version is placeholder.** None of it has been field-verified. Before this tool is promoted, shared, or relied on by anyone, every location needs to be confirmed for current hours, actual accessibility (not assumed), and whether it's still operating as a cooling/refuge site at all. Treat this as a prototype, not a resource, until that happens.

## Run it locally

Open `index.html` directly in a browser, or serve the folder so the map and assets load cleanly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, and this README.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Give it a minute — GitHub Pages will hand you a live URL.

## Data sources & methodology

Not yet real — this is where verified data (city cooling center lists, PWD water fountain locations, accessible restroom data, etc.) will live once the prototype moves past demo mode. Flagged here as an open item, not swept under the rug.

## Tech stack

Vanilla HTML/CSS/JS, no build step. Leaflet + OpenStreetMap for the optional map view. No backend, no tracking, no login — runs entirely client-side so it can live for free on GitHub Pages.

## How to contribute

Open an issue or a pull request. If you know a Philly location that should be on this list — or know one on it that's wrong — that's exactly the kind of contribution this needs most right now.

## License

MIT.
