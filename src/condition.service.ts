import { Condition } from "./types/condition.type";
import {
  ArrayComparisonOperator,
  ComparisonOperator,
  LogicalOperator,
} from "./types/operator.type";
import { isValue, Value } from "./types/value.type";

type ArrayExpression = [ArrayComparisonOperator, Value[]];

type ComparisonExpression = [ComparisonOperator, Value];

type LogicalExpression = [LogicalOperator, Condition];

type Expression = ArrayExpression | ComparisonExpression | LogicalExpression;

class ConditionService {
  private static in(evaluated: Value, value: Value[]): boolean {
    return value.includes(evaluated);
  }

  private static and(evaluated: Value, condition: Condition): boolean {
    let expressions: Expression[] = Object.entries(condition) as Expression[];

    return expressions.every((expression) =>
      this.executeOperator(evaluated, expression)
    );
  }

  private static or(evaluated: Value, condition: Condition): boolean {
    let expressions: Expression[] = Object.entries(condition) as Expression[];

    return expressions.some((expression) =>
      this.executeOperator(evaluated, expression)
    );
  }

  private static eq(evaluated: Value, value: Value): boolean {
    return evaluated == value;
  }

  private static lt(evaluated: Value, value: Value): boolean {
    return evaluated < value;
  }

  private static lte(evaluated: Value, value: Value): boolean {
    return evaluated <= value;
  }

  private static gt(evaluated: Value, value: Value): boolean {
    return evaluated > value;
  }

  private static gte(evaluated: Value, value: Value): boolean {
    return evaluated >= value;
  }

  private static executeOperator(
    evaluated: Value,
    expression: Expression
  ): boolean {
    const [operator, value] = expression;

    switch (operator) {
      case "in":
        return this.in(evaluated, value);
      case "and":
        return this.and(evaluated, value);
      case "or":
        return this.or(evaluated, value);
      case "eq":
        return this.eq(evaluated, value);
      case "lt":
        return this.lt(evaluated, value);
      case "lte":
        return this.lte(evaluated, value);
      case "gt":
        return this.gt(evaluated, value);
      case "gte":
        return this.gte(evaluated, value);
      default:
        return false;
    }
  }

  static evaluate(evaluated: Value, condition: Condition): boolean {
    if (isValue(condition) && !Array.isArray(evaluated)) {
      return this.eq(evaluated, condition);
    }

    return this.and(evaluated, condition);
  }
}

export { ConditionService };
export type { Condition };
