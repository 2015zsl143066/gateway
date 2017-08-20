/**
 * Created by Tian on 2017/8/18.
 */
/**
 * Created by Tian on 2017/8/18.
 */
import React from 'react';
import { connect } from 'dva';
import { Table, Icon } from 'antd';
import { Modal, Button ,Form, Input,Checkbox,Radio,InputNumber} from 'antd';

import styles from './IndexPage.css';
import { Pagination } from 'antd';
import { routerRedux } from 'dva/router';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class User extends React.Component {

  render(){
    const { getFieldDecorator } = this.props.form;
    const that  =this;
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
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',

    },{
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',

    },{
      title:'action',
      dataIndex:'action',
      key:'action',
      render:(text,record)=>(
        //record当前行的所有数据
        console.log('record',record),
        <span>
          <Button type="primary" onClick={()=>{
      that.props.dispatch({
         type:'user/fetchDelet',
            payload:{id:record.id}
     })
          }}>delete</Button>&nbsp;&nbsp;&nbsp;
          <Button type="primary" onClick={()=>{
         that.props.dispatch({
           type:'user/save',
            payload:{visible:true, modalType:'edit', currentItem: record}
         })
          }}>xiugai</Button>
        </span>
      )
    }
    ];
    const data = this.props.list;

    function myFunction(page, pageSize) {
      console.log(page)
      console.log(pageSize)
      that.props.dispatch(routerRedux.push({
        pathname: '/user',
        query: {
          page: page,
          size:pageSize
        }
      }))

    }

   const showModal = () => {

     that.props.dispatch({
       type:"user/save",
       payload:{visible:true},
       }

     )

    }
    const handleOk = (e) => {
      console.log(e);
      that.props.form.validateFields((err,values)=>{
        if(err){
          return false;
        }
       console.log(values);
        that.props.dispatch({
          type:"user/fetchCreat",
          payload:{...values, phone: Number(values.phone)},
        })
      })


    }
   const handleCancel = (e) => {
      console.log(e);
    that.props.dispatch({
      type:"user/save",
      payload:{visible:false, modalType:'create', currentItem:{}}
      }

    )

    }
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
    };
    return (
      <div>
        <div style={{marginLeft:"90%",marginTop:"10px"}}>
          <Button type="primary" onClick={showModal} >创建</Button>
          <Modal
            title="Basic Modal"
            visible={this.props.visible}
            onOk={handleOk}
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
        <br/>
        <Table pagination={false} rowKey={"id"} columns={columns} dataSource={data}/>
        <Pagination current={this.props.page} total={this.props.total} pageSize={this.props.size} onChange={myFunction}/>

      </div>
    );
  }

}
const userApp = Form.create()(User);
User.propTypes = {
};
function  stateToProps(state) {
  return {...state.user}
}
export default connect(stateToProps)(userApp);
