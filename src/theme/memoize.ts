export default function memoize<ReturnType>(
  fn: (arg: string) => ReturnType,
): (arg: string) => ReturnType {
  const cache: Record<string, ReturnType> = {};

  return (arg: string) => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}
