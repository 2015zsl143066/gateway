/**
 * Created by Tian on 2017/8/18.
 */
/**
 * Created by Tian on 2017/8/16.
 */
import   *  as UserServie from "../services/user"
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {

  namespace: 'user',

  state: {
    list:[],
    success:"",
    size:10,
    total:0,
    page:1,
    visible:false,
    currentItem:{}, // 当前对话框里面的初值,
    modalType: 'create' //标识当前对话框是新建还是编辑， 新建create,编辑edit




  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/user') {
          dispatch({ type: 'fetch', payload: query });

        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put ,select}) {  // eslint-disable-line
      if(!payload.page){
        //select用于从state中获取数据
        const page = yield select(state => state.user.page);
        const size = yield select(state => state.user.size);

        payload.page =page;
        payload.size=size;
      }
      const result = yield call(UserServie.query,payload)
      console.log(result);
      yield put({ type: 'save' ,payload:{ total: result.data.total ,list: result.data.list ,
        page:result.data.page}});
    },
    *fetchCreat({ payload }, { call, put,select }) {  // eslint-disable-line
      const page = yield select(state => state.user.page)
      const size = yield select(state=>state.user.size)
      console.log("图示",payload);
      const result = yield call(UserServie.creat, payload)
      console.log('从后台获取的数据为',result)
      yield put({ type: 'save' ,payload:{}});
      if(result.status==200&&result.data.success==true){
        yield put(
          {
            type:"save",
            payload:{
              visible:false
            }
          }
        )
        yield put(routerRedux.push(
          {
            pathname:'/user',
            query:{
              page:page,
              size:size
            }
          }
        ));
      }
      else{
        message.error('This is a message of error');
      }

    },
    *fetchDelet({ payload }, { call, put,select }) {  // eslint-disable-line
      const page = yield select(state => state.user.page)
      const size = yield select(state=>state.user.size)
      console.log("图示",payload);
      const result = yield call(UserServie.delet, payload)
      console.log('从后台获取的数据为',result)
      yield put({ type: 'save' ,payload:{}});
      if(result.status==200&&result.data.success==true){
 //刷新页面
        yield put(routerRedux.push(
          {
            pathname:'/user',
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
    *fetchUpdate({ payload }, { call, put,select }) {  // eslint-disable-line
      const page = yield select(state => state.user.page)
      const size = yield select(state=>state.user.size)
      console.log("图示",payload);
      const result = yield call(UserServie.update, payload)
      console.log('从后台获取的数据为',result)
      yield put({ type: 'save' ,payload:{}});
      if(result.status==200&&result.data.success==true){
        yield put(
          {
            type:"save",
            payload:{
              visible:false
            }
          }
        )
 //刷新页面

        yield put(routerRedux.push(
          {
            pathname:'/user',
            query:{
              page:page,
              size:size,

            }
          }
        ));
      }
      else{
        message.error(result.data.detail);
      }

    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
