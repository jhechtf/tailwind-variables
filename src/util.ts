export function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, (whole, lower, upper) => {
    return `${lower}-${upper.toLowerCase()}`;
  });
}

export function pick<T extends unknown, K = string>(obj: T, keys: K[]): { [] }