class HttpException extends Error {
  errors?: object;
  status?: number;

  constructor({ errors, status }: { errors?: object; status?: number }) {
    super();
    this.errors = errors;
    this.status = status || 500;
  }
}

export default HttpException;
