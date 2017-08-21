/**
 * Created by Tian on 2017/8/20.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Table,Icon,Button,Form,Radio,InputNumber} from 'antd';
import { Pagination,Modal } from 'antd';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Manger extends React.Component {
  render(){
    const { getFieldDecorator } = this.props.form;
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
    function showModal() {
      that.props.dispatch({
        type:'manger/save',
        payload:{visible:true}
      })

    }
    function handleOk() {


    }
    function handleCancel() {
      that.props.dispatch({
        type:'manger/save',
        payload:{visible:false}
      })

    }
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    return (

      <div>
        <div>
        <Button type="primary" onClick={showModal} style={{marginLeft:'80%',marginTop:'4%'}}>创建</Button>
          <Modal
            title={'创建'}
            visible={this.props.visible}
            onOk={handleOk()}
            onCancel={handleCancel}
          >
           <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                  initialValue: this.props.currentItem.name ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="nickName">
                {getFieldDecorator('nickname', {
                  initialValue: this.props.currentItem.nickname ,
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input prefix={<Icon type="nick" style={{ fontSize: 13 }} />}  placeholder="nickName" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Gender" >
                {getFieldDecorator('sex',{
                  initialValue: this.props.currentItem.sex ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <RadioGroup>
                    <Radio value={"1"}>男</Radio>
                    <Radio value={"2"}>女</Radio>

                  </RadioGroup>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="InputNumber"
              >
                {getFieldDecorator('age',{initialValue: this.props.currentItem.age })(
                  <InputNumber min={1} max={80}  />
                )}

              </FormItem>
              <FormItem {...formItemLayout} label="phone">
                {getFieldDecorator('phone', {
                  initialValue: this.props.currentItem.phone ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="phone" style={{ fontSize: 13 }} />} placeholder="phone" />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="address">
                {getFieldDecorator('address', {
                  initialValue:this.props.currentItem.address ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="address" style={{ fontSize: 13 }} />} placeholder="address" />
                )}
              </FormItem>

            </Form>

          </Modal>
        </div>
       <br/>
        <Table pagination={false} rowKey={"id"} columns={columns} dataSource={data}/>
        <Pagination current={this.props.page} total={this.props.total} pageSize={this.props.size} onChange={myFunction}/>

      </div>
    );
  }

}
const MangerApp = Form.create(Manger);
Manger.propTypes = {
};
function stateToProps(state) {
  return {...state.manger}

}
export default connect(stateToProps)(MangerApp);
