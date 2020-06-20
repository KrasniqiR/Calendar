import { splitChunks } from "./util";

test("Confirm split chunks works if chunk size is not a factor of array length", () => {
  const toSplit = [1, 2, 3, 4, 5];  
  expect(splitChunks(toSplit, 4)).toEqual([[1,2,3,4], [5]])
});
