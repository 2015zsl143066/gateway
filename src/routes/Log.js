/**
 * Created by Tian on 2017/8/22.
 */
/**
 * Created by Tian on 2017/8/18.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Table, Icon ,Pagination} from 'antd';
import {routerRedux} from 'dva/router'

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  from 'recharts'
class Log extends React.Component {


  render(){
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      key: 'id',

    }, {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'host',
      dataIndex: 'host',
      key: 'host',
    }, {
      title: 'flux',
      dataIndex:'flux',
      key: 'flux',

    },{
      title: 'alert_level',
      dataIndex:'alert_level',
      key: 'alert_level',

    }
    ];

    const data = this.props.list;
    const that = this;
    function myFunction(page,size) {
      that.props.dispatch(routerRedux.push({
        pathname:'/log',
        query:{
          page:page,
          size:size
        }
      }))

    }

    const data1 = this.props.list1;
    return (
      <div>
        <Table pagination={false} rowKey={"id"} columns={columns} dataSource={data} />
        <Pagination current={this.props.page} total={this.props.total} size={this.props.size} onChange={myFunction}/>
        <a href="http://localhost:8080/file/ex.xlsx">下载统计报表</a>


        <BarChart width={600} height={300} data={data1}
                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Bar dataKey="nomal" fill="#8884d8" />
          <Bar dataKey="midlle" fill="#82ca9d" />
          <Bar dataKey="high" fill="#ff0000" />
        </BarChart>
      </div>
    );
  }

}

Log.propTypes = {
};
function  stateToProps(state) {
  return {...state.log}
}
export default connect(stateToProps)(Log);
