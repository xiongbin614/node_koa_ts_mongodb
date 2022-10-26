import Koa from 'koa';
import koaBody from 'koa-body';
import Router from "koa-router";
import { autoRegistController, commonRouter } from './common'
import { connectdb } from './monogodb'
import { dbConfig } from './config'

async function _initDb() {
  console.log('连接数据库')
  await connectdb(dbConfig)
}
async function run() {
  const app = new Koa();
  const router = new Router();
  const port = process.env.port || 3007
  //   // 自动注册所以接口
  await autoRegistController();
  app.use(koaBody());
  router.post('/common', commonRouter);
  app.use(router.routes());
  app.use(async (ctx) => {
    ctx.body = "Hello World";
  });
  app.on('error', (err, ctx) => {
    console.log('服务异常',err)
    ctx.response.body = '服务异常';
  });
  app.listen(port,()=>{
    console.log('server start',`port:${port}`)
    _initDb()
  });
}
export default run