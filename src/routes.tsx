import { useEffect, type ReactNode } from "react";
import { isRouteErrorResponse, Outlet, useRevalidator, useRouteError } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Page as CheckUpPage } from "@/routes/check-up";
import { Page as ContactPage } from "@/routes/contacte";
import { Page as AboutPage } from "@/routes/despre-clinica";
import { Page as GuidePage } from "@/routes/ghidul-pacientului";
import { Page as LabPage } from "@/routes/laborator";
import { Page as DoctorsPage } from "@/routes/medici";
import { Page as NewsPage } from "@/routes/noutati";
import { Index } from "@/routes/index";
import { Page as ServicePage } from "@/routes/servicii.$slug";
import { Page as ServicesPage } from "@/routes/servicii.index";
import { diagnostics } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { reportLovableError } from "@/lib/lovable-error-reporting";

function RootLayout() {
  const lang = useLang();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href={import.meta.env.BASE_URL}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

function ErrorPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">{children}</div>
    </div>
  );
}

function RouterErrorBoundary() {
  const error = useRouteError();
  const revalidator = useRevalidator();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  useEffect(() => {
    if (isNotFound) return;
    console.error(error);
    reportLovableError(error, { boundary: "react_router_error_boundary" });
  }, [error, isNotFound]);

  if (isNotFound) {
    return <NotFoundPage />;
  }

  return (
    <ErrorPage>
      <h1 className="text-xl font-semibold tracking-tight text-foreground">
        This page didn't load
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Something went wrong on our end. You can try refreshing or head back home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => revalidator.revalidate()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Try again
        </button>
        <a
          href={import.meta.env.BASE_URL}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Go home
        </a>
      </div>
    </ErrorPage>
  );
}

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RouterErrorBoundary />,
    children: [
      { index: true, element: <Index /> },
      { path: "check-up", element: <CheckUpPage /> },
      { path: "contacte", element: <ContactPage /> },
      { path: "despre-clinica", element: <AboutPage /> },
      { path: "ghidul-pacientului", element: <GuidePage /> },
      { path: "laborator", element: <LabPage /> },
      { path: "medici", element: <DoctorsPage /> },
      { path: "noutati", element: <NewsPage /> },
      { path: "servicii", element: <ServicesPage /> },
      {
        path: "servicii/:slug",
        loader: ({ params }: LoaderFunctionArgs) => {
          if (!diagnostics.some((service) => service.slug === params["slug"])) {
            throw new Response("Service not found", { status: 404 });
          }
          return null;
        },
        element: <ServicePage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
