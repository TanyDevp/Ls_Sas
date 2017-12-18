import React, { Component } from 'react';
import { Row, Form, Input, Button, Icon } from 'antd';
import BaseFunction from '../../common/common.js';
import './index.css';
import logo from '../../img/lslogo.png';
import bg from '../../img/bg.png';
const FormItem = Form.Item;

const wheight = window.innerHeight;
const bodybg = {
    backgroundSize: '100% 100%',
    backgroundImage: 'url(' + bg + ')',
    height: wheight + 'px',
    width: '100%',
    minHeight: '580px'
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginerr: false,
            loginerrmsg: '',
            logining: false
        }
    }

    handleSubmit(e) {
        let _this = this;
        _this.setState({
            logining: true
        });
        e.preventDefault();
        this.props.form.validateFields((errors, values, callback) => {
            if (!!errors) {
                return;
            }
            BaseFunction.getServerData('login/ToLogin', {
                username: encodeURIComponent(values.username),
                pwd: encodeURIComponent(values.password)
            }, data => {
                if (data.OpStatus) {
                    if (!data.content.IsSupplier) {
                        _this.setState({
                            loginerr: true,
                            loginerrmsg: '账号类型出错！',
                            logining: false,
                        });
                    }
                    localStorage.lskey = data.content.SessionKey;
                    localStorage.user = data.content.UserName;
                    window.location.href = '/#/report';
                    window.location.reload();
                }
                else {
                    _this.setState({
                        loginerr: true,
                        loginerrmsg: data.msg,
                        logining: false,
                    });
                }
            });
        });
    }

    closeerrTitle() {
        this.setState({
            loginerr: false,
            loginerrmsg: '',
        });
    }

    render() {
        const { getFieldProps, isFieldValidating, getFieldError } = this.props.form;
        // const formItemLayout = {
        //     labelCol: { span: 6 },
        //     wrapperCol: { span: 14 },
        // };
        const userProps = getFieldProps('username', {
            rules: [
                { required: true, whitespace: true, message: '  ' },
            ],
        });
        const pwdProps = getFieldProps('password', {
            rules: [
                { required: true, whitespace: true, message: '  ' },
            ],
        });
        return (
            <div style={bodybg}>
                <Row type="flex" justify="center" className="loginBlock">
                    <div style={{ width: '100%' }}>
                        <img className="login_lslogo" src={logo} alt="" />
                    </div>
                    <Form className="loginForm" horizontal="true" onSubmit={this.handleSubmit.bind(this)} style={{ width: '350px' }}>
                        <FormItem
                            help={isFieldValidating('username') ? '' : (getFieldError('username') || []).join(', ')}>
                            <Icon type="user" className="login_icon" />
                            <Input
                                id="username"
                                size="large"
                                placeholder="请输入用户名"
                                className="login_input"
                                defaultValue={localStorage.user || null}
                                {...userProps} />
                        </FormItem>
                        <FormItem>
                            <Icon type="lock" className="login_icon" />
                            <Input type="password"
                                id="userpwd"
                                size="large"
                                placeholder="请输入密码"
                                className="login_input"
                                {...pwdProps} />
                        </FormItem>
                        <FormItem style={{ textAlign: 'center', marginTop: '40px' }}>
                            {this.state.logining === true ? (<Button type="primary" htmlType="submit" className="login_btn" disabled >
                                <Icon type="loading" />
                                登录中...
                            </Button>) : (<Button type="primary" htmlType="submit" className="login_btn">
                                    登录
                            </Button>)}

                        </FormItem>
                        {this.state.loginerr === true ? (
                            <FormItem>
                                <div className="errTitle">
                                    {this.state.loginerrmsg}
                                    <a className="closeerrTitle" onClick={this.closeerrTitle.bind(this)}><Icon type="cross" /></a>
                                </div>
                            </FormItem>
                        ) : null}
                    </Form>
                </Row>
            </div>
        );
    }
}

Login = Form.create()(Login);

export default Login;