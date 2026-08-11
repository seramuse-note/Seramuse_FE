export const onEnter = (callback: () => void) => {
  return (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };
};
