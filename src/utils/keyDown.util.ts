import type { KeyboardEvent } from 'react';

export const onKey = <T extends HTMLElement = HTMLElement>(
  key: string | string[],
  callback: (e: KeyboardEvent<T>) => void
) => {
  const keys = Array.isArray(key) ? key : [key];

  return (e: KeyboardEvent<T>) => {
    if (keys.includes(e.key)) {
      e.preventDefault();
      callback(e);
    }
  };
};
