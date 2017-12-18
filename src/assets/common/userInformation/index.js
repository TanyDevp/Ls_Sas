import React, { Component } from 'react';
import { Row, Col, Icon, Dropdown, Menu } from 'antd';
import createHistory from 'history/createHashHistory';
import './index.css';
import mumu from '../../img/mumu.png'


const ActiveFunc = window.location.hash.replace('#/', '');
const notview = [
    'login',
    'assessmentdata'
]

const history = createHistory();


export default class UserInformation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathname: ''
        };
    }

    componentWillMount() {
        history.listen(location => {
            this.setState({
                pathname: location.pathname
            });
        });
    }

    trunQuartData() {
        window.location.href = "/#/quarterdata";
    }

    showEditModal() {
        this.props.showEdit();
    }



    render() {
        if (notview.filter(x => this.state.pathname.indexOf(x) > -1 || ActiveFunc.indexOf(x) > -1).length > 0) {
            return null;
        }
        else {
            return (
                <Row type="flex" justify="center" className="userBar">
                    <Col span={15}></Col>
                    <Col span={9}>
                        {localStorage.user ? (
                            <Dropdown overlay={(<Menu style={{ width: '160px', float: 'right' }}>
                                <Menu.Item>
                                    <a style={{ fontSize: '12px' }} onClick={this.showEditModal.bind(this)}>修改密码</a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a style={{ fontSize: '12px' }} onClick={() => {
                                        // localStorage.lskey = '';
                                        // window.location.href = '/#/login';
                                        // window.location.reload();
                                        history.push('/login');
                                    }}>退出</a>
                                </Menu.Item>
                            </Menu>)}>
                                <div className="userBar_info">
                                    <img src={mumu} alt="" style={{ height: '24px', marginRight: '10px' }} />
                                    <span>{localStorage.user}</span>
                                    <Icon type="down" className="userinfo_icon" />
                                </div>
                            </Dropdown>) : (
                                <div className="userBar_info">
                                    <img src={mumu} alt="" style={{ height: '24px', marginRight: '10px' }} />
                                    <span>请登录</span>
                                    <Icon type="down" className="userinfo_icon" />
                                </div>)}

                        <div className="userBar_info">
                            <span onClick={this.trunQuartData.bind(this)}>本季度战果</span>
                            <Icon type="down" className="userinfo_icon" />
                        </div>
                    </Col>
                </Row>
            );
        }
    }
}

