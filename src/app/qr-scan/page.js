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

    // Set fixed BPM to 110 (middle of 100-120 range)
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
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800 mb-4">
                  Segera hubungi bantuan darurat untuk mendapatkan pertolongan
                  medis profesional
                </p>
                <div className="flex items-center justify-center gap-2 text-lg font-bold text-yellow-800">
                  <Phone className="h-6 w-6" />
                  <span>112</span>
                </div>
              </div>

              <div className="bg-muted/10 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-sm">Lokasi Saat Ini:</h4>
                <p className="text-sm text-muted-foreground">
                  Jl. Cisitu Indah 4 No.14, Dago, Kecamatan Coblong, Kota
                  Bandung, Jawa Barat 40135
                </p>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg mt-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.1935258095245!2d107.61343629999999!3d-6.8775397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6f8d5c37be3%3A0x4e8e3e5c2f7ed9d2!2sJl.%20Cisitu%20Indah%204%20No.14%2C%20Dago%2C%20Kecamatan%20Coblong%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040135!5e0!3m2!1sen!2sid!4v1710425547959!5m2!1sen!2sid"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Jika memungkinkan, minta orang lain untuk menghubungi bantuan
                darurat sementara Anda melanjutkan pertolongan
              </p>
              <div className="flex flex-col gap-2">
                <Button className="w-full" onClick={handleNext}>
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

      case "chest-compression":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30x</div>
              <p className="text-sm text-muted-foreground">
                Lakukan kompresi dada sebanyak 30 kali dengan mengikuti irama
                sound di bawah!
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => (isPlaying ? stopMetronome() : startMetronome())}
              >
                {isPlaying ? (
                  <>
                    <VolumeX className="h-4 w-4 mr-2" /> Stop Panduan Ritme
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 mr-2" /> Mulai Panduan Ritme
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-4 bg-primary/5 rounded-lg p-4">
              <h4 className="font-semibold">Cara Melakukan Kompresi Dada:</h4>
              <div className="mt-4 relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src="/cpr.jpg"
                  alt="Cara melakukan kompresi dada"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Baringkan tubuh korban di atas permukaan yang keras dan datar
                </li>
                <li>Berlutut di samping leher dan bahu korban</li>
                <li>
                  Letakkan satu telapak tangan di bagian tengah dada korban (di
                  antara kedua payudara)
                </li>
                <li>Posisikan telapak tangan lain di atas tangan pertama</li>
                <li>Pastikan siku lurus dan bahu tepat di atas tangan</li>
                <li>
                  Tekan dada dengan kecepatan 100-120 kali per menit (1-2
                  tekanan per detik)
                </li>
                <li>Gunakan kekuatan tubuh bagian atas, bukan hanya lengan</li>
              </ol>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  stopMetronome();
                  handleNext();
                }}
              >
                Sudah Selesai 30x Kompresi
              </Button>
              <Button variant="outline" onClick={handleBack} className="w-full">
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
        <div className="text-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
          <h3 className="text-xl font-semibold">Protokol Selesai</h3>
          <p className="text-muted-foreground mb-4">
            Terima kasih atas tindakan cepatmu! Kamu baru saja memberikan
            harapan dan kesempatan hidup bagi seseorang. Bantuan darurat sedang
            dalam perjalanan, tetap tenang dan pantau kondisi pasien.
          </p>
          <div className="bg-muted/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Total waktu penanganan:
            </p>
            <div className="text-2xl font-bold">{formatTime(finalTime)}</div>
          </div>
          <p className="text-sm text-primary mt-4">
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
    <div className="container p-8">
      <div className="max-w-md mx-auto relative">
        <div className="absolute -top-4 right-0 flex items-center gap-2 text-sm">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Timer className="h-4 w-4" />
              <span>{formatTime(elapsedTime)}</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">Protokol Penanganan Darurat</h1>
        <Card className="p-6 space-y-6">
          {!showResult ? (
            <>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                  {steps[currentStep].title}
                </h2>
                <p className="text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </div>

              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-right text-muted-foreground">
                  {Math.round(progress)}% Selesai
                </p>
              </div>

              {renderStepContent()}
            </>
          ) : (
            renderResult()
          )}
        </Card>
      </div>
    </div>
  );
}
