import { example } from '../model';
import moment from 'moment';
// moment().format('YYYY-MM-DD HH:mm:ss') 时间处理
// 查询所有操作日志
const findAll = async function ({ data, ctx, username }: ControllerParams) {
  return example.model.find(data);
};
// 查询所有操作日志
const createOne = async function ({ data, ctx, username }: ControllerParams) {
  return example.create(data);
};

export default {
  findAll,
  createOne
}