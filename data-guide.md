# Climate Refuge Philly — data guide

This is where the site's actual information lives and how we keep it honest.

## Where the data lives

Every location is a record in `locations.js`. Here's the shape each one follows:

```js
{
  id: "unique-lowercase-id",
  name: "Location name",
  type: "Library",
  address: "Street address",
  neighborhood: "Neighborhood",
  zip: "19100",
  lat: 39.9526,
  lng: -75.1652,
  distance: 0,
  verified: "Month Year",
  transit: "Nearby SEPTA service",
  website: "https://example.org",
  phone: "",
  notes: "Important public note",
  features: {
    stepFree: "unknown",
    restroom: "unknown",
    seating: "unknown",
    quiet: "unknown",
    airConditioning: "unknown",
    cleanAir: "unknown",
    water: "unknown",
    power: "unknown"
  }
}
```

## How we label what we know

Every feature gets one of three statuses, no exceptions:

- **`confirmed`** — backed by an official source or someone verified it in person
- **`reported`** — someone told us, but we haven't independently checked it yet
- **`unknown`** — we genuinely don't know

If you're not sure which one applies, use `unknown`. A blank is honest. A guessed "yes" isn't — and on a tool people might use to decide where to bring a kid or an elderly parent during a heat emergency, that difference matters.

**Never turn "we don't have this information" into a "no."** Missing data means missing data, not "this place lacks the feature." Those are two very different facts.

## Keeping receipts

Right now, source and verification dates are tracked outside the public record while we're still building this out. Before this goes live for real, that changes — every claim needs a source field or a verification log a user could trace back to, the same way you'd want to check a claim before repeating it to a neighbor.

## The rule that matters most

Don't describe a place as open, staffed, cooled, air-filtered, or medically suitable unless you actually have current information saying so. This tool exists to help people make real decisions in genuinely dangerous heat — not to make Philly look more prepared than it is. When in doubt, undersell it and point people to double-check.
