import { useDeepCompareEffect } from '@react-hookz/web';
import { useTerminal } from '~/contexts/terminal';

type BreadcrumbProps = {
  data: any;
};

export default function Breadcrumb({ data }: BreadcrumbProps) {
  const { setBreadcrumbs } = useTerminal() as any;

  useDeepCompareEffect(() => {
    setBreadcrumbs(data);
  }, [data]);

  return <></>;
}
