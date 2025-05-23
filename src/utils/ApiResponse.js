class APIResponse {
    constructor(statusCode,data,message='Sucess'){
        this.statusCode=statusCode;
        this.data=data;
        this.message=message;
        this.statusCode = this.statusCode < 400 ? 500 : this.statusCode;

    }
      
}