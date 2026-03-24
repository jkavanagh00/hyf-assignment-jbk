const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    console.log("Tea:", tea.name);
    // Return a new fetch to chain it
    return fetch(`${API_BASE}/inventory/${tea.id}/`);
  })
  .then((response) => response.json())
  .then((tea) => {
    console.log(tea.stockCount);
})
  .catch((error) => console.error("Error:", error.message));