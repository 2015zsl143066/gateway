/**
 * Created by Tian on 2017/8/16.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
class Login extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubmit=this.handleSubmit.bind(this)

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        /*正则校验失败*/
        console.log('失败原因', err);
        return false;
      }
      this.props.dispatch({
        type:"login/fetch",
        payload:values,
      })
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{marginLeft:"30%",marginRight:"40%",marginTop:"10%"}}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }

}

Login.propTypes = {
};
function  stateToProps(state) {
  return {...state.login}
}
const MyLogin = Form.create()(Login);
export default connect(stateToProps)(MyLogin);
