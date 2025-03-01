export abstract class ValueObject {
  protected abstract getEqualityComponents(): unknown[];

  public static equals(left: ValueObject, right: ValueObject): boolean {
    if (left === null && right === null) {
      return true;
    }

    if (left === undefined && right === undefined) {
      return true;
    }

    if (left.constructor.name !== right.constructor.name) {
      return false;
    }

    const leftComponents = left.getEqualityComponents();
    const rightComponents = right.getEqualityComponents();

    if (leftComponents.length !== rightComponents.length) {
      return false;
    }

    return rightComponents.every((leftComponent, index) => {
      const rightComponent = rightComponents[index];

      // Handle arrays
      if (Array.isArray(leftComponent) && Array.isArray(rightComponent)) {
        return ValueObject._areArraysEqual(leftComponent, rightComponent);
      }

      // Handle nested value objects
      if (
        leftComponent instanceof ValueObject &&
        rightComponent instanceof ValueObject
      ) {
        return ValueObject.equals(leftComponent, rightComponent);
      }

      // Handle NaN
      if (Number.isNaN(leftComponent) && Number.isNaN(rightComponent)) {
        return true;
      }

      // Handle primitive values
      return Object.is(leftComponent, rightComponent);
    });
  }

  private static _areArraysEqual(
    array1: unknown[],
    array2: unknown[],
  ): boolean {
    if (array1.length !== array2.length) return false;

    return array1.every((item, index) => {
      const otherItem = array2[index];

      if (item instanceof ValueObject && otherItem instanceof ValueObject) {
        return ValueObject.equals(item, otherItem);
      }

      if (Array.isArray(item) && Array.isArray(otherItem)) {
        return ValueObject._areArraysEqual(item, otherItem);
      }

      return Object.is(item, otherItem);
    });
  }
}
