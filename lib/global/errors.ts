class HttpError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.name = this.constructor.name
    this.code = code
  }
}

const httpErrors = {
  HttpErrorClass: HttpError,
  Forbidden: (message: string) => new HttpError(403, message),
  NotFound: (message: string) => new HttpError(404, message),
  BadRequest: (message: string) => new HttpError(400, message),
  Conflict: (message: string) => new HttpError(409, message),
  InternalServerError: (message: string) => new HttpError(500, message),
  ErrorByHttpCode: (message: string, code: number) => new HttpError(code, message),
  isHttpError: (err: Error) => err && err.name === 'HttpError'
}

export const errorByHttpCode = (code: number, msg: string) => {
  throw httpErrors.ErrorByHttpCode(msg, code)
}
