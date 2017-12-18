import React, { Component } from 'react';
import { Row, Col, } from 'antd';
// import createHistory from 'history/createHashHistory';
import './app.css';

import simg from '../../../img/series.jpg';
// const history = createHistory();

const SeriesType = {
    0: '筹备中',
    1: '进行中',
    2: '已结束'
}
export default class Series extends Component {

    SeriesSelect(tdata) {
        window.open('/#/commodity?sid=' + tdata.SeriesId)
    }

    render() {
        const tdata = this.props.data;

        return (
            <div className="releaseBlock">
                <img src={tdata.SeriesPic || simg} alt="" onClick={this.SeriesSelect.bind(this, tdata)} style={{ width: '100%',height:'220px', cursor: 'pointer', opacity: tdata.SeriesType > 1 ? 0.5 : 1 }} />
                <div className="seriesState">{SeriesType[tdata.SeriesType]}</div>
                <div className="releaseClass">
                    <Row>
                        <h2 className="seriesName">{tdata.SeriesName}</h2>
                    </Row>
                    <Row>
                        <Col span={12}>意向工厂：<span className="danger">{tdata.IntentionNum || 0}家</span></Col>
                        <Col span={12}>洽谈工厂：<span className="danger">{tdata.NegotiateNum || 0}家</span></Col>
                    </Row>
                    <Row>
                        <Col span={12}>需求量：<span className="danger">{tdata.Requirement}</span></Col>
                        <Col span={12}>利润点：<span className="danger">{tdata.Profit}</span></Col>
                    </Row>
                </div>
            </div>
        );
    }
}

