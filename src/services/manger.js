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
export function creat(aa) {
  return axios.post("/api/manager",aa).catch(err=>{
    return{...err.response,data:{detail:'无法连接网络'}}
  })

}
export function delet(aa) {
  return axios.delete("/api/manager",
    {
      data:aa
    }
  ).catch(err=>{
    return{...err.response,data:{detail:'无法连接网络'}}
  })

}
export function update(aa) {
  return axios.put("/api/manager", aa

  ).catch(err=>{
    return{...err.response,data:{detail:'无法连接网络'}}
  })

}

