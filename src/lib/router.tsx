import {
  Link as RouterLink,
  NavLink,
  resolvePath,
  useLocation,
  useNavigate as useRouterNavigate,
} from "react-router-dom";
import type { ComponentProps } from "react";
import type { NavigateOptions, To } from "react-router-dom";

type AppLinkProps = ComponentProps<typeof RouterLink> & {
  preserveLanguage?: boolean;
};
type AppNavLinkProps = ComponentProps<typeof NavLink> & {
  preserveLanguage?: boolean;
};

function withLanguage(to: To, pathname: string, search: string, preserveLanguage: boolean): To {
  const lang = preserveLanguage ? new URLSearchParams(search).get("lang") : null;
  if (lang !== "ru") {
    return to;
  }

  const resolved = resolvePath(to, pathname);
  const nextSearch = new URLSearchParams(resolved.search);
  if (!nextSearch.has("lang")) {
    nextSearch.set("lang", lang);
  }
  return { ...resolved, search: `?${nextSearch.toString()}` };
}

export function AppLink({ to, preserveLanguage, ...props }: AppLinkProps) {
  const location = useLocation();
  return (
    <RouterLink
      {...props}
      to={withLanguage(to, location.pathname, location.search, preserveLanguage !== false)}
    />
  );
}

export function AppNavLink({ to, preserveLanguage, ...props }: AppNavLinkProps) {
  const location = useLocation();
  return (
    <NavLink
      {...props}
      to={withLanguage(to, location.pathname, location.search, preserveLanguage !== false)}
    />
  );
}

export function useAppNavigate() {
  const navigate = useRouterNavigate();
  const location = useLocation();

  return (to: To, options?: NavigateOptions) =>
    navigate(withLanguage(to, location.pathname, location.search, true), options);
}
