import Fuse from 'fuse.js';
import { useRef } from 'react';

export default function useCommands(prompt: string, initial: any) {
  const indexed = initial.map((value: any, i: number) => ({...value, id: i }));
  const fuse = useRef(new Fuse(indexed, { keys: ['text'], threshold: 0.45 }));
  const filtered = fuse.current.search(prompt).map((result: any, i: number) => {
    return { ...result?.item, id: i };
  });
  const commands = prompt ? filtered : indexed;

  return { commands };
}
