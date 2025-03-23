package com.example.wearos_revivehero.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.wear.compose.material.*
import com.example.wearos_revivehero.R
import com.example.wearos_revivehero.presentation.navigation.Screen
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun HomeScreen(navController: NavController) {
    // Automatically updates time & date
    var isOn by remember { mutableStateOf(false) }
    val currentDate by remember {
        derivedStateOf {
            SimpleDateFormat("d MMM yyyy • EEEE", Locale("id")).format(Date())
        }
    }
    val currentTime by remember {
        derivedStateOf {
            SimpleDateFormat("HH:mm", Locale("id")).format(Date())
        }
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        item {
            Image(
                painter = painterResource(id = R.drawable.logo),
                contentDescription = "Revive Hero Logo",
                modifier = Modifier.size(100.dp)
            )
        }

        item {
            Row(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(Color.Black)
                    .padding(horizontal = 12.dp, vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Image(
                    painter = painterResource(id = R.drawable.avatar_placeholder),
                    contentDescription = "Profile picture",
                    modifier = Modifier
                        .size(24.dp)
                        .clip(CircleShape)
                )

                Spacer(modifier = Modifier.width(4.dp))

                Text(
                    text = "Guntur",
                    style = MaterialTheme.typography.body2,
                    color = Color.White
                )
            }
        }

        item {
            Text(
                text = currentDate,
                style = MaterialTheme.typography.caption2,
                color = Color.Black
            )
        }

        item {
            Text(
                text = currentTime, // Removes "am/pm" issue
                style = MaterialTheme.typography.title1,
                textAlign = TextAlign.Center,
                color = Color.Black
            )
        }

        item {
            Spacer(modifier = Modifier.height(8.dp))
        }

        item {
            // ✅ Power Button with Dynamic Color
            Button(
                onClick = { isOn = !isOn }, // ✅ Toggle ON/OFF state
                modifier = Modifier
                    .size(80.dp)
                    .clip(CircleShape),
                colors = ButtonDefaults.buttonColors(
                    backgroundColor = if (isOn) Color.Green else Color.LightGray // ✅ Background color changes
                )
            ) {
                Image(
                    painter = painterResource(
                        id = if (isOn) R.drawable.power_on else R.drawable.power_icon
                    ), // ✅ Change icon based on state
                    contentDescription = "Power"
                )
            }
        }

        item {
            Text(
                text = if (isOn) "Perangkat AKTIF" else "Tekan tombol untuk mengaktifkan",
                style = MaterialTheme.typography.caption2,
                textAlign = TextAlign.Center,
                color = Color.Black,
                modifier = Modifier.padding(0.dp, 8.dp)
            )
        }

        item {
            Spacer(modifier = Modifier.height(16.dp))
        }

        item {
            Text(
                text = "Tes Kondisi Darurat",
                color = Color.Black,
            )
        }

        item {
            Button(
                onClick = { navController.navigate(Screen.QrCode.route) },
                modifier = Modifier.size(80.dp)

            ) {
                Text("Scan QR")
            }
        }
    }
}
