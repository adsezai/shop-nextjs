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
  Unauthorized: (message: string): HttpError => new HttpError(401, message),
  Forbidden: (message: string): HttpError => new HttpError(403, message),
  NotFound: (message: string): HttpError => new HttpError(404, message),
  BadRequest: (message: string): HttpError => new HttpError(400, message),
  Conflict: (message: string): HttpError => new HttpError(409, message),
  InternalServerError: (message: string): HttpError => new HttpError(500, message),
  ErrorByHttpCode: (message: string, code: number): HttpError => new HttpError(code, message),
  isHttpError: (err: Error): boolean => err && err.name === 'HttpError'
}

export const errorByHttpCode = (code: number, msg: string): HttpError => {
  throw httpErrors.ErrorByHttpCode(msg, code)
}

export const errorUnauthorized = (msg?: string): HttpError => {
  throw httpErrors.Unauthorized(msg || 'Unauthorized')
}
