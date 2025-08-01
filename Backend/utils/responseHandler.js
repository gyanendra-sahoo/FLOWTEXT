class ResponseHandler {
  constructor (
    statusCode,
    data,
    message = 'Request successful',
    success = true
  ) {
    this.statusCode = statusCode; 
    this.data = data;
    this.message = message;
    this.success = success;
  }

}

export { ResponseHandler }