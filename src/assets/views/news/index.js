import React, { Component } from 'react';
import { Row, Col, Menu, Spin } from 'antd';
import BaseFunction from '../../common/common.js';
import FreeScrollBar from 'react-free-scrollbar';
import './index.css';
import 'animate.css'

const wheight = window.innerHeight;
var newtype = { activity: '活动播报', news: '林氏新闻', notice: '通知公告' };
export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newlistlist: [],
            keyselect: 0,
            newsAcitve: '',
            loading: true
        }
    }

    componentDidMount() {
        let ActiveFunc = window.location.hash.replace('#/', '');
        let _this = this;
        BaseFunction.getServerData('News/getSupNewsList', { type: newtype[ActiveFunc] }, data => {
            _this.setState({
                newlistlist: data.datalist
            });
            _this.selectNews(null, data.datalist[0].Id);
        });
    }


    selectNews(data, id) {
        let _this = this;
        let newid = data == null ? id : data.item.props.newid;
        _this.setState({
            newsAcitve: '',
            loading: true
        });
        BaseFunction.getServerData('News/getnewsbyid', { id: newid }, data => {
            let NewsContent = data.datalist[0].NewsContent.replace(/src="\/bsprt/g, 'src="http://113.105.237.98:8806/bsprt');
            _this.refs.NewsTitle.innerHTML = data.datalist[0].Title;
            _this.refs.NewsContent.innerHTML = NewsContent;
            _this.setState({
                newsAcitve: 'animated fadeIn',
                loading: false
            });
        })
    }

    render() {
        return (
            <div>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}
                    style={{ minHeight: '410px' }}>
                    <Row type="flex" justify="center">
                        <Col className="Menu" span={4}>
                            <div style={{ height: ((wheight - 150 + 'px')) }} className="newsGuide">
                                <FreeScrollBar autohide={true} timeout={1000}>
                                    <Menu defaultSelectedKeys={[this.state.keyselect.toString()]}
                                        onSelect={this.selectNews.bind(this)}
                                        className="newsMenu">
                                        {this.state.newlistlist.map((x, index) => {
                                            return (<Menu.Item key={index} newid={x.Id} className="newsMenuli">
                                                {x.Title}
                                                <p className="newCreatetime">-{new Date(x.CreateTime).toLocaleDateString()}</p>
                                            </Menu.Item>)
                                        })}
                                    </Menu>
                                </FreeScrollBar>
                            </div>
                        </Col>
                        <Col span={16}>
                            <Row className={this.state.newsAcitve} style={{ padding: '50px 0px' }}>
                                <h1 className="newsTitle" ref="NewsTitle"><span>-</span></h1>
                                <div className="newsModal" ref="NewsContent"></div>
                            </Row>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

