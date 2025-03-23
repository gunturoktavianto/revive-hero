package com.example.wearos_revivehero.presentation.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldColors
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.wear.compose.material.*
import com.example.wearos_revivehero.R
import com.example.wearos_revivehero.presentation.navigation.Screen

@Composable
fun LoginScreen(navController: NavController) {
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(Color.White),
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
            Text(
                text = "Masuk",
                style = MaterialTheme.typography.title2,
                color = Color.Black,
                modifier = Modifier.padding(0.dp, 0.dp, 0.dp, 16.dp)
            )
        }

        item {
            OutlinedTextField(
                value = email,
                onValueChange = { email = it },
                placeholder = { Text("Email") },
                colors = TextFieldDefaults.colors(
                    focusedTextColor = Color.Black,
                    unfocusedTextColor = Color.DarkGray,
                    focusedIndicatorColor = Color.Blue,
                    unfocusedIndicatorColor = Color.Gray,
                    focusedPlaceholderColor = Color.Gray,
                    unfocusedPlaceholderColor = Color.DarkGray,
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.LightGray,
                ),
                modifier = Modifier.fillMaxWidth(0.8f)
            )


        }

        item {
            Spacer(modifier = Modifier.height(8.dp))
        }

        item {
            OutlinedTextField(
                value = password,
                onValueChange = { password = it },
                label = { Text("Kata Sandi") },
                colors = TextFieldDefaults.colors(
                    focusedTextColor = Color.Black,
                    unfocusedTextColor = Color.DarkGray,
                    focusedIndicatorColor = Color.Blue,
                    unfocusedIndicatorColor = Color.Gray,
                    focusedPlaceholderColor = Color.Gray,
                    unfocusedPlaceholderColor = Color.DarkGray,
                    focusedContainerColor = Color.White,
                    unfocusedContainerColor = Color.LightGray,
                ),
                modifier = Modifier.fillMaxWidth(0.8f)
            )
        }

        item {
            Row(
                horizontalArrangement = Arrangement.Center
            ) {
                Text(
                    text = "Belum punya akun? ",
                    style = MaterialTheme.typography.caption2,
                    color = Color.Black
                )
                Text(
                    text = "Daftar",
                    style = MaterialTheme.typography.caption2,
                    color = Color.Black,
                    modifier = Modifier.clickable {
                        navController.navigate(Screen.Register.route)
                    },
                    // bold text
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Bold
                )
            }
        }

        item {
            Spacer(modifier = Modifier.height(10.dp))
        }

        item {
            Button(
                onClick = { navController.navigate(Screen.Home.route) },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp),
                colors = ButtonDefaults.buttonColors(backgroundColor = Color.Black)

            ) {
                Text(
                    text = "Masuk",
                    color = Color.White
                )
            }
        }
    }
}
