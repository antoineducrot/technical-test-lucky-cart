import { Value } from "./value.type";

type CartValue = {
  [key: string]: CartValue | Value | CartValue[];
};

type Cart = CartValue;

export type { Cart };
