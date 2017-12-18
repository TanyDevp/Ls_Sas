import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { Row, Spin, Modal, Form, Input, Icon, message } from 'antd';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import './index.css';
// import registerServiceWorker from './assets/common/registerServiceWorker';
import Navigation from './assets/common/topNavigation';
import UserInformation from './assets/common/userInformation';
import BaseFunction from './assets/common/common.js';
// import store from './store';
//------------------------------------------------------
import report from './assets/views/report';
import news from './assets/views/news';
import login from './assets/views/login';
import release from './assets/views/release';
import commodity from './assets/views/commodity'
import quarterData from './assets/views/quarterData'

const history = createHistory();
const FormItem = Form.Item;


class App extends Component {
    state = {
        loading: false,
        editshow: false,
        editerr: false,
        editerrlog: null
    }

    loadingModal(type) {
        this.setState({
            loading: type === 'show' ? true : false
        });
    }

    showEdit() {
        this.setState({ editshow: true });
    }
    closeEditModal() {
        this.setState({ editshow: false, editerr: false, editerrlog: null });
    }

    sureEditpwd() {
        let _this = this;
        let oldpwd = this.refs.oldpwd.input.value;
        let newpwd = this.refs.newpwd.input.value;
        let newpwdagain = this.refs.newpwdagain.input.value;
        if (newpwd !== newpwdagain) {
            _this.setState({ editerrlog: '两次密码输入不一致', editerr: true })
            return;
        }
        if ((oldpwd.length + newpwd.length + newpwdagain.length) < 3) {
            _this.setState({ editerrlog: '请输入完整信息', editerr: true })
            return;
        }
        BaseFunction.getServerData('User/ModifyPwd', {
            OldPwd: oldpwd, NewPwd: newpwd, SureNewPwd: newpwdagain
        }, (data) => {
            if (data.OpStatus === false) {
                _this.setState({ editerrlog: data.msg, editerr: true })
                return;
            }
            localStorage.lskey = '';
            _this.setState({ editshow: false });
            history.push('/login');
            message.success('密码修改成功！请用新密码重新登录账号！');
        });

        //    $.ajax({
        //             type: 'POST',
        //             url: getServerUrl() + 'User/ModifyPwd',
        //             data: { OldPwd: cs_pwd, NewPwd: n_pwd, SureNewPwd: n2_pwd, SessionKey: getCookie('SessionKey') },
        //             success: function (data) {
        //                 if (data.OpStatus == false) {
        //                     alert(data.msg);
        //                 }
        //                 else {
        //                     $("#myModal").modal('hide');
        //                     alert('密码修改成功！请用新密码重新登录账号！');
        //                     self.bequit();
        //                     return
        //                 }
        //             },
        //             dataType: 'json'
        //         });

    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18, offset: 1 },
            },
        };
        return (
            // <Provider store={store}>
            <Router history={history}>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}
                    style={{ minHeight: '410px' }}>
                    <div className="App">
                        <Row>
                            <UserInformation showEdit={this.showEdit.bind(this)} />
                            <Navigation />
                            <Modal
                                visible={this.state.editshow}
                                title="修改密码"
                                okText="确定"
                                cancelText="取消"
                                onCancel={this.closeEditModal.bind(this)}
                                onOk={this.sureEditpwd.bind(this)}
                                maskClosable={false}
                            >
                                <Form>
                                    <FormItem
                                        {...formItemLayout}
                                        label="旧密码：">
                                        <Input prefix={<Icon type="unlock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" ref="oldpwd" placeholder="请输入旧密码" />
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="新密码：">
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" ref="newpwd" placeholder="请输入新密码" />
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="确认新密码：">
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" ref="newpwdagain" placeholder="请确认一遍新密码" />
                                    </FormItem>
                                    <FormItem>
                                        {this.state.editerr === true ? (<div className="errTitle">
                                            {this.state.editerrlog}
                                            <a className="closeerrTitle" onClick={() => { this.setState({ editerrlog: null, editerr: false }) }}><Icon type="cross" /></a>
                                        </div>) : null}
                                    </FormItem>
                                </Form>
                            </Modal>
                        </Row>
                        <Row>
                            <Route render={({ location }) => {
                                return (
                                    <div>
                                        <Route location={location} exact path="/" component={report} />
                                        <Route location={location} path="/report" component={report} />
                                        <Route location={location} path="/news" component={news} />
                                        <Route location={location} path="/activity" component={news} />
                                        <Route location={location} path="/notice" component={news} />
                                        <Route location={location} path="/release" component={release} />
                                        <Route location={location} path="/commodity" component={commodity} />
                                        <Route location={location} path="/quarterdata" component={quarterData} />
                                        <Route path="/login" component={login} />
                                    </div>
                                )
                            }} />

                        </Row>
                    </div>
                </Spin>
            </Router>
            // </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
