import { LandingTitle } from "@/components/landing-title";

export const dynamic = "force-dynamic";

export default function LandingPage() {
  return (
    <main className="page justify-center">
      <section className="page-narrow surface stack">
        <LandingTitle />
      </section>
    </main>
  );
}
