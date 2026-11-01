# Climate Refuge Philly

When it's 98 degrees on the Broad Street Line platform and you can't remember the last time you drank water, you don't need a dashboard -- you need a place to go. Climate Refuge Philly is a mobile-first tool that helps you find somewhere nearby to cool down, catch a breath of cleaner air, sit for a minute, refill a water bottle, use an accessible restroom, or plug in a wheelchair, CPAP, or phone when it matters most.

**Data last verified:** November 2026

Philadelphia is the case study. The model is designed for any city.

This is a prototype -- a working sketch of what the real thing could be, built to get feedback before it becomes something people in Kensington, Hunting Park, or Southwest Philly actually rely on during a heat emergency.

## What makes this different

Most cooling center maps treat "open" and "accessible" as the same thing. They aren't. This tool separates what's confirmed from what's reported from what's genuinely unknown -- because when someone is deciding where to bring a kid, an elderly parent, or themselves during a heat emergency, a guess dressed up as a fact is worse than an honest blank.

Three design commitments set this apart:

- **Disability-first framing.** Accessibility isn't a filter bolted on after the map works. Step-free entrances, accessible restrooms, indoor seating, quieter spaces, and power for medical equipment are first-class features, not afterthoughts.
- **Data honesty.** Every feature on every location gets one of three statuses: `confirmed`, `reported`, or `unknown`. Missing information stays visible as "unknown" rather than being hidden or treated as a "no." The data guide explains the verification standard.
- **No backend, no login, no cookies.** Page visits are counted anonymously with GoatCounter. The tool runs entirely client-side on vanilla HTML, CSS, and JavaScript. It loads fast on old phones over slow connections. It costs nothing to host. And anyone can open a file and see exactly how it works.

## Current prototype includes

- Philly-specific visual identity, with a custom skyline illustration (inline SVG, no image dependencies)
- English/Spanish bilingual toggle with localStorage persistence
- Accessible filter controls (cooling, air quality, rest, water, accessible restroom, charging)
- Clear "confirmed," "reported," and "unknown" status on every location -- because bad data is worse than no data
- Responsive refuge cards that hold up on a cracked phone screen in direct sun
- Optional map view (OpenStreetMap via Leaflet) alongside the list view
- Browser geolocation, opt-in
- High-contrast mode and reduced-motion support
- Community report form (GitHub issues or clipboard for non-GitHub users)
- Twelve demonstration locations across diverse Philadelphia neighborhoods, including heat-vulnerable areas

## Why this matters

Philly's heat doesn't land evenly. Formerly redlined neighborhoods run hotter -- sometimes 10+ degrees hotter -- than leafier parts of the city, and the people most exposed are often the least likely to have reliable AC, a car to escape in, or the spare income to just "go somewhere cooler." Add poor air quality on code orange/red days, and a shaded bench with a working water fountain stops being a nice-to-have and becomes infrastructure.

This isn't unique to Philadelphia. Every U.S. city has neighborhoods where heat exposure, disability prevalence, transit dependence, and poverty overlap. The data model and verification system here are designed to work anywhere those conditions exist.

## Adapt this for your city

This tool is built to be forked. Here's what it takes:

1. **Fork the repository** and rename it for your city.
2. **Replace `locations.js`** with your local data. The data schema (documented in `data-guide.md`) works for any city -- you'll need location names, addresses, coordinates, transit info, and feature statuses using the `confirmed`/`reported`/`unknown` system.
3. **Update the hero text and branding** in `index.html` to reflect your city. The SVG skyline is inline and replaceable.
4. **Add translations** in `config.js` if your community needs languages beyond English and Spanish.
5. **Verify your data.** This is the hard part and the most important part. Read `data-guide.md` for the verification standard. Don't promote unverified data as a public safety resource.

No build step. No API keys. No backend to maintain. If you can edit HTML and push to GitHub Pages, you can deploy this for your city tonight.

## Before this goes anywhere near "public safety resource"

**All location data in this version is placeholder.** None of it has been field-verified. Before this tool is promoted, shared, or relied on by anyone, every location needs to be confirmed for current hours, actual accessibility (not assumed), and whether it's still operating as a cooling/refuge site at all. Treat this as a prototype, not a resource, until that happens.

## Run it locally

Open `index.html` directly in a browser, or serve the folder so the map and assets load cleanly:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `app.js`, `config.js`, `locations.js`, and this README.
3. Go to **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/root` folder.
6. Give it a minute -- GitHub Pages will hand you a live URL.

## Data sources and methodology

Not yet real -- this is where verified data (city cooling center lists, PWD water fountain locations, accessible restroom data, etc.) will live once the prototype moves past demo mode. Flagged here as an open item, not swept under the rug.

## Tech stack

Vanilla HTML/CSS/JS, no build step. Leaflet + OpenStreetMap for the optional map view. No backend, no login, no cookies (anonymous visit counts only) -- runs entirely client-side so it can live for free on GitHub Pages.

## How to contribute

Open an issue or a pull request. If you know a Philly location that should be on this list -- or know one on it that's wrong -- that's exactly the kind of contribution this needs most right now. See `contributing.md` for the full guide.

## License

MIT.
