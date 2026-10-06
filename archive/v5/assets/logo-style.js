// How a club mark is drawn on the map. Ground is the full-color file
// with the existing shadow. Outline keeps that color and adds a light
// keyline plus a dark outer edge. A stored "knockout" value is ground.
// A catalog hit is ../../logos/{sport}/{abbr}/{file} from /archive/v5/.
// A miss keeps the year-folder path, ./logos/{SPORT}{year}/{abbr}.png.
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.resolveLogoUrl = api.resolveLogoUrl;
  root.normalizeLogoStyle = api.normalizeLogoStyle;
  root.migrateLogoStyleStorage = api.migrateLogoStyleStorage;
  root.LOGO_STYLES = api.LOGO_STYLES;
  try {
    if (typeof localStorage !== "undefined") api.migrateLogoStyleStorage(localStorage);
  } catch (err) {}
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var LOGO_STYLES = ["ground", "outline"];

  function standardLogoUrl(sport, year, abbr) {
    return "./logos/" + String(sport).toUpperCase() + String(year) + "/" + abbr + ".png";
  }

  function resolveLogoUrl(sport, year, abbr, fallback) {
    var s = String(sport).toLowerCase();
    var a = String(abbr);
    var y = String(year);
    var host = typeof globalThis !== "undefined" ? globalThis : {};
    var table = (host.LOGO_SEASON_LOOKUP || {})[s];
    var file = table && table[a] && table[a][y];
    if (file) return "../../logos/" + s + "/" + a + "/" + file;
    return fallback || standardLogoUrl(sport, year, abbr);
  }

  function normalizeLogoStyle(value) {
    if (value === "knockout") return "ground";
    return LOGO_STYLES.indexOf(value) === -1 ? "ground" : value;
  }

  function replaceKnockout(node) {
    if (!node || typeof node !== "object") return false;
    var changed = false;
    if (node.logoStyle === "knockout") {
      node.logoStyle = "ground";
      changed = true;
    }
    if (node.state && replaceKnockout(node.state)) changed = true;
    return changed;
  }

  function migrateLogoStyleStorage(storage) {
    if (!storage || typeof storage.length !== "number" || typeof storage.key !== "function" || typeof storage.getItem !== "function" || typeof storage.setItem !== "function") return;
    for (var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      if (key == null) continue;
      var raw = storage.getItem(key);
      if (typeof raw !== "string" || raw.indexOf("knockout") === -1) continue;
      if ((raw === "knockout" || raw === '"knockout"') && /(^|[./])logoStyle$/.test(key)) {
        storage.setItem(key, raw.charAt(0) === '"' ? '"ground"' : "ground");
        continue;
      }
      try {
        var parsed = JSON.parse(raw);
      } catch (err) {
        continue;
      }
      if (replaceKnockout(parsed)) storage.setItem(key, JSON.stringify(parsed));
    }
  }

  return {
    LOGO_STYLES: LOGO_STYLES,
    resolveLogoUrl: resolveLogoUrl,
    normalizeLogoStyle: normalizeLogoStyle,
    standardLogoUrl: standardLogoUrl,
    migrateLogoStyleStorage: migrateLogoStyleStorage,
  };
});
