export const minValueForBasicInputs = (
  itemId: string,
  basicProjectInputs: { [key: string]: string | null }
): string | undefined => {
  const keys = Object.keys(basicProjectInputs);
  const currentItemIndex = keys.findIndex((input) => input === itemId);

  if (currentItemIndex === 0) return undefined;

  for (let i = currentItemIndex - 1; i >= 0; i--) {
    if (basicProjectInputs[keys[i]]) {
      return basicProjectInputs[keys[i]]!;
    }
  }

  return undefined;
};

export const maxValueForBasicInputs = (
  itemId: string,
  basicProjectInputs: { [key: string]: string | null }
): string | undefined => {
  const keys = Object.keys(basicProjectInputs);
  const currentItemIndex = keys.findIndex((input) => input === itemId);

  if (currentItemIndex === keys.length - 1) return undefined;

  for (let i = currentItemIndex + 1; i < keys.length; i++) {
    if (basicProjectInputs[keys[i]]) {
      return basicProjectInputs[keys[i]]!;
    }
  }

  return undefined;
};

export const validateOnBlur = (
  inputDate: string,
  itemId: string,
  basicProjectInputs: { [key: string]: string | null },
  onChange: Function
): string | undefined => {
  const minValue = minValueForBasicInputs(itemId, basicProjectInputs);
  const maxValue = maxValueForBasicInputs(itemId, basicProjectInputs);

  if (minValue && inputDate < minValue) {
    onChange(itemId, minValue);
    return;
  }

  if (maxValue && inputDate > maxValue) {
    onChange(itemId, maxValue);
    return;
  }
};
