//creates a deep clone of an object with nested types
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}