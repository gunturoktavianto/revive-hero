import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
      <div className="container flex h-14 items-center ">
        <Link href="/" className="flex items-center">
          <Image
            src="/navbar.png"
            alt="Revive Hero Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <Link
            href="/qr-scan"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            QR Scan
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
