"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer,
  Volume2,
  VolumeX,
  Phone,
} from "lucide-react";

const steps = [
  {
    id: "check-breathing",
    title: "Cek Nafas",
    description: "Kepala didongakkan",
    action:
      "Periksa nafas pasien dengan melihat dada dan merasakan hembusan nafas",
  },
  {
    id: "breathing-status",
    title: "Status Nafas",
    description: "Korban tidak bernafas atau nafas tersengal-sengal",
    options: [
      { label: "Tidak Bernafas/Tersengal", value: "abnormal" },
      { label: "Normal", value: "normal" },
    ],
    action:
      "Periksa nafas pasien dengan melihat dada dan merasakan hembusan nafas",
  },
  {
    id: "emergency-call",
    title: "Hubungi 112",
    description: "Minta bantuan darurat segera",
    action: "Hubungi 112 untuk mendapatkan bantuan medis darurat",
  },
  {
    id: "chest-compression",
    title: "Pijat Jantung",
    description: "Lakukan 30x pijat jantung",
  },
  {
    id: "check-pulse",
    title: "Raba Nadi Karotis",
    description: "Periksa denyut nadi di leher",
    options: [
      { label: "Teraba", value: "detected" },
      { label: "Tidak Teraba", value: "not-detected" },
    ],
  },
];

