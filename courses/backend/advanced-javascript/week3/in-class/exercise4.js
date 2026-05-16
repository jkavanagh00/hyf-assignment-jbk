const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/inventory`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((inventory) =>
        console.log(
            inventory
                .filter((tea) => tea.stockCount < 50)
                .map((tea) => tea.teaName),
        ),
    );
