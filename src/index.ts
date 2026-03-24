import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ─── Data ────────────────────────────────────────────────────────────────────

interface AminoAcidProfile {
  isoleucine: number | null;
  leucine: number | null;
  lysine: number | null;
  methionine: number | null;
  cystine: number | null;
  sulfur_amino_acids_total: number | null;
  phenylalanine: number | null;
  tyrosine: number | null;
  aromatic_amino_acids_total: number | null;
  threonine: number | null;
  tryptophan: number | null;
  valine: number | null;
  arginine: number | null;
  histidine: number | null;
  alanine: number | null;
  aspartic_acid: number | null;
  glutamic_acid: number | null;
  glycine: number | null;
  proline: number | null;
  serine: number | null;
  essential_amino_acids_total: number | null;
  total_amino_acids: number | null;
}

interface IngredientRecord {
  name: string;
  serving_size_g: number;
  calories: number | null;
  fat_total_g: number | null;
  fat_saturated_g: number | null;
  protein_g: number | null;
  sodium_mg: number | null;
  potassium_mg: number | null;
  cholesterol_mg: number | null;
  carbohydrates_total_g: number | null;
  fiber_g: number | null;
  sugar_g: number | null;
  amino_acids_g: AminoAcidProfile;
}

const DATABASE: IngredientRecord[] = [
  {
    name: "acha_digitaria_exilis_hulled",
    serving_size_g: 100,
    calories: null,
    fat_total_g: null,
    fat_saturated_g: null,
    protein_g: 100,
    sodium_mg: null,
    potassium_mg: null,
    cholesterol_mg: null,
    carbohydrates_total_g: null,
    fiber_g: null,
    sugar_g: null,
    amino_acids_g: {
      isoleucine: 3.15,
      leucine: 7.72,
      lysine: 2.05,
      methionine: 3.50,
      cystine: 1.75,
      sulfur_amino_acids_total: 5.25,
      phenylalanine: 3.19,
      tyrosine: 2.25,
      aromatic_amino_acids_total: 5.44,
      threonine: 2.50,
      tryptophan: 0.88,
      valine: 3.63,
      arginine: 2.38,
      histidine: 1.31,
      alanine: 5.63,
      aspartic_acid: 4.06,
      glutamic_acid: 12.63,
      glycine: 2.00,
      proline: 4.44,
      serine: 3.19,
      essential_amino_acids_total: 27.96,
      total_amino_acids: 63.60,
    },
  },
  {
    name: "barley",
    serving_size_g: 100,
    calories: null,
    fat_total_g: null,
    fat_saturated_g: null,
    protein_g: 100,
    sodium_mg: null,
    potassium_mg: null,
    cholesterol_mg: null,
    carbohydrates_total_g: null,
    fiber_g: null,
    sugar_g: null,
    amino_acids_g: {
      isoleucine: 3.50,
      leucine: 6.80,
      lysine: 3.30,
      methionine: 1.60,
      cystine: 2.10,
      sulfur_amino_acids_total: 3.70,
      phenylalanine: 4.90,
      tyrosine: 3.10,
      aromatic_amino_acids_total: 8.00,
      threonine: 3.10,
      tryptophan: 1.10,
      valine: 4.80,
      arginine: 4.80,
      histidine: 2.10,
      alanine: 4.20,
      aspartic_acid: 6.10,
      glutamic_acid: 19.00,
      glycine: 3.60,
      proline: 9.10,
      serine: 4.00,
      essential_amino_acids_total: 30.00,
      total_amino_acids: 70.00,
    },
  },
  {
    name: "maize_corn",
    serving_size_g: 100,
    calories: null,
    fat_total_g: null,
    fat_saturated_g: null,
    protein_g: 100,
    sodium_mg: null,
    potassium_mg: null,
    cholesterol_mg: null,
    carbohydrates_total_g: null,
    fiber_g: null,
    sugar_g: null,
    amino_acids_g: {
      isoleucine: 4.00,
      leucine: 12.00,
      lysine: 2.70,
      methionine: 2.10,
      cystine: 2.00,
      sulfur_amino_acids_total: 4.10,
      phenylalanine: 5.40,
      tyrosine: 3.80,
      aromatic_amino_acids_total: 9.20,
      threonine: 3.60,
      tryptophan: 0.60,
      valine: 5.00,
      arginine: 3.60,
      histidine: 2.60,
      alanine: 6.50,
      aspartic_acid: 6.50,
      glutamic_acid: 17.00,
      glycine: 3.50,
      proline: 8.50,
      serine: 4.50,
      essential_amino_acids_total: 32.00,
      total_amino_acids: 75.00,
    },
  },
  {
    name: "rice_milled",
    serving_size_g: 100,
    calories: null,
    fat_total_g: null,
    fat_saturated_g: null,
    protein_g: 100,
    sodium_mg: null,
    potassium_mg: null,
    cholesterol_mg: null,
    carbohydrates_total_g: null,
    fiber_g: null,
    sugar_g: null,
    amino_acids_g: {
      isoleucine: 4.00,
      leucine: 8.60,
      lysine: 3.80,
      methionine: 2.30,
      cystine: 2.20,
      sulfur_amino_acids_total: 4.50,
      phenylalanine: 5.70,
      tyrosine: 3.80,
      aromatic_amino_acids_total: 9.50,
      threonine: 3.80,
      tryptophan: 1.10,
      valine: 6.00,
      arginine: 6.50,
      histidine: 2.10,
      alanine: 5.80,
      aspartic_acid: 8.20,
      glutamic_acid: 17.50,
      glycine: 4.20,
      proline: 4.80,
      serine: 5.10,
      essential_amino_acids_total: 34.00,
      total_amino_acids: 78.00,
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fuzzy-match: normalise to lowercase, replace spaces/hyphens with underscores */
function normalise(s: string): string {
  return s.toLowerCase().replace(/[\s\-]+/g, "_");
}

function findIngredient(query: string): IngredientRecord | undefined {
  const q = normalise(query);
  return DATABASE.find(
    (r) => normalise(r.name) === q || normalise(r.name).includes(q) || q.includes(normalise(r.name))
  );
}

function jsonResponse(data: unknown): { content: { type: "text"; text: string }[] } {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  };
}

// ─── Server ──────────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "protein-amino-acid-profile",
  version: "1.0.0",
  capabilities: { resources: {}, tools: {} },
});

