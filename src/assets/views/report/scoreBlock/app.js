import React, { Component } from 'react';
import { Row, Col, } from 'antd';
import './app.css';


const bulidJson = {
    SendGoods: '发货数',
    CurServiceCount: '售后责任数',
    AfterSalesRate: '售后合格率',
    StandardValue: '标准值',
    DifferenceValue: '差值',
    AfterSalesScore: '售后评分',
    PurchaseQty: '当月交期总数量',
    PaidQty: '当月按时完成数量',
    UpToTheRate: '达交率',
    UpToTheScore: '达交评分',
    BujianSum: '补件总行数',
    AnShiSum: '按时完成行数',
    BJRate: '按时达交比例',
    BJScore: '补件评分',
    SeriesPriceSum: '价格汇总',
    MinPriceSum: '最低价格',
    PriceRate: '价格比率',
    PriceScore: '价格评分',
    AfterSort: '排名',
    UpToTheSort: '排名',
    BJSort: '排名',
};

export default class ScoreBlock extends Component {

    assDataInfo(modular) {
        //window.open('/assessmentdata');
        this.props.datainfoFun(modular);
    }

    render() {
        return (
            <div>
                <Row className="scoreBlock active" style={{ color: '#fced00' }}>
                    <Col span={5}>得分：{this.props.data.SeriesSumScore}</Col>
                    <Col span={5}>综合得分：{this.props.data.SupplierNameScore}</Col>
                    <Col span={3} offset={8} style={{ textAlign: 'right' }}>评级：{this.props.data.SupplierLevel}</Col>
                    <Col span={3} style={{ textAlign: 'right' }}>排名：{this.props.data.SupplierNameSort}</Col>
                </Row>
                {this.props.data.detailsData.map((x, i) => {
                    return (
                        <Row key={i}>
                            <Row className="scoreBlock">
                                <Col span={4}>{x.key}</Col>
                                <Col span={8} offset={12} style={{ textAlign: 'right' }}>单元评分：{x.value}</Col>
                                {x.key === '配合度' ? null : (<div className="arrow"></div>)}
                            </Row>
                            <Row>
                                {Object.keys(x.details).map((k, ii) => {
                                    return (
                                        <div className="scoreinfo" key={ii}>
                                            <p className='scoreType'>{bulidJson[k]}</p>
                                            <p className='scoreValue'>{x.details[k]}</p>
                                        </div>
                                    )
                                })}
                            </Row>
                            {x.key === '配合度' ? null : (
                                <Row style={{ padding: "0px 20px" }}>
                                    <a onClick={this.assDataInfo.bind(this, x.key)}>查看详情数据>></a>
                                </Row>
                            )}
                        </Row>
                    )
                })}
            </div>
        );
    }
}

