import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { IngredientRecord} from "./types/Interface.js";
//import load from "fs";
import { loadDatabase } from "./utils/temp_api_loader.js";

//const DATABASE: IngredientRecord[] = JSON.parse(fs.readFileSync("./data/output.json", "utf-8"));
const DATABASE: IngredientRecord[] = await loadDatabase();
loadDatabase().then((data) => {
  console.log("✅ Database loaded with", data.length, "records");
}).catch((error) => {
  console.error("❌ Failed to load database:", error);
  process.exit(1);
});
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