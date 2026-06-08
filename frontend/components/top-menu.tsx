import Link from "next/link";

export function TopMenu() {
  return (
    <header className="border-b border-primary bg-primary text-primary-foreground">
      <div className="flex h-14 w-full items-center px-6">
        <Link className="text-sm font-semibold tracking-tight text-primary-foreground hover:opacity-80" href="/">
          Landing
        </Link>
      </div>
    </header>
  );
}
