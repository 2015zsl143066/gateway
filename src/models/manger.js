/**
 * Created by Tian on 2017/8/20.
 */
/**
 * Created by Tian on 2017/8/16.
 */
import   *  as MangerServie from "../services/manger"
import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {

  namespace: 'manger',

  state: {

   list:[],
    success:false,
    size:10,
    total:0,
    page:1,
    visible:false,
    currentItem:{},
    modalType:'create'

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname,query})=>{
        if(pathname=='/manger'){
          dispatch({type:'fetch',payload:query});
        }
      })
    },
  },

  effects: {
    //查询服务器中的数据
    *fetch({ payload }, { call, put,select }) {  // eslint-disable-line
      if(!payload.page){
        //select用于从state中获取数据
        const page = yield select(state => state.manger.page);
        const size = yield select(state => state.manger.size);

        payload.page =page;
        payload.size=size;
      }
      const result = yield call(MangerServie.query, payload)
      console.log(result);
      if(result.status==200&&result.data.success==true){
        yield put({
          type:'save',
          payload:{
            list:result.data.list,
            success:true,
            page:result.data.page,
            size:result.data.size,
            total:result.data.total

          }
        })
      }
      else
      {
        message.err(result.data.detail);
      }

    },
    *fetchCreat({ payload }, { call, put,select }) {  // eslint-disable-line
      const result = yield call(MangerServie.creat,payload)
      if(result.status==200&&result.data.success==true){
        const page = yield select(state=>state.manger.page)
        const size = yield select(state=>state.manger.size)
        yield put({
          type:'save',
          payload:{
            visible:false
          }
        })
        yield put(routerRedux.push(
          {
            pathname:'/manger',
            query:{
              page:page,
              size:size
            }
          }
        ))
      }
      else{
        message.error('This is a message of error');
      }

    },
    *fetchDelet({payload},{call,put,select}){
      const result = yield call(MangerServie.delet,payload)
      if(result.status==200&&result.data.success==true){
        const page = yield select(state=>state.manger.page)
        const size = yield select(state=>state.manger.size)
        yield put(routerRedux.push(
          {
            pathname:'/manger',
            query:{
              page:page,
              size:size
            }
          }
        ));
      }
      else{
        message.error(result.data.detail);
      }
    },
    *fetchUpdate({payload},{call,put,select}){
       const result = yield call(MangerServie.update,payload)
     if(result.status==200&&result.data.success==true){
         const page = yield select(state=>state.manger.page)
         const size = yield select(state=>state.manger.size)
         yield put(
         {
           type:'save',
           payload:{visible:false}

         }
       )
       yield put(routerRedux.push(
         {
           pathname:'manger',
           query:{
             page:page,
             size:size
           }
         }
       ))
     }
    }
  },


  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
