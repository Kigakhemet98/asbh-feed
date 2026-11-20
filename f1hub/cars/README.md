# Car renders for F1 Data Hub

The apps look here first for car images, then at formula1.com's official car images, then fall back to drawn 2026 liveries.

Put PNG (or WebP) files with a transparent background in `cars/<year>/`:

- `<team>-side.png` – side view, nose pointing left or right (Previous Races, Results, Teams, Championship battle)
- `<team>-top.png` – top-down view, nose pointing **up** (Grid line-up and Race results graphics)

`<team>` is one of: `mercedes`, `ferrari`, `red_bull`, `mclaren`, `aston_martin`, `alpine`, `williams`, `rb` (Racing Bulls), `haas`, `audi`, `cadillac`.

Example: `cars/2026/mclaren-top.png`. Apps pick new files up automatically (cached for 12 hours on each device).
