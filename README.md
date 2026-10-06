# Playoff Elimination Tracker v6

NHL (1918–2027), NFL (1966–2026), and NBA (1947–2027). The page still opens on the last completed season.

## Screenshot

![](screenshot.png)

## Live Demo

[https://elevation-edge-sports-data.github.io/playoff-elimination-tracker/](https://elevation-edge-sports-data.github.io/playoff-elimination-tracker/)

[GitHub](https://github.com/elevation-edge-sports-data/playoff-elimination-tracker)

Previous versions: [v1](https://elevation-edge-sports-data.github.io/playoff-elimination-tracker/archive/v1/).

Companion NHL stats live in [nhl-playoff-team-stats](https://github.com/elevation-edge-sports-data/nhl-playoff-team-stats).

Built with HTML, CSS, and JavaScript.

## Logos

`logos/{sport}/{abbr}/{ABBR}-{SPORT}-{start}-{end|pres}.png`

`catalog/season_lookup.json` maps sport + abbr + season-end year to that filename. The page loads that table from `catalog/season_lookup.js` before drawing marks.

Produced by Zach Sajevic (2025–2026)
