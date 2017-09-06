/**
 * Created by Tian on 2017/8/20.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Table,Icon,Button,Form,Radio,InputNumber,Input} from 'antd';
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
      dataIndex: 'username',
      key: 'username',

    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },  {
      title: '创建时间',
      dataIndex: 'stime',
      key: 'stime',

    },{
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',

    },{
      title:'action',
      dataIndex:'action',
      key:'action',
      render:(text,record)=>(

        <span>
          <Button type="primary" onClick={()=>{
            that.props.dispatch({
              type:'manger/fetchDelet',
              payload:{id:record.id}
            })
          }}>删除</Button>&nbsp;&nbsp;
          <Button type="primary" onClick={()=>{
          that.props.dispatch(
            {
              type:'manger/save',
              payload:{visible:true,modalType:'edit',currentItem:record}
            }
          )
          }}>修改</Button>
        </span>
      )
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
      that.props.form.validateFields((err,values)=>{
        if(err){
          return false;
        }
       if(that.props.modalType==='create'){
        that.props.dispatch({
          type:'manger/fetchCreat',
          payload:{...values}
        })
        }
        else{
         that.props.dispatch({
           type:'manger/fetchUpdate',
           payload:{...values,id:that.props.currentItem.id}
         })
       }

      })



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
            title={this.props.modalType==='create'?'创建':'编辑'}
            visible={this.props.visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
           <Form onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="userame">
                {getFieldDecorator('username', {
                  initialValue: this.props.currentItem.name ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                )}
              </FormItem>


              <FormItem
                {...formItemLayout}
                label="age"
              >
                {getFieldDecorator('age',{initialValue: this.props.currentItem.age })(
                  <InputNumber min={1} max={80}  />
                )}

              </FormItem>
              <FormItem {...formItemLayout} label="email">
                {getFieldDecorator('email', {
                 initialValue: this.props.currentItem.email ,
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input prefix={<Icon type="email" style={{ fontSize: 13 }} />} placeholder="email" />
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
const MangerApp = Form.create()(Manger);
Manger.propTypes = {
};
function stateToProps(state) {
  return {...state.manger}

}
export default connect(stateToProps)(MangerApp);
