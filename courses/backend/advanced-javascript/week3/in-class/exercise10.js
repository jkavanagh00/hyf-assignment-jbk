const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function countTeas() {
    try {
        const response = await fetch(`${API_BASE}/teas`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Total teas: ${data.length}`)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

countTeas();