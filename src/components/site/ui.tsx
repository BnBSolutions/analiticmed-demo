import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import logoAsset from "@/assets/analiticmed-logo.png.asset.json";

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="AnaliticMed">
      <img src={logoAsset.url} alt="AnaliticMed" width={1730} height={425} className="h-auto w-44 object-contain sm:w-52" />
    </Link>
  );
}

export function Section({ children, alt = false, id }: { children: ReactNode; alt?: boolean; id?: string }) {
  return (
    <section id={id} className={`py-14 md:py-20 ${alt ? "bg-surface" : ""}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl md:text-3xl">{title}</h2>
        {sub && <p className="mt-2 max-w-2xl text-muted-foreground">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Arrow() {
  return <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden />;
}

export function PageHeader({ title, sub, crumb }: { title: string; sub?: string; crumb: string }) {
  return (
    <div className="bg-surface py-10 md:py-14">
      <div className="container-site">
        <p className="text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">AnaliticMed</Link> / {crumb}
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}
