import { BracketLink } from "@/components/ui/BracketLink";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <pre className="font-mono text-accent text-xs leading-tight mb-8 select-none">
{`
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═══██╗██║  ██║
 ███████║██║   ██║███████║
 ╚════██║██║   ██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝
`}
      </pre>
      <h1 className="font-pixel text-2xl mb-4">Page Not Found</h1>
      <p className="font-mono text-sm text-muted max-w-md text-center mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <BracketLink label="Home" shortcut="H" href="/" />
    </main>
  );
}
