class ApiResponse {
  constructor(sucess = false, data) {
      this.sucess = sucess;
      this.data = data;
      this.errors = [];
  }

  addError(errorCode, errorMessage) {
      this.errors.push({
          code: errorCode,
          message: errorMessage
      });
  }

  addData(data) {
      this.data = data;
  }
}

module.exports = ApiResponse;
