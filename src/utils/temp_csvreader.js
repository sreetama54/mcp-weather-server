import fs from "fs";
import csv from "csv-parser";

const results = [];

let headerMap = null; // ✅ dynamic mapping

const AMINO_KEYS_MAP = {
  "Isoleucine": "isoleucine",
  "Leucine": "leucine",
  "Lysine": "lysine",
  "Methionine": "methionine",
  "Cystine": "cystine",
  "Total S-cont. am. ac.": "sulfur_amino_acids_total",
  "Phenylalanine": "phenylalanine",
  "Tyrosine": "tyrosine",
  "Total aromatic am. ac.": "aromatic_amino_acids_total",
  "Threonine": "threonine",
  "Tryptophan": "tryptophan",
  "Valine": "valine",
  "Arginine": "arginine",
  "Histidine": "histidine",
  "Alanine": "alanine",
  "Aspartic acid": "aspartic_acid",
  "Glutamic acid": "glutamic_acid",
  "Glycine": "glycine",
  "Proline": "proline",
  "Serine": "serine",
  "Total essential am. ac.": "essential_amino_acids_total",
  "Total amino acids": "total_amino_acids"
};

function extractBValue(cell) {
  if (!cell) return null;

  const match = cell.match(/B\s*([\d.]+)/i);
  if (match) return Number((parseFloat(match[1]) / 100).toFixed(2));

  const nums = cell.match(/[\d.]+/g);
  if (!nums || nums.length < 2) return null;

  return Number((parseFloat(nums[1]) / 100).toFixed(2));
}

fs.createReadStream("./data.csv")
  .pipe(csv({ headers: false })) // ✅ IMPORTANT
  .on("data", (row) => {
    const values = Object.values(row).map(v => v?.trim());

    // 🔥 STEP 1: Detect header row dynamically
    const isHeaderRow =
      values.includes("Food") &&
      values.includes("Isoleucine");

    if (isHeaderRow) {
      headerMap = {};

      values.forEach((colName, index) => {
        if (AMINO_KEYS_MAP[colName]) {
          headerMap[AMINO_KEYS_MAP[colName]] = index;
        }

        if (colName === "Food") {
          headerMap["name"] = index;
        }
      });

      console.log("✅ Header detected:", headerMap);
      return;
    }

    // ⛔ Skip until header found
    if (!headerMap) return;

    const name = values[headerMap.name]?.toLowerCase();
    if (!name) return;

    const amino_acids = {};

    for (const key in AMINO_KEYS_MAP) {
      const mappedKey = AMINO_KEYS_MAP[key];
      const colIndex = headerMap[mappedKey];

      const cell = values[colIndex];
      amino_acids[mappedKey] = extractBValue(cell);
    }

    results.push({
      name,
      serving_size_g: 100,
      calories: null,
      fat_total_g: null,
      fat_saturated_g: null,
      protein_g: null,
      sodium_mg: null,
      potassium_mg: null,
      cholesterol_mg: null,
      carbohydrates_total_g: null,
      fiber_g: null,
      sugar_g: null,
      amino_acids_g: amino_acids
    });
  })
  .on("end", () => {
    console.log(`✅ Done. ${results.length} records`);
    fs.writeFileSync("../data/output.json", JSON.stringify(results, null, 2));
  });