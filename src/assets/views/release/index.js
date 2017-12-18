import React, { Component } from 'react';
import { Row, Col, Spin } from 'antd';
import BaseFunction from '../../common/common.js';
import './index.css';
import Series from './series/app.js';
export default class Release extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datalist: []
        };
    }

    componentDidMount() {
        let _this = this;
        BaseFunction.getServerData('SupplierPerformance/getSupplierRelease', {}, data => {
            _this.setState({
                datalist: data.datalist,
                loading: false,
            });

        });
    }

    render() {
        return (
            <div style={{ padding: '50px 10px' }}>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}
                    style={{ minHeight: '410px' }}>
                    <Row type="flex" justify="center" className="releaseRow">
                        <Col span={22}>
                            <Row type="flex">
                                {this.state.datalist.map((x, i) => {
                                    return (
                                        <Col span={6} key={i} className="releaseCol">
                                            <Series data={x} />
                                        </Col>)
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Spin>
            </div>
        );
    }
}

