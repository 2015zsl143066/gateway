/**
 * Created by Tian on 2017/8/16.
 */
import request from '../utils/request';
import axios from 'axios'
export function query(bb) {
  return axios.post("/api/login", bb);
}
