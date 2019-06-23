import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { reqLogin } from '../../api';

import './index.less';

// 缓存
const Item = Form.Item;


class Login extends Component {

  // 发送表单
  login = (e) => {
    e.preventDefault();
    // 进行校验
    this.props.form.validateFields(async (errors, values) => {
      if (!errors) {
        // 校验成功
        const { username, password } = values;
        // 发起登陆请求
        const result = await reqLogin(username, password);
        if (result) {
          // 登陆成功，跳转首页
          this.props.history.replace('/');
        } else {
          // 登陆失败，清空密码
          this.props.form.resetFields(['password']);
        }
      } else {
        console.log('登录表单校验失败');
      }
    })
  }

  // 校验逻辑
  validator = (rule, value, callback) => {
    const name = rule.fullField === 'username' ? '用户名' : '密码';
    if (!value) {
      callback(`${name}不能为空`);
    } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
      callback(`${name}只能包含字母和数字`);
    } else if (value.length < 3) {
      callback(`${name}长度不能小于3位`);
    } else if (value.length > 8) {
      callback(`${name}长度不能大于8位`);
    } else {
      callback();
    }
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <div className="login-header">
          <h1>出租屋管理系统</h1>
        </div>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.login} className="login-form">
            <Item>
              {getFieldDecorator('username', {
                rules: [{validator: this.validator}]
              })(
                <Input className="login-input" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" autoComplete="off" />
              )}
            </Item>
            <Item>
              {getFieldDecorator('password', {
                rules: [{validator: this.validator}]
              })(
                <Input className="login-input" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" type="password"/>
              )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-btn">立即登录</Button>
            </Item>
          </Form>
        </section>
      </div>
    )
  }
}

// 暴露，通过包装组件From(Login)给Login组件添加form属性
export default Form.create()(Login);