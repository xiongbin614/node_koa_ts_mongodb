interface RequestBody {
  path: string,
  data: any
}
interface ResponseBody {
  code: number,
  message?: string,
  data?: object
}
interface ControllerParams {
  data: any,
  ctx: any,
  username: string
}
interface DatabaseConfig {
  host: string,
  port: number,
  username: string,
  password: string,
  database: string
}