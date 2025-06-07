// class ApiError extends Error {
//   constructor(message="Internal Server Error"
//     , statusCode,
// errors =[],
// stack="") {
//     super(message);
//     this.statusCode = statusCode;
//     this.errors = errors;
//     this.data = null;
//     this.message = message;
//     this.stack = stack;
//     if(this.stack){
//         this.stack = stack;
//     }
//    else{
//     Error.captureStackTrace(this, this.constructor);
//    }
//   }
 
// }
// export default ApiError;
class ApiError extends Error {
  constructor(statusCode, message = "Internal Server Error", errors = [], stack = "") {
    super(message); // sets the built-in Error message

    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export {ApiError};