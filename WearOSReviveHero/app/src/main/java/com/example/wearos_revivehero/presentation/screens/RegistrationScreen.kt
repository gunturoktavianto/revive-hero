package com.example.wearos_revivehero.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.em
import androidx.navigation.NavController
import androidx.wear.compose.material.*
import com.example.wearos_revivehero.R
import com.example.wearos_revivehero.presentation.navigation.Screen

@Composable
fun RegisterScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
    ) {
        item {
            Image(
                painter = painterResource(id = R.drawable.logo),
                contentDescription = "Revive Hero Logo",
                modifier = Modifier.size(100.dp).padding(10.dp)
            )
        }

        item {
            Text(
                text = "Cara Pembuatan Akun",
                style = MaterialTheme.typography.title2,
                color = Color.Black,
                modifier = Modifier.padding(10.dp),
                textAlign = TextAlign.Center,
                fontSize = 2.em,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
            )
        }

        item {
            Text(
                text = "Silahkan membuat akun melalui tautan",
                textAlign = TextAlign.Center,
                modifier = Modifier.fillMaxWidth(0.9f),
                color = Color.Black,
                fontSize = 1.5.em,
            )
        }

        item {
            Text(
                text = "www.revive-hero.com",
                style = MaterialTheme.typography.body1,
                color = Color.Black,
                modifier = Modifier.fillMaxWidth(0.9f).padding(10.dp),
                fontSize = 1.5.em,
                fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                fontStyle = androidx.compose.ui.text.font.FontStyle.Italic
            )
        }

        item {
            Text(
                text = "*Gunakan device selain smartwatch untuk kemudahan mengisi data.",
                style = MaterialTheme.typography.caption2,
                color = androidx.compose.ui.graphics.Color.Red,
                modifier = Modifier.fillMaxWidth(0.9f).padding(10.dp),
                fontSize = 1.5.em,
            )
        }

        item {
            Button(
                onClick = { navController.navigate(Screen.Login.route) },
                modifier = Modifier.fillMaxWidth(0.6f).padding(10.dp),

            ) {
                Text("Kembali")
            }
        }
    }
}
