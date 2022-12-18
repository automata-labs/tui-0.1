import { createCookieSessionStorage } from '@remix-run/node';
import { isTheme } from '~/contexts/theme';
import type { Theme } from '~/contexts/theme';

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: 'color-theme',
    encode: (value) => value,
    secure: false,
    // secrets: ['keyboardcat'],
    // sameSite: 'lax',
    // path: '/',
    // httpOnly: true,
  },
});

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get('Cookie'));

  return {
    getTheme: () => {
      const theme = session.get('theme');
      return isTheme(theme) ? theme : null;
    },
    setTheme: (theme: Theme) => {
      return session.set('theme', theme);
    },
    commit: () => {
      return themeStorage.commitSession(session);
    },
  };
}
