import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen container">
      <Header />
      <main>
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-thin accent proto mb-4">
              Page Not Found
            </h1>
            <p className="font-thin mb-8">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--accent)] rounded hover:bg-white hover:text-black transition-colors duration-300"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
