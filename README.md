An Online Coding Web Application

The app was created with React.js on the client side, Node.js on the server side and MongoDB as the databsae.


The client side was deployed on Firebase using firebase hosting and the server was deployed using Railway.


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
4. Find If Even : function isEven(num){
  return num % 2 === 0;
}
5. Async Function : //create an async arrow function A and wait for get data
import getData from "./axios"
   const A = async () =>{
        await getData();
     }

![image](https://github.com/GuyBarzily/Moveo-Task/assets/85988766/caac3405-6426-4e76-8b22-fb44a3572642)


   
<img width="1205" alt="image" src="https://github.com/GuyBarzily/Moveo-Task/assets/85988766/252192af-7fab-4682-a474-c37f30650701">
