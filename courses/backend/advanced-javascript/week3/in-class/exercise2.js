const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas/3`)
  .then((response) => response.json())
  .then((tea) => console.log(`${tea.name} from ${tea.origin}`));