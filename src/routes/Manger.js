/**
 * Created by Tian on 2017/8/20.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Table,Icon} from 'antd';
import { Pagination } from 'antd';
import { routerRedux } from 'dva/router';
class Manger extends React.Component {
  render(){

    const data = this.props.list;
    const that = this;
    const columns = [ {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',

    },{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',

    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',

    }, {
      title: '创建时间',
      dataIndex: 'stime',
      key: 'stime',

    },{
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',

    }]
    function myFunction(page,size){
      that.props.dispatch(routerRedux.push({
        pathname:'/manger',
        query:{
          page:page,
          size:size
        }
      }))

    }
    return (

      <div>
        <Table pagination={false} rowKey={"id"} columns={columns} dataSource={data}/>
        <Pagination current={this.props.page} total={this.props.total} pageSize={this.props.size} onChange={myFunction}/>
      </div>
    );
  }

}

Manger.propTypes = {
};
function stateToProps(state) {
  return {...state.manger}

}
export default connect(stateToProps)(Manger);
