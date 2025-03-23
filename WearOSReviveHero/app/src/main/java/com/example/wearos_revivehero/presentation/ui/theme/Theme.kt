package com.example.wearos_revivehero.presentation.ui.theme

import androidx.compose.runtime.Composable
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Colors
import androidx.compose.ui.graphics.Color

private val DarkColors = Colors(
    primary = Color.White,
    primaryVariant = Purple700,
    secondary = Teal200,
    secondaryVariant = Teal200,
    error = Red,
    onPrimary = Color.Black,
    onSecondary = Color.Black,
    onError = Color.White,
    background = Color.Black,
    onBackground = Color.White,
    surface = Color.Black,
    onSurface = Color.White
)

@Composable
fun ReviveHeroTheme(
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colors = DarkColors,
        content = content
    )
}