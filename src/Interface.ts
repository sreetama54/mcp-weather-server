
export interface AminoAcidProfile {
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

export interface IngredientRecord {
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
