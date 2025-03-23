package com.example.wearos_revivehero.presentation

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.wear.compose.material.MaterialTheme
import androidx.wear.compose.material.Scaffold
import com.example.wearos_revivehero.presentation.navigation.AppNavigation
import com.example.wearos_revivehero.presentation.ui.theme.ReviveHeroTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            WearApp()
        }
    }
}

@Composable
fun WearApp() {
    ReviveHeroTheme {
        Scaffold(
            modifier = Modifier.fillMaxSize(),
            timeText = { /* Leave empty */ }
        ) {
            AppNavigation()
        }
    }
}

@Preview(showBackground = true)
@Composable
fun DefaultPreview() {
    WearApp()
}