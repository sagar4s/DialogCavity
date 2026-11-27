export interface DieModel {
  id: string;
  name: string;
  dice1: number;
  dice2: number;
  dice3: number;
}

export const INITIAL_DIE_MODELS: DieModel[] = [
  { id: 'seed-01', name: 'TA-001', dice1: 482, dice2: 424, dice3: 428 },
  { id: 'seed-02', name: 'TA-002', dice1: 422, dice2: 424, dice3: 424 },
  { id: 'seed-03', name: 'TA-003', dice1: 485, dice2: 485, dice3: 485 },
  { id: 'seed-04', name: 'TA-005', dice1: 480, dice2: 480, dice3: 490 },
  { id: 'seed-05', name: 'TA-006', dice1: 435, dice2: 435, dice3: 435 },
  { id: 'seed-06', name: 'TA-007', dice1: 660, dice2: 660, dice3: 660 },
  { id: 'seed-07', name: 'TA-008', dice1: 540, dice2: 530, dice3: 540 },
  { id: 'seed-08', name: 'TA-009', dice1: 399, dice2: 435, dice3: 470 },
  { id: 'seed-09', name: 'TA-010', dice1: 660, dice2: 652, dice3: 650 },
  { id: 'seed-10', name: 'TA-011', dice1: 430, dice2: 465, dice3: 508 },
  { id: 'seed-11', name: 'TA-012', dice1: 524, dice2: 524, dice3: 524 },
  { id: 'seed-12', name: 'TA-013', dice1: 316, dice2: 348, dice3: 382 },
  { id: 'seed-13', name: 'TA-015', dice1: 388, dice2: 426, dice3: 471 },
  { id: 'seed-14', name: 'TA-016', dice1: 715, dice2: 715, dice3: 715 },
  { id: 'seed-15', name: 'TA-017', dice1: 710, dice2: 707, dice3: 705 },
  { id: 'seed-16', name: 'TA-018A', dice1: 465, dice2: 465, dice3: 465 },
  { id: 'seed-17', name: 'TA-018B', dice1: 375, dice2: 375, dice3: 375 },
  { id: 'seed-18', name: 'TA-019', dice1: 586, dice2: 595, dice3: 582 },
  { id: 'seed-19', name: 'TA-020', dice1: 0, dice2: 0, dice3: 0 },
  { id: 'seed-20', name: 'TA-021', dice1: 650, dice2: 640, dice3: 640 },
  { id: 'seed-21', name: 'TA-022', dice1: 990, dice2: 995, dice3: 990 },
  { id: 'seed-22', name: 'TA-023', dice1: 508, dice2: 507, dice3: 518 },
  { id: 'seed-23', name: 'TA-025', dice1: 545, dice2: 545, dice3: 545 },
  { id: 'seed-24', name: 'TA-026', dice1: 396, dice2: 442, dice3: 490 },
  { id: 'seed-25', name: 'TA-027', dice1: 657, dice2: 673, dice3: 641 },
  { id: 'seed-26', name: 'TA-028', dice1: 0, dice2: 0, dice3: 0 },
  { id: 'seed-27', name: 'TA-029', dice1: 404, dice2: 403, dice3: 410 },
  { id: 'seed-28', name: 'TA-030', dice1: 597, dice2: 597, dice3: 597 },
  { id: 'seed-29', name: 'TA-031', dice1: 0, dice2: 0, dice3: 0 },
  { id: 'seed-30', name: 'TA-033', dice1: 406, dice2: 404, dice3: 408 },
  { id: 'seed-31', name: 'TA-035', dice1: 490, dice2: 490, dice3: 492 },
  { id: 'seed-32', name: 'TA-036', dice1: 357, dice2: 424, dice3: 435 },
  { id: 'seed-33', name: 'TA-037', dice1: 268, dice2: 296, dice3: 330 },
  { id: 'seed-34', name: 'TA-039', dice1: 282, dice2: 323, dice3: 352 },
  { id: 'seed-35', name: 'TA-040', dice1: 560, dice2: 550, dice3: 558 },
  { id: 'seed-36', name: 'TA-041', dice1: 0, dice2: 0, dice3: 0 },
  { id: 'seed-37', name: 'DX-9055', dice1: 460, dice2: 460, dice3: 0 },
  { id: 'seed-38', name: 'DX-9058', dice1: 440, dice2: 445, dice3: 0 },
  { id: 'seed-39', name: 'DX-9119', dice1: 0, dice2: 0, dice3: 0 },
  { id: 'seed-40', name: 'DX-9016', dice1: 410, dice2: 410, dice3: 405 },
  { id: 'seed-41', name: 'DX-7336', dice1: 497, dice2: 500, dice3: 493 },
  { id: 'seed-42', name: 'TA-401', dice1: 786, dice2: 782, dice3: 785 },
  { id: 'seed-43', name: 'DX-9146', dice1: 452, dice2: 504, dice3: 560 },
  { id: 'seed-44', name: 'DX-9147', dice1: 432, dice2: 442, dice3: 440 },
  { id: 'seed-45', name: 'TA-038', dice1: 739, dice2: 734, dice3: 740 },
];

/** Returns total grams for a model (Dice1 + Dice2 + Dice3). */
export function getModelTotalGrams(model: DieModel): number {
  return model.dice1 + model.dice2 + model.dice3;
}

/**
 * Exact-match lookup using the FIRST matching model name
 * (mirrors Excel VLOOKUP with FALSE). Returns 0 if blank or unmatched.
 */
export function lookupTotalGrams(models: DieModel[], modelName: string | null): number {
  if (!modelName) return 0;
  const match = models.find((m) => m.name === modelName);
  return match ? getModelTotalGrams(match) : 0;
}

/** Parses whole-number count input (>= 0). Empty or invalid input resolves to 0. */
export function parseWholeCount(raw: string): number {
  const trimmed = raw.trim();
  if (!/^\d+$/.test(trimmed)) return 0;
  const parsed = Number.parseInt(trimmed, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

/**
 * Calculates pair weight in kilograms:
 *   pair_total_grams = Total(slotA) + Total(slotB)
 *   pair_kg = (pair_total_grams / 1000) * count
 */
export function calculatePairKg(
  models: DieModel[],
  slotA: string | null,
  slotB: string | null,
  countRaw: string
): number {
  const pairGrams = lookupTotalGrams(models, slotA) + lookupTotalGrams(models, slotB);
  const count = parseWholeCount(countRaw);
  return (pairGrams / 1000) * count;
}

/** Sums both pairs into the grand total in kilograms. */
export function calculateGrandTotalKg(pair13Kg: number, pair24Kg: number): number {
  return pair13Kg + pair24Kg;
}

/** Formats kilograms with exactly 3 decimal places (e.g. "505.680 kg"). */
export function formatKg(kg: number): string {
  return `${kg.toFixed(3)} kg`;
}
