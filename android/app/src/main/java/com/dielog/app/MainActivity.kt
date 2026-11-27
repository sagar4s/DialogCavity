package com.dielog.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Calculate
import androidx.compose.material.icons.filled.Scale
import androidx.compose.material.icons.filled.Storage
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationBarItemDefaults
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.dielog.app.ui.screens.CalculatorScreen
import com.dielog.app.ui.screens.DatabaseScreen
import com.dielog.app.ui.theme.DieLogTheme
import com.dielog.app.ui.theme.LocalDieLogColors
import com.dielog.app.ui.theme.NearBlack
import com.dielog.app.viewmodel.DieLogViewModel

private enum class DieLogTab(val label: String, val icon: ImageVector) {
    DATABASE("Database", Icons.Default.Storage),
    CALCULATOR("Calculator", Icons.Default.Calculate)
}

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            DieLogTheme {
                DieLogApp()
            }
        }
    }
}

@Composable
fun DieLogApp(
    viewModel: DieLogViewModel = viewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val ext = LocalDieLogColors.current
    var activeTab by rememberSaveable { mutableStateOf(DieLogTab.DATABASE) }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        containerColor = MaterialTheme.colorScheme.background,
        topBar = {
            DieLogHeader()
        },
        bottomBar = {
            Column {
                HorizontalDivider(thickness = 1.dp, color = ext.divider)
                NavigationBar(
                    containerColor = ext.cardSurface,
                    tonalElevation = 0.dp
                ) {
                    DieLogTab.entries.forEach { tab ->
                        val selected = activeTab == tab
                        NavigationBarItem(
                            selected = selected,
                            onClick = { activeTab = tab },
                            icon = {
                                Icon(
                                    imageVector = tab.icon,
                                    contentDescription = tab.label
                                )
                            },
                            label = {
                                Text(
                                    text = tab.label,
                                    fontWeight = if (selected) FontWeight.Bold else FontWeight.Medium
                                )
                            },
                            colors = NavigationBarItemDefaults.colors(
                                selectedIconColor = NearBlack,
                                selectedTextColor = MaterialTheme.colorScheme.onSurface,
                                indicatorColor = ext.goldAccent,
                                unselectedIconColor = ext.mutedText,
                                unselectedTextColor = ext.mutedText
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        when (activeTab) {
            DieLogTab.DATABASE -> DatabaseScreen(
                uiState = uiState,
                onSearchQueryChange = viewModel::onSearchQueryChange,
                onAddModel = viewModel::addModel,
                modifier = Modifier.padding(innerPadding)
            )
            DieLogTab.CALCULATOR -> CalculatorScreen(
                uiState = uiState,
                onSelectSlot = viewModel::setSlot,
                onCount13Change = viewModel::onCount13Change,
                onCount24Change = viewModel::onCount24Change,
                modifier = Modifier.padding(innerPadding)
            )
        }
    }
}

@Composable
private fun DieLogHeader() {
    val ext = LocalDieLogColors.current

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.background)
            .statusBarsPadding()
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 14.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Dark rounded square badge with gold Scale icon
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(NearBlack),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Scale,
                    contentDescription = "DIE LOG logo",
                    tint = ext.goldAccent,
                    modifier = Modifier.size(22.dp)
                )
            }

            Spacer(modifier = Modifier.width(12.dp))

            Column {
                Text(
                    text = "DIE LOG",
                    style = MaterialTheme.typography.titleLarge,
                    color = MaterialTheme.colorScheme.onBackground
                )
                Text(
                    text = "Cavity weight tracker",
                    fontSize = 12.sp,
                    color = ext.mutedText
                )
            }
        }
        HorizontalDivider(thickness = 1.dp, color = ext.divider)
    }
}
