import Command from '~/components/terminal/command';
import { useKernel } from '~/contexts/kernel';
import useCommands from '~/hooks/useCommands';

export default function Sources() {
  const { prompt } = useKernel() as any;

  const { commands } = useCommands(
    prompt,
    [
      {
        kind: 'radio-default',
        icon: 'eth',
        text: 'Price: Low to High',
        args: {
          params: [
            { key: 'sortBy' },
            { key: 'sortDirection' },
          ],
        },
      },
      {
        kind: 'radio',
        icon: 'eth',
        text: 'Price: High to Low',
        args: {
          params: [
            { key: 'sortBy', value: 'floorAskPrice' },
            { key: 'sortDirection', value: 'desc' },
          ],
        },
      },
      {
        kind: 'radio',
        icon: 'number',
        text: 'Token ID: Low to High',
        args: {
          params: [
            { key: 'sortBy', value: 'tokenId' },
            { key: 'sortDirection', value: 'asc' },
          ],
        },
      },
      {
        kind: 'radio',
        icon: 'number',
        text: 'Token ID: High to Low',
        args: {
          params: [
            { key: 'sortBy', value: 'tokenId' },
            { key: 'sortDirection', value: 'desc' },
          ],
        },
      },
      {
        kind: 'radio',
        icon: 'feed-star',
        text: 'Rarity: Top to Bottom',
        args: {
          params: [
            { key: 'sortBy', value: 'rarity' },
            { key: 'sortDirection', value: 'asc' },
          ],
        },
      },
      {
        kind: 'radio',
        icon: 'feed-star',
        text: 'Rarity: Bottom to Top',
        args: {
          params: [
            { key: 'sortBy', value: 'rarity' },
            { key: 'sortDirection', value: 'desc' },
          ],
        },
      },
    ]
  );

  return (
    <>
      {commands.map((command: any, i: number) => (
        <Command key={i} command={command} />
      ))}
    </>
  );
}
