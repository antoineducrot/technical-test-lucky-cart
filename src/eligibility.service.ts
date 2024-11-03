import { Condition, ConditionService } from "./condition.service";
import { Cart } from "./types/cart.type";
import { Criteria } from "./types/criteria.type";
import { isValue } from "./types/value.type";

class EligibilityService {
  private executeCondition(value: unknown, condition: Condition): boolean {
    if (isValue(value)) {
      return ConditionService.evaluate(value, condition);
    } else {
      return false;
    }
  }
  
  /**
   * Compare cart data with criteria to compute eligibility.
   * If all criteria are fulfilled then the cart is eligible (return true).
   *
   * @param cart
   * @param criteria
   * @return {boolean}
   */
  isEligible(cart: Cart, criteria: Criteria): boolean {
    return Object.entries(criteria)
      .map(([key, property]) => {
        const keys = key.split(".");

        if (keys.length > 1) {
          const value = cart[keys[0]];

          if (Array.isArray(value)) {
            return value.some((item) =>
              this.isEligible(item, {
                [keys.slice(1).join(".")]: property,
              })
            );
          }

          if (typeof value === "object")
            return this.isEligible(value, {
              [keys.slice(1).join(".")]: property,
            });

          return false;
        }

        return this.executeCondition(cart[key], property);
      })
      .every(Boolean);
  }
}

export { EligibilityService };
