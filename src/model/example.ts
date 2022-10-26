
import { MongoDB } from '../lib/monogodb';
const COLLECTION_NAME = 'example';

const schema = { // 操作表
  // 创建时间
  createTime: String,
  // 修改类型 [simple,complex]
  changeType: String,
};
class Example extends MongoDB {
  constructor() {
    super(COLLECTION_NAME, schema);
  }
}



export default new Example();

