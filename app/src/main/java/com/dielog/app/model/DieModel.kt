package com.dielog.app.model

import java.util.Locale

/**
 * Represents a single die model entry with its three cavity/dice weights in grams.
 */
data class DieModel(
    val name: String,
    val dice1: Int,
    val dice2: Int,
    val dice3: Int
) {
    /** Total model cavity weight in grams (Dice1 + Dice2 + Dice3). */
    val totalGrams: Int
        get() = dice1 + dice2 + dice3
}

/**
 * In-memory seed database of all 45 die models.
 * Order is preserved so lookups match Excel VLOOKUP(..., FALSE) first-match semantics.
 */
object DieDatabaseSeed {
    val initialModels: List<DieModel> = listOf(
        DieModel("TA-001", 482, 424, 428),
        DieModel("TA-002", 422, 424, 424),
        DieModel("TA-003", 485, 485, 485),
        DieModel("TA-005", 480, 480, 490),
        DieModel("TA-006", 435, 435, 435),
        DieModel("TA-007", 660, 660, 660),
        DieModel("TA-008", 540, 530, 540),
        DieModel("TA-009", 399, 435, 470),
        DieModel("TA-010", 660, 652, 650),
        DieModel("TA-011", 430, 465, 508),
        DieModel("TA-012", 524, 524, 524),
        DieModel("TA-013", 316, 348, 382),
        DieModel("TA-015", 388, 426, 471),
        DieModel("TA-016", 715, 715, 715),
        DieModel("TA-017", 710, 707, 705),
        DieModel("TA-018A", 465, 465, 465),
        DieModel("TA-018B", 375, 375, 375),
        DieModel("TA-019", 586, 595, 582),
        DieModel("TA-020", 0, 0, 0),
        DieModel("TA-021", 650, 640, 640),
        DieModel("TA-022", 990, 995, 990),
        DieModel("TA-023", 508, 507, 518),
        DieModel("TA-025", 545, 545, 545),
        DieModel("TA-026", 396, 442, 490),
        DieModel("TA-027", 657, 673, 641),
        DieModel("TA-028", 0, 0, 0),
        DieModel("TA-029", 404, 403, 410),
        DieModel("TA-030", 597, 597, 597),
        DieModel("TA-031", 0, 0, 0),
        DieModel("TA-033", 406, 404, 408),
        DieModel("TA-035", 490, 490, 492),
        DieModel("TA-036", 357, 424, 435),
        DieModel("TA-037", 268, 296, 330),
        DieModel("TA-039", 282, 323, 352),
        DieModel("TA-040", 560, 550, 558),
        DieModel("TA-041", 0, 0, 0),
        DieModel("DX-9055", 460, 460, 0),
        DieModel("DX-9058", 440, 445, 0),
        DieModel("DX-9119", 0, 0, 0),
        DieModel("DX-9016", 410, 410, 405),
        DieModel("DX-7336", 497, 500, 493),
        DieModel("TA-401", 786, 782, 785),
        DieModel("DX-9146", 452, 504, 560),
        DieModel("DX-9147", 432, 442, 440),
        DieModel("TA-038", 739, 734, 740)
    )
}

/**
 * Pure weight calculation helpers matching the Excel spreadsheet formulas.
 */
object WeightCalculator {

    /**
     * Exact-match lookup returning the total grams of the FIRST matching model name
     * (mirrors Excel VLOOKUP with range_lookup = FALSE). Returns 0 if blank or not found.
     */
    fun lookupTotalGrams(models: List<DieModel>, modelName: String?): Int {
        if (modelName.isNullOrBlank()) return 0
        return models.firstOrNull { it.name == modelName }?.totalGrams ?: 0
    }

    /**
     * Parses a user-entered count string into a whole non-negative integer.
     * Empty or invalid input resolves to 0.
     */
    fun parseCount(raw: String): Int {
        val parsed = raw.trim().toIntOrNull() ?: 0
        return parsed.coerceAtLeast(0)
    }

    /**
     * Calculates pair weight in kilograms:
     *   pair_total_grams = Total(slotA) + Total(slotB)
     *   pair_kg = (pair_total_grams / 1000.0) * count
     * If one slot is empty, only the other slot contributes; if both are empty, returns 0.0.
     */
    fun calculatePairKg(
        models: List<DieModel>,
        slotA: String?,
        slotB: String?,
        countRaw: String
    ): Double {
        val pairTotalGrams = lookupTotalGrams(models, slotA) + lookupTotalGrams(models, slotB)
        val count = parseCount(countRaw)
        return (pairTotalGrams / 1000.0) * count
    }

    /**
     * Sums the two paired batch weights (1+3) and (2+4) into the grand total in kilograms.
     */
    fun calculateGrandTotalKg(pair13Kg: Double, pair24Kg: Double): Double {
        return pair13Kg + pair24Kg
    }

    /** Formats a kilogram value with exactly 3 decimal places (e.g., "505.680 kg"). */
    fun formatKg(kg: Double): String {
        return String.format(Locale.US, "%.3f kg", kg)
    }
}
