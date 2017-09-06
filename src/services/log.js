/**
 * Created by Tian on 2017/8/22.
 */
import request from '../utils/request';
import axios from 'axios'
export function query(bb) {
  return axios.get("/api/network/log", {
    params:bb
  });
}
export function query1(bb) {
  return axios.get("/api/statistic", {
    params:bb
  });
}
