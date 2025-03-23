import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  QrCode,
  AlertCircle,
  Phone,
  Clock,
  UserCircle2,
  Shield,
  Activity,
  Zap,
  Star,
  Sparkles,
  LifeBuoy,
} from "lucide-react";

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <QrCode className="h-6 w-6 text-black" />,
    title: "QR Code Akses Cepat",
    description: "Scan QR code untuk panduan CPR dan informasi medis darurat",
  },
  {
    icon: <AlertCircle className="h-6 w-6 text-black" />,
    title: "Alert Otomatis",
    description: "Deteksi jatuh dan kondisi darurat secara otomatis",
  },
  {
    icon: <Phone className="h-6 w-6 text-black" />,
    title: "Panggilan Darurat",
    description: "Hubungi ambulans dan kontak darurat secara otomatis",
  },
  {
    icon: <Clock className="h-6 w-6 text-black" />,
    title: "Respon Cepat",
    description: "Panduan langkah demi langkah untuk penanganan darurat",
  },
  {
    icon: <UserCircle2 className="h-6 w-6 text-black" />,
    title: "Profil Medis",
    description: "Simpan riwayat medis dan informasi penting lainnya",
  },
  {
    icon: <Heart className="h-6 w-6 text-black" />,
    title: "Panduan CPR",
    description: "Instruksi CPR yang jelas dan mudah diikuti",
  },
];

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      {/* Elegant Background Elements */}
      <div className="fixed inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Decorative Icons Background */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-[0.04] pointer-events-none">
        <div className="absolute top-[10%] left-[5%] animate-pulse-slow">
          <Heart className="h-16 w-16 text-black" />
        </div>
        <div className="absolute top-[30%] right-[8%] animate-float">
          <Shield className="h-20 w-20 text-black" />
        </div>
        <div className="absolute bottom-[15%] left-[12%] animate-spin-slow">
          <Activity className="h-24 w-24 text-black" />
        </div>
        <div className="absolute top-[60%] right-[15%] animate-pulse-slow">
          <Zap className="h-16 w-16 text-black" />
        </div>
        <div className="absolute bottom-[35%] left-[25%] animate-float">
          <Star className="h-12 w-12 text-black" />
        </div>
        <div className="absolute top-[45%] left-[60%] animate-spin-slow">
          <Sparkles className="h-14 w-14 text-black" />
        </div>
        <div className="absolute bottom-[25%] right-[25%] animate-pulse-slow">
          <LifeBuoy className="h-18 w-18 text-black" />
        </div>
        <div className="absolute top-[15%] left-[40%] animate-float">
          <QrCode className="h-10 w-10 text-black" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-[70vh] overflow-hidden z-0">
        <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-br from-black/5 to-transparent blur-3xl" />
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[100%] rounded-full bg-gradient-to-bl from-black/5 to-transparent blur-3xl" />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-black/3 blur-3xl animate-pulse-slow" />
      </div>

      {/* Elegant Patterns */}
      <div className="fixed inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      </div>

      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="relative">
          <div className="text-center max-w-3xl mx-auto px-4">
            <div className="mb-4 inline-block">
              <span className="text-sm font-medium bg-black/5 text-black px-3 py-1 rounded-full">
                Sistem Darurat Pintar
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70">
              Revive Hero
            </h1>

            <p className="text-lg md:text-xl text-black mb-12 max-w-2xl mx-auto leading-relaxed">
              Sistem respons darurat pintar yang menyelamatkan nyawa dengan
              deteksi otomatis, panduan CPR, dan kontak darurat cepat.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-black hover:bg-black/90 text-white font-medium px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/10 hover:scale-105"
                >
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="/qr-scan">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black hover:bg-black/5 text-black font-medium px-8 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Demo QR Scan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section className="relative">
        {/* Elegant Background with Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-white backdrop-blur-xl" />

        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.03]" />

        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-black/2 blur-3xl" />
          <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-black/2 blur-3xl" />
        </div>

        {/* Decorative Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <div className="absolute top-[5%] left-[10%] animate-float">
            <Heart className="h-24 w-24 text-black" />
          </div>
          <div className="absolute bottom-[5%] right-[10%] animate-pulse-slow">
            <Shield className="h-24 w-24 text-black" />
          </div>
        </div>

        <div className="relative">
          <div className="text-center mb-16">
            <span className="text-sm font-medium bg-black/5 text-black px-3 py-1 rounded-full shadow-sm">
              Keunggulan Kami
            </span>
            <h2 className="text-3xl mt-4 font-bold text-black">Fitur Utama</h2>
            <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-black/40 to-transparent mx-auto mt-4 rounded-full opacity-60"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 border border-black/5 hover:border-black/10 bg-white backdrop-blur-xl hover:bg-white overflow-hidden transform hover:-translate-y-1"
              >
                {/* Card Highlight Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-black/2 to-transparent opacity-30" />
                </div>

                <div className="p-8 flex flex-col items-center text-center space-y-5 relative z-10">
                  {/* Icon Container with Enhanced Effects */}
                  <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white to-white/90 rounded-full opacity-80 group-hover:animate-pulse" />
                    <div className="absolute inset-0 rounded-full shadow-inner" />
                    <div className="relative z-10 transform group-hover:rotate-12 transition-transform duration-300">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg text-black group-hover:scale-105 transition-transform duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-black">{feature.description}</p>
                </div>

                {/* Bottom Highlight Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-black/5 via-black/20 to-black/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -bottom-[30%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-black/5 to-transparent blur-3xl" />
          <div className="absolute -bottom-[30%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tl from-black/5 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.02]" />
        </div>

        {/* Decorative Icons */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.03] pointer-events-none">
          <div className="absolute top-[15%] right-[15%] animate-float">
            <LifeBuoy className="h-20 w-20 text-black" />
          </div>
          <div className="absolute bottom-[15%] left-[15%] animate-pulse-slow">
            <Sparkles className="h-20 w-20 text-black" />
          </div>
        </div>

        <div className="relative p-10 md:p-14 rounded-3xl bg-white backdrop-blur-xl border border-black/10 shadow-2xl max-w-3xl mx-auto">
          {/* Enhanced Inner Glow */}
          <div className="absolute -z-10 inset-0 overflow-hidden rounded-3xl opacity-10">
            <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-black/10 blur-2xl" />
            <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-black/10 blur-2xl" />
          </div>

          {/* Subtle Border Highlight */}
          <div className="absolute inset-0 rounded-3xl border border-white/40 opacity-50" />

          {/* Content with Enhanced Styling */}
          <div className="text-center relative z-10">
            <span className="inline-block text-sm font-medium bg-black/5 text-black px-4 py-1.5 rounded-full mb-6 shadow-sm">
              Mulai Hari Ini
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/70">
              Siap Menyelamatkan Nyawa?
            </h2>

            <p className="text-lg text-black mb-10 max-w-2xl mx-auto leading-relaxed">
              Bergabunglah dengan Revive Hero dan jadilah bagian dari sistem
              respons darurat yang lebih cepat dan efektif.
            </p>

            <Link href="/qr-scan">
              <Button
                size="lg"
                className="bg-black hover:bg-black/90 text-white font-medium px-10 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-black/20 hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  <span>Mulai Demo QR Scan Sekarang</span>
                </div>
              </Button>
            </Link>

            {/* Decorative Element */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-black/20 to-transparent rounded-full" />
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="relative py-16 mt-auto">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-black text-white backdrop-blur-sm" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-[0.02]" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.02] pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white/5 to-transparent" />
          <div className="absolute top-[20%] left-[10%] animate-pulse-slow">
            <Heart className="h-16 w-16 text-white" />
          </div>
          <div className="absolute top-[20%] right-[10%] animate-float">
            <Shield className="h-16 w-16 text-white" />
          </div>
        </div>

        <div className="relative container mx-auto text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Logo Area */}
            <div className="relative">
              <div className="text-white font-semibold text-xl">
                Revive Hero
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
            </div>

            <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed">
              Sistem respons darurat pintar untuk meningkatkan keselamatan dan
              kesehatan masyarakat.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-4 my-2">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="w-5 h-5 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="w-5 h-5 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                </div>
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <div className="w-5 h-5 flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto my-4" />

            <div className="text-sm text-white/80">
              © 2025 Revive Hero. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 