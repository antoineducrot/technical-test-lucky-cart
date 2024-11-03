type Value = string | number;

const isValue = (candidate: unknown): candidate is Value => {
  return typeof candidate === "string" || typeof candidate === "number";
};

export type { Value };
export { isValue };
