import request from '../utils/request';
import axios from 'axios'
export function query(bb) {
  return axios.post("/api/main", bb);
}
