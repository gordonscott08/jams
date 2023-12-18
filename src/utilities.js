let nextId = 0;
export function generatePrimaryKey() {
  const result = nextId;
  nextId += 1;
  return result;
}