export default function QRScanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [breathingStatus, setBreathingStatus] = useState(null);
  const [pulseStatus, setPulseStatus] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [finalTime, setFinalTime] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  const progress = (currentStep / steps.length) * 100;

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setElapsedTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      // Reset states when going back
      if (currentStep === 1) setBreathingStatus(null);
      if (currentStep === 2) stopMetronome();
      if (currentStep === 3) setPulseStatus(null);
      setShowEmergencyCall(false);
    }
  }

  function handleBreathingStatus(status) {
    setBreathingStatus(status);
    if (status === "normal") {
      setShowEmergencyCall(true);
    } else {
      handleNext();
    }
  }

  function handlePulseStatus(status) {
    setPulseStatus(status);
    if (status === "detected") {
      setIsActive(false);
      setFinalTime(elapsedTime);
    }
    handleNext();
  }

  function startMetronome() {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const interval = 60 / 120;
    let time = audioContext.currentTime;

    for (let i = 0; i < 100; i++) {
      gainNode.gain.setValueAtTime(0.5, time);
      gainNode.gain.setValueAtTime(0, time + 0.1);
      time += interval;
    }

    oscillator.start();
    oscillatorRef.current = oscillator;
    setIsPlaying(true);
  }

  function stopMetronome() {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current = null;
    }
    setIsPlaying(false);
  }

  function renderStepContent() {
    const currentStepData = steps[currentStep];

    switch (currentStepData.id) {
      case "check-breathing":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <p>{currentStepData.action}</p>
            </div>
            <Button onClick={handleNext} className="w-full">
              Lanjut
            </Button>
          </div>
        );

      case "breathing-status":
        if (showEmergencyCall) {
          return (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-xl font-semibold">
                  Nafas Normal Terdeteksi
                </h3>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 mb-4">
                    Meskipun nafas normal, tetap hubungi bantuan darurat untuk
                    pemeriksaan lebih lanjut
                  </p>
                  <div className="flex items-center justify-center gap-2 text-lg font-bold text-yellow-800">
                    <Phone className="h-6 w-6" />
                    <span>112</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setIsActive(false);
                      setFinalTime(elapsedTime);
                      setShowResult(true);
                    }}
                  >
                    Sudah Menghubungi 112
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full"
                  >
                    Kembali
                  </Button>
                </div>
              </div>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-600">
              <AlertCircle className="h-5 w-5" />
              <p>{currentStepData.action}</p>
            </div>
            {currentStepData.options.map((option) => (
              <Button
                key={option.value}
                variant={
                  breathingStatus === option.value ? "default" : "outline"
                }
                className="w-full"
                onClick={() => handleBreathingStatus(option.value)}
              >
                {option.label}
              </Button>
            ))}
            <Button variant="outline" onClick={handleBack} className="w-full">
              Kembali
            </Button>
          </div>
        );

      case "emergency-call":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="bg-yellow-50/80 backdrop-blur p-6 rounded-2xl border border-yellow-100/50">
                <p className="text-yellow-800 mb-4 font-medium">
                  Segera hubungi bantuan darurat untuk mendapatkan pertolongan
                  medis profesional
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100/50 rounded-full text-lg font-bold text-yellow-800">
                  <Phone className="h-6 w-6" />
                  <span>112</span>
                </div>
              </div>

              <div className="bg-muted/5 p-6 rounded-2xl border border-muted/10 space-y-4">
                <h4 className="font-medium">Lokasi Saat Ini:</h4>
                <p className="text-muted-foreground">
                  Jl. Cisitu Indah 4 No.14, Dago, Kecamatan Coblong, Kota
                  Bandung, Jawa Barat 40135
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1935258095245!2d107.61343629999999!3d-6.8775397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6f8d5c37be3%3A0x4e8e3e5c2f7ed9d2!2sJl.%20Cisitu%20Indah%204%20No.14%2C%20Dago%2C%20Kecamatan%20Coblong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040135!5e0!3m2!1sen!2sid!4v1710425547959!5m2!1sen!2sid"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">
                Jika memungkinkan, minta orang lain untuk menghubungi bantuan
                darurat sementara Anda melanjutkan pertolongan
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleNext}
                >
                  Sudah Menghubungi 112
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="w-full border-primary/20 hover:bg-primary/5 transition-all duration-300"
                >
                  Kembali
                </Button>
              </div>
            </div>
          </div>
        );

      case "chest-compression":
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-primary mb-4">30x</div>
              <p className="text-muted-foreground">
                Lakukan kompresi dada sebanyak 30 kali dengan mengikuti irama
                sound di bawah!
              </p>
              <Button
                variant="outline"
                size="lg"
                className="mt-2 border-primary/20 hover:bg-primary/5 transition-all duration-300"
                onClick={() => (isPlaying ? stopMetronome() : startMetronome())}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="h-5 w-5 mr-2" /> Stop Panduan Ritme
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5 mr-2" /> Mulai Panduan Ritme
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-6 bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h4 className="font-semibold text-lg">
                Cara Melakukan Kompresi Dada:
              </h4>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/cpr.jpg"
                  alt="Cara melakukan kompresi dada"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
                <li className="hover:text-foreground transition-colors">
                  Baringkan tubuh korban di atas permukaan yang keras dan datar
                </li>
                <li className="hover:text-foreground transition-colors">
                  Berlutut di samping leher dan bahu korban
                </li>
                <li className="hover:text-foreground transition-colors">
                  Letakkan satu telapak tangan di bagian tengah dada korban (di
                  antara kedua payudara)
                </li>
                <li className="hover:text-foreground transition-colors">
                  Posisikan telapak tangan lain di atas tangan pertama
                </li>
                <li className="hover:text-foreground transition-colors">
                  Pastikan siku lurus dan bahu tepat di atas tangan
                </li>
                <li className="hover:text-foreground transition-colors">
                  Tekan dada dengan kecepatan 100-120 kali per menit (1-2
                  tekanan per detik)
                </li>
                <li className="hover:text-foreground transition-colors">
                  Gunakan kekuatan tubuh bagian atas, bukan hanya lengan
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  stopMetronome();
                  handleNext();
                }}
              >
                Sudah Selesai 30x Kompresi
              </Button>
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full border-primary/20 hover:bg-primary/5 transition-all duration-300"
              >
                Kembali
              </Button>
            </div>
          </div>
        );

      case "check-pulse":
        return (
          <div className="space-y-4">
            {currentStepData.options.map((option) => (
              <Button
                key={option.value}
                variant={pulseStatus === option.value ? "default" : "outline"}
                className="w-full"
                onClick={() => handlePulseStatus(option.value)}
              >
                {option.label}
              </Button>
            ))}
            <Button variant="outline" onClick={handleBack} className="w-full">
              Kembali
            </Button>
          </div>
        );

      default:
        return null;
    }
  }

  function renderResult() {
    if (!showResult) return null;

    if (breathingStatus === "normal") {
      return (
        <div className="text-center space-y-6 animate-in fade-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/10 blur-xl rounded-full"></div>
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto relative" />
          </div>
          <h3 className="text-2xl font-semibold">Protokol Selesai</h3>
          <p className="text-muted-foreground leading-relaxed">
            Terima kasih atas tindakan cepatmu! Kamu baru saja memberikan
            harapan dan kesempatan hidup bagi seseorang. Bantuan darurat sedang
            dalam perjalanan, tetap tenang dan pantau kondisi pasien.
          </p>
          <div className="bg-muted/5 rounded-2xl p-6 border border-muted/10">
            <p className="text-sm text-muted-foreground mb-2">
              Total waktu penanganan:
            </p>
            <div className="text-3xl font-bold text-primary">
              {formatTime(finalTime)}
            </div>
          </div>
          <p className="text-sm text-primary font-medium">
            Kamu adalah pahlawan hari ini! ❤️
          </p>
        </div>
      );
    }

    if (pulseStatus === "detected") {
      return (
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold">Berhasil! Nadi Terdeteksi</h3>
          <p className="text-muted-foreground mb-4">
            Usaha kerasmu membuahkan hasil! Nadi telah terdeteksi, hentikan
            kompresi dada dan terus pantau kondisi pasien. Tindakanmu sangat
            berarti untuk menyelamatkan nyawa.
          </p>
          <div className="bg-muted/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Total waktu penanganan:
            </p>
            <div className="text-2xl font-bold">{formatTime(finalTime)}</div>
          </div>
          <p className="text-sm text-primary mt-4">
            Setiap detik usahamu sangat berharga! 💪
          </p>
        </div>
      );
    }

    return (
      <div className="text-center space-y-4">
        <XCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h3 className="text-xl font-semibold">Lanjutkan Perjuangan!</h3>
        <p className="text-muted-foreground">
          Jangan menyerah! Lakukan 2x tiupan nafas, lalu lanjutkan 30 kompresi
          dada. Setiap usahamu memberi harapan hidup.
        </p>
        <Button
          onClick={() => {
            setCurrentStep(2);
            setShowResult(false);
            setIsActive(true);
          }}
        >
          Mulai Ulang Kompresi
        </Button>
        <p className="text-sm text-primary mt-2">
          Tetap fokus dan semangat! 💪
        </p>
      </div>
    );
  }

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 py-12 px-4 mt-8">
      <div className="max-w-md mx-auto relative">
        <h1 className="text-3xl font-bold text-center ">
          Protokol Penanganan Darurat
        </h1>

        <div className="flex justify-center mt-4 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full shadow-sm">
            <Timer className="h-4 w-4 text-primary" />
            <span className="font-medium">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        <Card className="p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-primary/10">
          {!showResult ? (
            <>
              <div className="space-y-3 mb-8">
                <h2 className="text-2xl font-semibold text-center">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground text-center">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="space-y-2 mb-8">
                <Progress value={progress} className="h-2 bg-primary/10" />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    Langkah {currentStep + 1} dari {steps.length}
                  </span>
                  <span>{Math.round(progress)}% Selesai</span>
                </div>
              </div>

              <div className="relative">{renderStepContent()}</div>
            </>
          ) : (
            <div className="animate-in fade-in duration-500">
              {renderResult()}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}