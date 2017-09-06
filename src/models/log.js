/**
 * Created by Tian on 2017/8/22.
 */
/**
 * Created by Tian on 2017/8/18.
 */
/**
 * Created by Tian on 2017/8/16.
 */
import   *  as LogServie from "../services/log"
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'log',

  state: {
    list:[],
    success:"",
    size:10,
    total:0,
    page:1,
    visible:false,
    list1:[],





  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
return history.listen(({pathname,query})=>{
  if(pathname=='/log'){
    dispatch({type:'fetch',payload:query});
    dispatch({type:'fetch1',payload:query});
  }
})
    },
  },

    effects: {
      *fetch({payload}, {call, put, select}) {  // eslint-disable-line
        if (!payload.page) {
          //select用于从state中获取数据
          const page = yield select(state => state.log.page);
          const size = yield select(state => state.log.size);

          payload.page = page;
          payload.size = size;
        }
        const result = yield call(LogServie.query, payload)
        console.log(result);
        yield put({
          type: 'save', payload: {
            total: result.data.total, list: result.data.list,
            page: result.data.page
          }
        });
      },


  *fetch1({payload}, {call, put, select}) {  // eslint-disable-line
    if (!payload.page) {
      //select用于从state中获取数据
      const page = yield select(state => state.log.page);
      const size = yield select(state => state.log.size);

      payload.page = page;
      payload.size = size;
    }
    const result = yield call(LogServie.query1, payload)
    console.log(result);
    yield put({
      type: 'save', payload: {
       list1:result.data.list,
      }
    });
  },

},


    reducers: {
      save(state, action) {
        return {...state, ...action.payload};
      },
    },
  };


