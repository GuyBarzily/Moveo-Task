An Online Coding Web Application

The app was created with React.js on the client side and Node.js on the server side and MongoDB as the databsae.


The client side was deployed on Firebase using firebase hosting and the server was deployed using Render.


code blocks solutions:
1. Sort Array : function sort(arr){
   return arr.sort();
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
5. Async Function : //create an async arrow function A and wait for get data
import getData from "./axios"
   const A = async () =>{
        await getData();
     }

![image](https://github.com/GuyBarzily/Moveo-Task/assets/85988766/caac3405-6426-4e76-8b22-fb44a3572642)


   
![image](https://github.com/GuyBarzily/Moveo-Task/assets/85988766/0fdc129a-8097-46a7-aff7-23d916955af8)
