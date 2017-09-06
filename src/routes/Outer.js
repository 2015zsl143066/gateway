/**
 * Created by Tian on 2017/8/26.
 */
/**
 * Created by Tian on 2017/8/18.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {routerRedux} from 'dva/router'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Outer extends React.Component {

  render(){
    const that = this;
function myFunction({item,key,keyPath}) {
  that.props.dispatch(routerRedux.push(key));


}
    return (
      <div>
        <Layout>
          <Header className="header" style={{padding:'0px'}}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <img src="aa1.jpg" style={{width:'100%',height:'65px'}}/>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                onClick={myFunction}
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                  <Menu.Item key="main">主页</Menu.Item>
                  <Menu.Item key="manger">管理员</Menu.Item>
                  <Menu.Item key="user">用户</Menu.Item>
                  <Menu.Item key="log">日志</Menu.Item>

                </SubMenu>

              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>

              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }

}

Outer.propTypes = {
};
function  stateToProps(state) {
  return {...state}
}
export default connect(stateToProps)(Outer);
