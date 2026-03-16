export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <pre className="text-accent text-xs leading-tight mb-6 select-none">{`
  _  _    ___  _  _
 | || |  / _ \\| || |
 | || |_| | | | || |_
 |__   _| | | |__   _|
    | | | |_| |  | |
    |_|  \\___/   |_|
`}</pre>
      <p className="text-sm text-muted mb-6">page not found</p>
      <a href="/" className="text-xs text-accent hover:text-fg transition-colors">
        &larr; home
      </a>
    </main>
  );
}
