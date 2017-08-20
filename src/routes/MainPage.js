/**
 * Created by Tian on 2017/8/18.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

class MainPage extends React.Component {

  render(){
    return (
      <div>
        <h1>欢迎访问重大网关</h1>
      </div>
    );
  }

}

MainPage.propTypes = {
};
function  stateToProps(state) {
  return {...state.login}
}
export default connect(stateToProps)(MainPage);
