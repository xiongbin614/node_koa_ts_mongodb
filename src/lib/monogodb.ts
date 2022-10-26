import { connection, connect, Connection, Schema, model } from 'mongoose';

export async function connectdb(config: DatabaseConfig) {
  // let uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
  let uri = `mongodb://${config.host}:${config.port}/${config.database}`;
  let options: any = {
    useNewUrlParser: true,
    authSource: 'admin',
  };
  await connect(uri, options)
};
export class MongoDB {
  collectionname: string
  schemaobj: { [x: string]: any }
  schema: any
  pagesize: number
  model: any;
  constructor(collectionname: string, schemaobj: { [x: string]: any }) {
    this.collectionname = collectionname;
    this.schemaobj = schemaobj;
    this.schema = new Schema(schemaobj);
    this.model = model(collectionname, this.schema);
    this.pagesize = 20;
  }
  // 原有方法
  create(doc: any) {
    return this.model.create(doc);
  };
};



