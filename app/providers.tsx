import { CenterProvider } from '@center-inc/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { KernelProvider } from './contexts/kernel';
import { SearchParamsProvider } from './contexts/search-params';
import { SpinnerProvider } from './contexts/spinner';

const client = new QueryClient();

type ProvidersProps = {
  children: React.ReactNode;
  env: {
    CENTER_KEY: string;
  };
};

export function Providers({ children, env }: ProvidersProps) {
  return (
    <QueryClientProvider client={client}>
      <CenterProvider
        network="ethereum-mainnet"
        mode="production"
        apiKey={env.CENTER_KEY}
      >
        <SpinnerProvider>
          <KernelProvider>{children}</KernelProvider>
        </SpinnerProvider>
      </CenterProvider>
    </QueryClientProvider>
  );
}