// ── Tool 1: get-amino-profile ─────────────────────────────────────────────────
// Returns the full amino acid profile for a single ingredient.
server.tool(
  "get-amino-profile",
  "Get the amino acid profile (g per 100 g protein) for a named ingredient",
  {
    ingredient: z.string().describe("Ingredient name, e.g. 'barley', 'maize_corn', 'rice milled'"),
  },
  async ({ ingredient }) => {
    const record = findIngredient(ingredient);

    if (!record) {
      return jsonResponse({
        error: `Ingredient "${ingredient}" not found.`,
        available: DATABASE.map((r) => r.name),
      });
    }

    return jsonResponse({
      name: record.name,
      serving_size_g: record.serving_size_g,
      protein_g: record.protein_g,
      amino_acids_g: record.amino_acids_g,
    });
  }
);

// ── Tool 2: list-ingredients ──────────────────────────────────────────────────
// Returns all ingredient names in the database.
server.tool(
  "list-ingredients",
  "List all available ingredient names in the protein database",
  {},
  async () => {
    return jsonResponse({
      count: DATABASE.length,
      ingredients: DATABASE.map((r) => r.name),
    });
  }
);

// ── Tool 3: compare-amino-profiles ───────────────────────────────────────────
// Side-by-side comparison of two or more ingredients.
server.tool(
  "compare-amino-profiles",
  "Compare amino acid profiles across two or more ingredients side by side",
  {
    ingredients: z
      .array(z.string())
      .min(2)
      .describe("List of ingredient names to compare, e.g. ['barley', 'rice_milled']"),
  },
  async ({ ingredients }) => {
    const results: Record<string, unknown> = {};
    const missing: string[] = [];

    for (const name of ingredients) {
      const record = findIngredient(name);
      if (!record) {
        missing.push(name);
      } else {
        results[record.name] = record.amino_acids_g;
      }
    }

    return jsonResponse({
      ...(missing.length > 0 && { not_found: missing }),
      comparison: results,
    });
  }
);

// ── Tool 4: get-essential-amino-acids ────────────────────────────────────────
// Returns only the 9 essential amino acids for quick review.
server.tool(
  "get-essential-amino-acids",
  "Get only the 9 essential amino acids for a named ingredient",
  {
    ingredient: z.string().describe("Ingredient name"),
  },
  async ({ ingredient }) => {
    const record = findIngredient(ingredient);

    if (!record) {
      return jsonResponse({
        error: `Ingredient "${ingredient}" not found.`,
        available: DATABASE.map((r) => r.name),
      });
    }

    const aa = record.amino_acids_g;
    return jsonResponse({
      name: record.name,
      serving_size_g: record.serving_size_g,
      essential_amino_acids_g: {
        histidine: aa.histidine,
        isoleucine: aa.isoleucine,
        leucine: aa.leucine,
        lysine: aa.lysine,
        methionine: aa.methionine,
        phenylalanine: aa.phenylalanine,
        threonine: aa.threonine,
        tryptophan: aa.tryptophan,
        valine: aa.valine,
      },
      essential_amino_acids_total_g: aa.essential_amino_acids_total,
      total_amino_acids_g: aa.total_amino_acids,
    });
  }
);

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Protein Amino Acid Profile MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});