package com.dielog.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

// Core palette tokens
val WarmBeigeBg = Color(0xFFE8E5DC)
val OffWhiteCard = Color(0xFFFBFAF6)
val BeigeBorder = Color(0xFFD6D2C4)
val ChipSurfaceLight = Color(0xFFF0EDE4)
val NearBlack = Color(0xFF23211E)
val GoldAccent = Color(0xFFE0A526)
val MutedGreyLight = Color(0xFF6E695E)

// Dark palette tokens preserving warm industrial contrast
val DarkBg = Color(0xFF161512)
val DarkCard = Color(0xFF22201C)
val DarkBorder = Color(0xFF38342D)
val ChipSurfaceDark = Color(0xFF2D2A24)
val DarkTextPrimary = Color(0xFFF4F1E8)
val MutedGreyDark = Color(0xFFA39D90)

@Immutable
data class DieLogExtendedColors(
    val cardSurface: Color,
    val cardBorder: Color,
    val chipBackground: Color,
    val mutedText: Color,
    val darkBarContainer: Color,
    val goldAccent: Color,
    val divider: Color
)

val LocalDieLogColors = staticCompositionLocalOf {
    DieLogExtendedColors(
        cardSurface = OffWhiteCard,
        cardBorder = BeigeBorder,
        chipBackground = ChipSurfaceLight,
        mutedText = MutedGreyLight,
        darkBarContainer = NearBlack,
        goldAccent = GoldAccent,
        divider = BeigeBorder
    )
}

private val LightColorScheme = lightColorScheme(
    primary = NearBlack,
    onPrimary = GoldAccent,
    secondary = GoldAccent,
    onSecondary = NearBlack,
    background = WarmBeigeBg,
    onBackground = NearBlack,
    surface = OffWhiteCard,
    onSurface = NearBlack,
    surfaceVariant = ChipSurfaceLight,
    onSurfaceVariant = MutedGreyLight,
    outline = BeigeBorder,
    outlineVariant = BeigeBorder
)

private val DarkColorScheme = darkColorScheme(
    primary = GoldAccent,
    onPrimary = NearBlack,
    secondary = GoldAccent,
    onSecondary = NearBlack,
    background = DarkBg,
    onBackground = DarkTextPrimary,
    surface = DarkCard,
    onSurface = DarkTextPrimary,
    surfaceVariant = ChipSurfaceDark,
    onSurfaceVariant = MutedGreyDark,
    outline = DarkBorder,
    outlineVariant = DarkBorder
)

private val DieLogTypography = Typography(
    titleLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.ExtraBold,
        fontSize = 22.sp,
        letterSpacing = 1.6.sp
    ),
    titleMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Bold,
        fontSize = 17.sp
    ),
    bodyMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp
    ),
    labelMedium = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp
    )
)

@Composable
fun DieLogTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    val extendedColors = if (darkTheme) {
        DieLogExtendedColors(
            cardSurface = DarkCard,
            cardBorder = DarkBorder,
            chipBackground = ChipSurfaceDark,
            mutedText = MutedGreyDark,
            darkBarContainer = Color(0xFF0E0D0B),
            goldAccent = GoldAccent,
            divider = DarkBorder
        )
    } else {
        DieLogExtendedColors(
            cardSurface = OffWhiteCard,
            cardBorder = BeigeBorder,
            chipBackground = ChipSurfaceLight,
            mutedText = MutedGreyLight,
            darkBarContainer = NearBlack,
            goldAccent = GoldAccent,
            divider = BeigeBorder
        )
    }

    CompositionLocalProvider(LocalDieLogColors provides extendedColors) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = DieLogTypography,
            content = content
        )
    }
}
