package com.dielog.app.ui.screens

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Remove
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.MenuAnchorType
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.dielog.app.model.DieModel
import com.dielog.app.model.WeightCalculator
import com.dielog.app.ui.theme.LocalDieLogColors
import com.dielog.app.ui.theme.NearBlack
import com.dielog.app.viewmodel.DieLogUiState

@Composable
fun CalculatorScreen(
    uiState: DieLogUiState,
    onSelectSlot: (slotNumber: Int, modelName: String?) -> Unit,
    onCount13Change: (String) -> Unit,
    onCount24Change: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    val ext = LocalDieLogColors.current

    Column(
        modifier = modifier.fillMaxSize()
    ) {
        Column(
            modifier = Modifier
                .weight(1f)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp, vertical = 14.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Text(
                text = "Pick up to four models to combine their dice weight into kilograms.",
                style = MaterialTheme.typography.bodyMedium,
                color = ext.mutedText
            )

            // Four numbered model selection rows (1, 2, 3, 4)
            SlotSelectorRow(
                slotNumber = 1,
                selectedModel = uiState.slot1,
                models = uiState.models,
                onSelect = { onSelectSlot(1, it) },
                onClear = { onSelectSlot(1, null) }
            )
            SlotSelectorRow(
                slotNumber = 2,
                selectedModel = uiState.slot2,
                models = uiState.models,
                onSelect = { onSelectSlot(2, it) },
                onClear = { onSelectSlot(2, null) }
            )
            SlotSelectorRow(
                slotNumber = 3,
                selectedModel = uiState.slot3,
                models = uiState.models,
                onSelect = { onSelectSlot(3, it) },
                onClear = { onSelectSlot(3, null) }
            )
            SlotSelectorRow(
                slotNumber = 4,
                selectedModel = uiState.slot4,
                models = uiState.models,
                onSelect = { onSelectSlot(4, it) },
                onClear = { onSelectSlot(4, null) }
            )

            Spacer(modifier = Modifier.height(4.dp))

            // Two-column Count inputs + pair kg result cards (1 + 3) and (2 + 4)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                PairCalculationColumn(
                    pairLabel = "1 + 3",
                    countInput = uiState.count13Input,
                    onCountChange = onCount13Change,
                    pairKg = uiState.pair13Kg,
                    modifier = Modifier.weight(1f)
                )
                PairCalculationColumn(
                    pairLabel = "2 + 4",
                    countInput = uiState.count24Input,
                    onCountChange = onCount24Change,
                    pairKg = uiState.pair24Kg,
                    modifier = Modifier.weight(1f)
                )
            }
        }

        // Bottom dark GRAND TOTAL bar pinned cleanly above the NavigationBar
        Surface(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            shape = RoundedCornerShape(16.dp),
            color = ext.darkBarContainer
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 18.dp, vertical = 16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = "GRAND TOTAL",
                    color = Color(0xFFD6D2C4),
                    fontWeight = FontWeight.Bold,
                    fontSize = 13.sp,
                    letterSpacing = 1.4.sp
                )
                Text(
                    text = WeightCalculator.formatKg(uiState.grandTotalKg),
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    fontSize = 22.sp,
                    color = ext.goldAccent
                )
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun SlotSelectorRow(
    slotNumber: Int,
    selectedModel: String?,
    models: List<DieModel>,
    onSelect: (String) -> Unit,
    onClear: () -> Unit
) {
    val ext = LocalDieLogColors.current
    var expanded by remember { mutableStateOf(false) }

    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Slot index badge
        Box(
            modifier = Modifier
                .size(34.dp)
                .clip(RoundedCornerShape(10.dp))
                .background(NearBlack),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = slotNumber.toString(),
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                color = ext.goldAccent,
                fontSize = 14.sp
            )
        }

        Spacer(modifier = Modifier.width(10.dp))

        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = { expanded = !expanded },
            modifier = Modifier.weight(1f)
        ) {
            OutlinedTextField(
                value = selectedModel ?: "",
                onValueChange = {},
                readOnly = true,
                placeholder = {
                    Text(
                        text = "— Select model —",
                        color = ext.mutedText
                    )
                },
                trailingIcon = {
                    ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                },
                singleLine = true,
                shape = RoundedCornerShape(14.dp),
                colors = OutlinedTextFieldDefaults.colors(
                    focusedContainerColor = ext.cardSurface,
                    unfocusedContainerColor = ext.cardSurface,
                    focusedBorderColor = ext.goldAccent,
                    unfocusedBorderColor = ext.cardBorder
                ),
                modifier = Modifier
                    .menuAnchor(MenuAnchorType.PrimaryNotEditable, enabled = true)
                    .fillMaxWidth()
            )

            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false },
                containerColor = ext.cardSurface
            ) {
                models.forEach { model ->
                    DropdownMenuItem(
                        text = {
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = model.name,
                                    fontWeight = FontWeight.SemiBold
                                )
                                Text(
                                    text = "${model.totalGrams}g",
                                    fontFamily = FontFamily.Monospace,
                                    fontSize = 12.sp,
                                    color = ext.mutedText
                                )
                            }
                        },
                        onClick = {
                            onSelect(model.name)
                            expanded = false
                        }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.width(6.dp))

        // Clear slot button ("−")
        IconButton(
            onClick = onClear,
            enabled = selectedModel != null
        ) {
            Icon(
                imageVector = Icons.Default.Remove,
                contentDescription = "Clear slot $slotNumber",
                tint = if (selectedModel != null) MaterialTheme.colorScheme.onBackground else ext.mutedText.copy(alpha = 0.4f)
            )
        }
    }
}

@Composable
private fun PairCalculationColumn(
    pairLabel: String,
    countInput: String,
    onCountChange: (String) -> Unit,
    pairKg: Double,
    modifier: Modifier = Modifier
) {
    val ext = LocalDieLogColors.current

    Column(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(
            text = "Count",
            style = MaterialTheme.typography.labelMedium,
            color = ext.mutedText,
            fontWeight = FontWeight.SemiBold
        )

        OutlinedTextField(
            value = countInput,
            onValueChange = onCountChange,
            singleLine = true,
            placeholder = { Text("0", fontFamily = FontFamily.Monospace) },
            textStyle = TextStyle(
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 18.sp,
                color = MaterialTheme.colorScheme.onSurface
            ),
            keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
            shape = RoundedCornerShape(14.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedContainerColor = ext.cardSurface,
                unfocusedContainerColor = ext.cardSurface,
                focusedBorderColor = ext.goldAccent,
                unfocusedBorderColor = ext.cardBorder
            ),
            modifier = Modifier.fillMaxWidth()
        )

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = ext.cardSurface),
            border = BorderStroke(1.dp, ext.cardBorder),
            elevation = CardDefaults.cardElevation(defaultElevation = 0.dp)
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 14.dp, vertical = 14.dp)
            ) {
                Text(
                    text = pairLabel,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = ext.mutedText
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = WeightCalculator.formatKg(pairKg),
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    fontSize = 19.sp,
                    color = MaterialTheme.colorScheme.onSurface
                )
            }
        }
    }
}
