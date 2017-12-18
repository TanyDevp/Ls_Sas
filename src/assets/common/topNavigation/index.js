import React, { Component } from 'react';
import { Menu, Row, Col } from 'antd';
import { NavLink } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import './index.css';
import logo from '../../img/lslogo.png'


// const IsActiveFunc = (match, location) => {
//     return location.pathname.replace('/', '');
// }
const history = createHistory();
const ActiveFunc = window.location.hash.replace('#/', '');

const notview = [
    'login',
    'assessmentdata'
]

export default class Navigation extends Component {

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

    render() {
        if (notview.filter(x => this.state.pathname.indexOf(x) > -1 || ActiveFunc.indexOf(x) > -1).length > 0) {
            return null;
        }
        else {
            return (
                <Row type="flex" justify="center" className="rowMenu">
                    <Col span={6} className="lslogo" ><img src={logo} alt="" /></Col>
                    <Col span={17} offset={1} >
                        <Menu mode="horizontal" defaultSelectedKeys={[ActiveFunc]} className="NavMenu">
                            <Menu.Item key="release"><NavLink to="/release" ><div className="navTitle">新品发布<code>RELEASE</code></div></NavLink></Menu.Item>
                            <Menu.Item key="report"><NavLink to="/report" ><div className="navTitle">成绩单<code>TRANSCRIPTS</code></div></NavLink></Menu.Item>
                            <Menu.Item key="activity"><NavLink to="/activity" ><div className="navTitle">活动播报<code>ACTIVITY</code></div></NavLink></Menu.Item>
                            <Menu.Item key="news"><NavLink to="/news" ><div className="navTitle">林氏新闻<code>NEWS</code></div></NavLink></Menu.Item>
                            <Menu.Item key="notice"><NavLink to="/notice" ><div className="navTitle">通知公告<code>NOTICE</code></div></NavLink></Menu.Item>
                            <Menu.Item key="complaints"><a target="_blank" rel="noopener noreferrer" href="http://113.105.237.98:8806/bsprt/html-Supplier/Suggestion.html?sgn=80ABF30B6AAA4A8E127FC115A3ABBE145F13DC0B6EFFC68ECEFAF9E9660304C8C76FB902527E3C27B70A414096CF79D1B35B73C2C7D366C1" ><div className="navTitle">投诉<code>COMPLAINTS</code></div></a></Menu.Item>
                            <Menu.Item key="help"><NavLink to="/help" ><div className="navTitle">帮助<code>HELP</code></div></NavLink></Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            );
        }
    }
}

