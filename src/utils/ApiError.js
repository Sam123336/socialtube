class ApiError extends Error {
  constructor(message="Internal Server Error"
    , statusCode,
errors =[],
stack="") {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = null;
    this.message = message;
    this.stack = stack;
    if(this.stack){
        this.stack = stack;
    }
   else{
    Error.captureStackTrace(this, this.constructor);
   }
  }
 
}
export default ApiError;