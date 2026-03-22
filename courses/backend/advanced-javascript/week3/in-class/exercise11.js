const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaWithStock(id) {
    try {
        const teaResponse = await fetch(`${API_BASE}/teas/${id}`);
        if (!teaResponse.ok) {
            throw new Error("Tea Request failed:", teaResponse.status);
        }
        const tea = await teaResponse.json();
        console.log(tea);

        const inventoryRes = await fetch(`${API_BASE}/inventory/${tea.id}/`);
        if (!inventoryRes.ok) {
            throw new Error("Inventory Request failed:", inventoryRes.status);
        }
        const inventory = await inventoryRes.json();

        console.log(`Name: ${tea.name}, Stock: ${inventory.stockCount}`);
    } catch (error) {
        console.error(`getTeaWithStock(${id}) failed:`, error);
    }
}

getTeaWithStock(134)