/**
 * Created by Tian on 2017/8/18.
 */
import request from '../utils/request';
import axios from 'axios'
export function query(bb) {
  return axios.get('/api/employee', {
    params: bb
  }).catch(err=>{
    console.log(err)
    return { ...err.response, data:{ detail: '无法连接网络'}}
  });
}
export function creat(aa) {

  return axios.post("/api/employee",
    aa
  ).catch(err=>{
    console.log(err)
    return { ...err.response, data:{ detail: '无法连接网络'}}
  });;

//  return request('/api/login',{"method":"post","data":bb});
}
export function delet(aa) {

  return axios.delete("/api/employee",
    {
      data: aa
    }
  ).catch(err=>{
    console.log(err)
    return { ...err.response, data:{ detail: '无法连接网络'}}
  });

//  return request('/api/login',{"method":"post","data":bb});
}
export function update(aa) {

  return axios.put("/api/employee",aa
  ).catch(err=>{
    console.log(err)
    return { ...err.response, data:{ detail: '无法连接网络'}}
  });

//  return request('/api/login',{"method":"post","data":bb});
}
