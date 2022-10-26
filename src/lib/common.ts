import fs from 'fs';
import path from 'path'

const registControllerList: any = {};

export const format = (data: ResponseBody) => {
  if ('code' in data) {
    return { message: 'ok', ...data };
  }
  return { code: 0, message: 'ok', data };
};

export const commonRouter = async (ctx:any) => {
  const requestBody: RequestBody = ctx.request.body;
  const { path, data } = requestBody;
  if (registControllerList[path]) {
    const username = decodeURI(ctx.cookies.get('username'))
    let params: ControllerParams = { data, ctx, username }
    let rtn = await registControllerList[path](params);
    ctx.response.body = format(rtn)
  } else {
    ctx.response.body = {
      code:-1,
      message:'路径不存在'
    };
  }
}
export const autoRegistController = async () => {
  const dirpath = path.resolve(__dirname, '../controller/')
  const files = fs.readdirSync(dirpath);
  const fileNameList = files.map((filename: string) => {
    return filename.split('.')[0];
  });
  for (let filename of fileNameList) {
    //  实现动态引入
    await import(dirpath + '/' + filename).then(async _module => {
      const service = _module.default
      for (const key in service) {
        if (Object.prototype.hasOwnProperty.call(service, key)) {
          const cb = service[key];
          registControllerList[`${filename}/${key}`] = cb;
        }
      }
    })
  }
  console.log('所以注册接口', registControllerList)
};