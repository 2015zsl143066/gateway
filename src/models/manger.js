/**
 * Created by Tian on 2017/8/20.
 */
/**
 * Created by Tian on 2017/8/16.
 */
import   *  as MangerServie from "../services/manger"
export default {

  namespace: 'manger',

  state: {

   list:[],
    success:false,
    size:10,
    total:0,
    page:1,
    visible:false
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
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
