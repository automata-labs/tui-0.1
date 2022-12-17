import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { MemoryRouter } from 'react-router-dom';

import { Providers } from '~/providers';
import { NavigationBar } from '~/components/navigation-bar';
import { ScrollRestoration } from '~/components/scroll-restoration';
import { SearchProvider } from '~/contexts/search';
import type { Theme } from '~/contexts/theme';
import { ThemeProvider, useTheme } from '~/contexts/theme';
import { getThemeSession } from '~/servers/theme.server';
import global from '~/styles/global.css';
import dialog from '~/styles/dialog.css';
import reset from '~/styles/reset.css';
import shared from '~/styles/shared.css';
import terminal from '~/styles/terminal.css';
import themes from '~/styles/themes.css';
import middleware from '~/styles/middleware.css';

export type LoaderData = {
  theme: Theme | null;
  env: {
    test: string;
    CENTER_KEY: string;
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  return json({
    theme: (await getThemeSession(request)).getTheme(),
    env: { CENTER_KEY: process.env.CENTER_KEY },
  });
};

export function links() {
  return [
    { rel: 'stylesheet', href: reset },
    { rel: 'stylesheet', href: global },
    { rel: 'stylesheet', href: shared },
    { rel: 'stylesheet', href: themes },
    { rel: 'stylesheet', href: terminal },
    { rel: 'stylesheet', href: dialog },
    { rel: 'stylesheet', href: middleware },
  ];
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export function App({ env }: any) {
  const [theme] = useTheme();

  return (
    <html lang="en" className={theme ?? ''}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MemoryRouter>
          <Providers env={env}>
            <SearchProvider>
              <NavigationBar />
            </SearchProvider>

            <div className="root-content">
              <Outlet />
            </div>

            <ScrollRestoration />
            <Scripts />
            <LiveReload />
          </Providers>
        </MemoryRouter>
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { theme, env } = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={theme}>
      <App env={env} />
    </ThemeProvider>
  );
}
