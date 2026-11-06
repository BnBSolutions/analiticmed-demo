import { AppLink as Link } from "@/lib/router";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoAsset from "@/assets/analiticmed-logo.png.asset.json";

export function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center" aria-label="AnaliticMed">
      <img src={import.meta.env.BASE_URL.replace(/\/$/, "") + logoAsset.url} alt="AnaliticMed" width={1730} height={425} className="h-auto w-44 object-contain sm:w-52" />
    </Link>
  );
}

export function Section({ children, alt = false, id }: { children: ReactNode; alt?: boolean; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const section = ref.current;
    if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} id={id} data-revealed={revealed} className={`section-motion py-14 md:py-20 ${alt ? "bg-surface" : ""}`}>
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
