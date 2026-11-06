import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="AnaliticMed">
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">A</span>
      <span className="text-xl font-bold tracking-tight">
        Analitic<span className="text-primary">Med</span>
      </span>
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
