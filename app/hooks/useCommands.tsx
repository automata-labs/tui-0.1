import Fuse from 'fuse.js';
import { useEffect } from 'react';
import { useKernel } from '~/contexts/kernel';

function identify(arr: Array<any>) {
  return arr.map((el, i) => ({ ...el, id: i }));
}

export default function useSchemaFilter(
  prompt: string,
  schema: Array<any>,
): {
  commands: Array<any>;
} {
  const { setCommands } = useKernel() as any;

  const fuse = new Fuse(schema, { keys: ['text'], threshold: 0.45 });
  const commands = prompt
    ? identify(fuse.search(prompt).map((item) => item.item))
    : identify(schema);

  useEffect(() => {
    if (commands.length > 0) {
      setCommands(commands);
    }
  }, [prompt, commands.length]);

  return { commands };
}
