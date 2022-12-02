import { useDeepCompareEffect } from '@react-hookz/web';
import { useLauncher } from '~/contexts/launcher';

type BreadcrumbProps = {
  data: any;
};

export default function Breadcrumb({ data }: BreadcrumbProps) {
  const { setBreadcrumbs } = useLauncher() as any;

  useDeepCompareEffect(() => {
    setBreadcrumbs(data);
  }, [data]);

  return <></>;
}
