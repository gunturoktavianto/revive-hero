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
  LucideIcon,
} from "lucide-react";

interface Feature {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <QrCode className="h-6 w-6" />,
    title: "QR Code Akses Cepat",
    description: "Scan QR code untuk panduan CPR dan informasi medis darurat",
  },
  {
    icon: <AlertCircle className="h-6 w-6" />,
    title: "Alert Otomatis",
    description: "Deteksi jatuh dan kondisi darurat secara otomatis",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Panggilan Darurat",
    description: "Hubungi ambulans dan kontak darurat secara otomatis",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Respon Cepat",
    description: "Panduan langkah demi langkah untuk penanganan darurat",
  },
  {
    icon: <UserCircle2 className="h-6 w-6" />,
    title: "Profil Medis",
    description: "Simpan riwayat medis dan informasi penting lainnya",
  },
  {
    icon: <Heart className="h-6 w-6" />,
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
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

interface FeatureCardProps extends Feature {
  className?: string;
}

function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      className={`p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-to-b from-primary/5 to-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Revive Hero
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistem respons darurat pintar yang menyelamatkan nyawa dengan
            deteksi otomatis, panduan CPR, dan kontak darurat cepat.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="font-semibold">
                Daftar Sekarang
              </Button>
            </Link>
            <Link href="/qr-scan">
              <Button size="lg" variant="outline" className="font-semibold">
                Demo QR Scan
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-primary/5">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Menyelamatkan Nyawa?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan Revive Hero dan jadilah bagian dari sistem
            respons darurat yang lebih cepat dan efektif.
          </p>
          <Link href="/qr-scan">
            <Button size="lg" className="font-semibold">
              Mulai Demo QR Scan Sekarang
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
