plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.wearos_revivehero"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.wearos_revivehero"
        minSdk = 35
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"

    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
    buildFeatures {
        compose = true
    }
}

dependencies {

    implementation(libs.play.services.wearable)
    implementation(platform(libs.compose.bom))
    implementation(libs.ui)
    implementation(libs.ui.graphics)
    implementation(libs.ui.tooling.preview)
    implementation(libs.compose.material)
    implementation(libs.compose.foundation)
    implementation(libs.wear.tooling.preview)
    implementation(libs.activity.compose)
    implementation(libs.core.splashscreen)
    implementation(libs.material3.android)
    androidTestImplementation(platform(libs.compose.bom))
    androidTestImplementation(libs.ui.test.junit4)
    debugImplementation(libs.ui.tooling)
    debugImplementation(libs.ui.test.manifest)

    // QR code generation
    implementation ("androidx.compose.ui:ui:1.7.8")
    implementation ("androidx.wear.compose:compose-foundation:1.4.1")
    implementation ("androidx.wear.compose:compose-material:1.4.1")
    implementation ("androidx.wear.compose:compose-navigation:1.4.1")
    implementation ("androidx.navigation:navigation-compose:2.8.9")
    implementation ("androidx.activity:activity-compose:1.10.1")
    implementation ("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")

    // For QR code generation in Compose
    implementation ("com.google.zxing:core:3.5.3")
}