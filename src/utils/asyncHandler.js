const asyncHandler = (fun) => {
    return async (req, res, next) => {
        try {
            await fun(req, res, next);
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
            next(error);
        }
    };
};
export default asyncHandler;
// This function is used to handle async errors in express routes. It takes a function as an argument and returns a new function that handles the async errors. If an error occurs, it sends a 500 response with the error message. 
// const asyncHandler = (fun)=>{
//     return (req, res, next)=>{
//         Promise.resolve(fun(req, res, next)).catch((error)=>{
//             res.status(500).json({
//                 status: 'error',
//                 message: error.message,
//             });
//             next(error);
//         });
//     };
// };