/**
 * Created by Tian on 2017/8/20.
 */
/**
 * Created by Tian on 2017/8/18.
 */
import request from '../utils/request';
import axios from 'axios'
export function query(bb) {
  return axios.get('/api/manager', {
    params: bb
  }).catch(err=>{
    console.log(err)
    return { ...err.response, data:{ detail: '无法连接网络'}}
  });
}

