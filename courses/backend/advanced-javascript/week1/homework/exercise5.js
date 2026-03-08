import { teas } from "../data/teas.js";

function searchTeas(teas, query) {
  const queryLower = query.toLowerCase();
  // Return teas where the name contains the query (case-insensitive)
  const filtered = teas.filter(tea => tea.name.toLowerCase().includes(queryLower));
  // Return just the names, sorted alphabetically
  return filtered.map(tea => tea.name);
}

console.log(searchTeas(teas, "earl"));
// Returns: [ 'Earl Grey', 'Jasmine Pearl' ]

console.log(searchTeas(teas, "dragon"));
// Returns: ["Dragon Well"]

console.log(searchTeas(teas, "ch"));
// Returns: ["Sencha", "Chamomile", "Matcha", "Lapsang Souchong", "Genmaicha"]
