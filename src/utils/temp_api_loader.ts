import { IngredientRecord } from "../types/Interface.js";
const DATABASE: IngredientRecord[] = await loadDatabase();
//Load data from API (synchronous for startup)
export async function loadDatabase(): Promise<IngredientRecord[]> {
  try {
    const response = await fetch('http://localhost:3000/foods'); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data = await response.json();
    return data as IngredientRecord[];
  } catch (error) {
    console.error('Failed to load data from API:', error);
    // Fallback to local file if API fails
    const fs = await import('fs');
    return JSON.parse(fs.readFileSync("./data/output.json", "utf-8"));
  }
}
