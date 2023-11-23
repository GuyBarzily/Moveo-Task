Hi, This is my home assignment for Moveo Group.

code blocks solutions:

1. Sort Array : function sort(arr){
   return arr.sort()
}
2. Rotate Array : function rotateArray(arr,k){
  const rotateIndex = k % arr.length;
  const rotatedArray = arr.slice(-rotateIndex).concat(arr.slice(0, -rotateIndex));
  return rotatedArray;
}
3. Print Array : function printArray(arr){
  console.log(arr);
}
4. Find if even : function isEven(num){
  return num % 2 === 0;
}
