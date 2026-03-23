const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function searchTeas(query) {
    try {
        const response = await fetch(`${API_BASE}/teas/`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const teas = await response.json();
        const filtered = teas.filter(tea => tea.name.toLowerCase().includes(query.toLowerCase()));
        return filtered;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    // 2. Filter to teas where name includes query (case-insensitive)
    // 3. Return array of matching tea objects
}

// Test it:
searchTeas("pearl").then((teas) => {
    console.log("Search results for 'pearl':");
    teas.forEach((tea) => console.log(`- ${tea.name}`));
});