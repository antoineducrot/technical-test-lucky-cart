import {
  ArrayComparisonOperator,
  ComparisonOperator,
  LogicalOperator,
} from "./operator.type";
import { Value } from "./value.type";

type Condition =
  | (
      | {
          [key in ArrayComparisonOperator]?: Value[];
        }
      | {
          [key in ComparisonOperator]?: Value;
        }
      | {
          [key in LogicalOperator]?: Condition;
        }
    )
  | Value;

export type { Condition };
