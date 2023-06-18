export const catchAsyncError = (passedFunction) =>(req,res,next)=>{

    Promise.resolve(passedFunction(req,res,next)).catch(next)

}












// export const catchAsyncError = () =>{
//     return () =>{

//     }
// }

//writing above one and below one is same 
// export const catchAsyncError = () =>{
//     return ()=>{

//     }
// }