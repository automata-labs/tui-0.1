import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { NavigationBar } from './components/navigation-bar';
import { ThemeProvider, useTheme } from '~/contexts/theme';
import { Providers } from '~/providers';
import { getThemeSession } from './servers/theme.server';
import global from '~/styles/global.css';
import modal from '~/styles/modal.css';
import reset from '~/styles/reset.css';
import shared from '~/styles/shared.css';
import themes from '~/styles/themes.css';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { Theme } from '~/contexts/theme';
import Launcher from './components/launcher';

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
    { rel: 'stylesheet', href: modal },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
    // },
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
        <Providers env={env}>
          <NavigationBar />

          <div className="root-content">
            <Outlet />
          </div>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
          <Launcher />
        </Providers>
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
