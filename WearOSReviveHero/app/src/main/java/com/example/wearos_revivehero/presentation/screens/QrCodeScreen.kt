package com.example.wearos_revivehero.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.wear.compose.material.*
import com.example.wearos_revivehero.R
import com.example.wearos_revivehero.presentation.navigation.Screen

@Composable
fun QrCodeScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        item {
            Image(
                painter = painterResource(id = R.drawable.logo),
                contentDescription = "Revive Hero Logo",
                modifier = Modifier.size(50.dp)
            )
        }

        item {
            Text(
                text = "KEADAAN DARURAT",
                style = MaterialTheme.typography.title2,
                color = Color.Red,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(vertical = 8.dp)
            )
        }

        item {
            Image(
                painter = painterResource(id = R.drawable.qr_code),
                contentDescription = "QR Code",
                modifier = Modifier.size(150.dp)
            )
        }

        item {
            Text(
                text = "SCAN QR UNTUK MEMBERIKAN PERTOLONGAN",
                style = MaterialTheme.typography.caption1,
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(0.9f),
                color = Color.Black
            )
        }

        item {
            Spacer(modifier = Modifier.height(8.dp))
        }

        item {
            Button(
                onClick = { navController.navigate(Screen.Home.route) },
                modifier = Modifier.size(80.dp)
            ) {
                Text("Kembali")
            }
        }
    }
}
