const LogicalOperators = {
  OR: "or",
  AND: "and",
} as const;

type LogicalOperator = (typeof LogicalOperators)[keyof typeof LogicalOperators];

const ComparisonOperators = {
  EQ: "eq",
  LT: "lt",
  LTE: "lte",
  GT: "gt",
  GTE: "gte",
} as const;

type ComparisonOperator =
  (typeof ComparisonOperators)[keyof typeof ComparisonOperators];

const ArrayComparisonOperators = {
  IN: "in",
} as const;

type ArrayComparisonOperator =
  (typeof ArrayComparisonOperators)[keyof typeof ArrayComparisonOperators];

const Operators = {
  ...LogicalOperators,
  ...ComparisonOperators,
  ...ArrayComparisonOperators,
} as const;

type Operator = LogicalOperator | ComparisonOperator | ArrayComparisonOperator;

export type {
  LogicalOperator,
  ComparisonOperator,
  ArrayComparisonOperator,
  Operator,
};

export {
  LogicalOperators,
  ComparisonOperators,
  ArrayComparisonOperators,
  Operators,
};
