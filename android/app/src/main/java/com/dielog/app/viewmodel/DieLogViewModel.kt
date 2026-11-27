package com.dielog.app.viewmodel

import androidx.lifecycle.ViewModel
import com.dielog.app.model.DieDatabaseSeed
import com.dielog.app.model.DieModel
import com.dielog.app.model.WeightCalculator
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

/**
 * Immutable UI state for both the Database and Calculator screens.
 * Kept strictly in memory via StateFlow (no database or network layer).
 */
data class DieLogUiState(
    val models: List<DieModel> = DieDatabaseSeed.initialModels,
    val searchQuery: String = "",
    // Calculator slots (1..4) pre-populated with the verified default example
    val slot1: String? = "DX-9055",
    val slot2: String? = "TA-401",
    val slot3: String? = "TA-012",
    val slot4: String? = "TA-030",
    // Raw string state keeps OutlinedTextField cursor and focus stable while typing
    val count13Input: String = "20",
    val count24Input: String = "110"
) {
    /** Live case-insensitive filtered list for the Database screen. */
    val filteredModels: List<DieModel>
        get() {
            val q = searchQuery.trim()
            if (q.isEmpty()) return models
            return models.filter { it.name.contains(q, ignoreCase = true) }
        }

    /** Pair (1 + 3) weight in kilograms. */
    val pair13Kg: Double
        get() = WeightCalculator.calculatePairKg(models, slot1, slot3, count13Input)

    /** Pair (2 + 4) weight in kilograms. */
    val pair24Kg: Double
        get() = WeightCalculator.calculatePairKg(models, slot2, slot4, count24Input)

    /** Combined grand total weight in kilograms. */
    val grandTotalKg: Double
        get() = WeightCalculator.calculateGrandTotalKg(pair13Kg, pair24Kg)
}

class DieLogViewModel : ViewModel() {

    private val _uiState = MutableStateFlow(DieLogUiState())
    val uiState: StateFlow<DieLogUiState> = _uiState.asStateFlow()

    fun onSearchQueryChange(query: String) {
        _uiState.update { it.copy(searchQuery = query) }
    }

    /** Appends a new model to the in-memory database list. */
    fun addModel(name: String, dice1: Int, dice2: Int, dice3: Int) {
        val trimmedName = name.trim()
        if (trimmedName.isEmpty()) return
        val newModel = DieModel(
            name = trimmedName,
            dice1 = dice1.coerceAtLeast(0),
            dice2 = dice2.coerceAtLeast(0),
            dice3 = dice3.coerceAtLeast(0)
        )
        _uiState.update { current ->
            current.copy(models = current.models + newModel)
        }
    }

    /** Selects or clears (null) one of the four calculator model slots (1..4). */
    fun setSlot(slotNumber: Int, modelName: String?) {
        _uiState.update { current ->
            when (slotNumber) {
                1 -> current.copy(slot1 = modelName)
                2 -> current.copy(slot2 = modelName)
                3 -> current.copy(slot3 = modelName)
                4 -> current.copy(slot4 = modelName)
                else -> current
            }
        }
    }

    /** Updates Count (1 + 3), permitting digits only so input stays whole and >= 0. */
    fun onCount13Change(raw: String) {
        val sanitized = raw.filter { it.isDigit() }
        _uiState.update { it.copy(count13Input = sanitized) }
    }

    /** Updates Count (2 + 4), permitting digits only so input stays whole and >= 0. */
    fun onCount24Change(raw: String) {
        val sanitized = raw.filter { it.isDigit() }
        _uiState.update { it.copy(count24Input = sanitized) }
    }
}
