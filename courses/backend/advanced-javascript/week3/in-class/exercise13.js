const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getWellStockedOrganicTeas() {
    try {
        // Fetches all teas
        const teasResponse = await fetch(`${API_BASE}/teas/`);
        if (!teasResponse.ok) {
            throw new Error("Tea Request failed:", teasResponse.status);
        }
        const allTeas = await teasResponse.json();
        // Filters to organic teas
        const organicTeas = allTeas.filter(tea => tea.organic);

        // Gets inventory for each
        const inventoryResponse = await fetch(`${API_BASE}/inventory/`);
        if (!inventoryResponse.ok) {
            throw new Error("Inventory Request failed: ", inventoryResponse.status);
        }
        const inventory = await inventoryResponse.json();

        const organicTeaIds = organicTeas.map(tea => tea.id);
        const organicInventory = inventory.filter(tea => organicTeaIds.includes(tea.teaId));
        // Returns only those with stock > 100
        return organicInventory.filter(tea => tea.stockCount > 100);
    } catch (error) {
        console.log(error);
    }
}

getWellStockedOrganicTeas().then((teas) => {
    console.log("Well-stocked organic teas:", teas);
});