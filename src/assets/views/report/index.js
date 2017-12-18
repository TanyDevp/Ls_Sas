import React, { Component } from 'react';
import { Row, Col, Menu, DatePicker, Spin, Modal } from 'antd';
import './index.css';
import moment from 'moment';
import ScoreBlock from './scoreBlock/app.js';
import AssData from './assessmentData/app.js';
import BaseFunction from '../../common/common.js';
//---------------------------------------------------
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { MonthPicker } = DatePicker;
const monthFormat = 'YYYY-MM';

const assMonth = () => {
    let now = new Date();
    if (now.getDate() > 6) {
        return moment().add(-1, 'months');
    }
    else {
        return moment().add(-2, 'months');
    }
};


export default class MenuIndex1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            keyselect: 0,
            serieslist: [],
            month: '2017-06',
            modalVisible: false,
            modularName: '',
            assData: {
                seriesName: '',
                idx: '',
                SeriesSumScore: '',
                SupplierNameScore: '',
                SupplierLevel: '',
                detailsData: []
            }
        }
    }

    componentDidMount() {
        this.selectDate();
    }

    selectDate(Month) {
        let _this = this;
        _this.setState({
            loading: true
        })
        let month = Month === null ? {} : { Month };
        BaseFunction.getServerData('SupplierPerformance/SupplierScore', month, function (data) {
            let tdata = data.slist;
            let keyselect = _this.state.keyselect;
            let bdata = tdata.map((x, idx) => {
                return {
                    seriesName: x.Series,
                    idx: idx,
                    SeriesSumScore: x.SeriesSumScore,
                    SupplierNameScore: x.SupplierNameScore,
                    SupplierLevel: x.SupplierLevel,
                    SupplierNameSort: x.SupplierNameSort,
                    detailsData: [{
                        key: '配合度',
                        value: x.AssistScore,
                        details: {}
                    }, {
                        key: '售后',
                        value: x.AfterSalesLastScore,
                        details: {
                            AfterSort: x.AfterSort,
                            SendGoods: x.SendGoods,
                            CurServiceCount: x.CurServiceCount,
                            AfterSalesRate: x.AfterSalesRate,
                            StandardValue: x.StandardValue,
                            DifferenceValue: x.DifferenceValue,
                            AfterSalesScore: x.AfterSalesScore,
                        }
                    }, {
                        key: '达交率',
                        value: x.UpToTheLastScore,
                        details: {
                            UpToTheSort: x.UpToTheSort,
                            PurchaseQty: x.PurchaseQty,
                            PaidQty: x.PaidQty,
                            UpToTheRate: x.UpToTheRate,
                            UpToTheScore: x.UpToTheScore,
                        }
                    }, {
                        key: '补件',
                        value: x.BJLastScore,
                        details: {
                            BJSort: x.BJSort,
                            BujianSum: x.BujianSum,
                            AnShiSum: x.AnShiSum,
                            BJRate: x.BJRate,
                            BJScore: x.BJScore,
                        }
                    }, {
                        key: '价格',
                        value: x.PriceLastScore,
                        details: {
                            SeriesPriceSum: x.SeriesPriceSum,
                            MinPriceSum: x.MinPriceSum,
                            PriceRate: x.PriceRate,
                            PriceScore: x.PriceScore,
                        }
                    }]
                }
            });
            let month = moment(data.slist[0].PerformanceMonth).format(monthFormat);
            _this.setState({
                loading: false,
                serieslist: bdata,
                assData: bdata[keyselect],
                keyselect: keyselect,
                month: month
            });
        });
    }

    selectSeries(data) {
        let keyselect = data.key || 0;
        this.setState({
            keyselect: keyselect,
            assData: this.state.serieslist[keyselect]
        })
    }

    disabledDate(current) {
        return current
            && (current.valueOf() < new Date('2017-03-01')
                || current.valueOf() > new Date(assMonth().add(1, 'months').format(monthFormat) + '-01'));
    }

    changeDate(date, dateString) {
        this.selectDate(dateString);
    }

    setloading(modular) {
        this.setState({
            modalVisible: true,
            modularName: modular
        });
    }

    render() {
        return (
            <div>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}
                    style={{ minHeight: '410px' }}>
                    <Row type="flex" justify="center">
                        <Col className="Menu" span={4}>
                            <MonthPicker size={'large'}
                                defaultValue={assMonth()}
                                disabledDate={this.disabledDate}
                                onChange={this.changeDate.bind(this)}
                                style={{ width: 120, marginTop: '20px', fontSize: '14px' }}>
                            </MonthPicker>
                            <div>
                                <Menu defaultSelectedKeys={[this.state.keyselect.toString()]} onSelect={this.selectSeries.bind(this)} style={{ marginTop: '10px', float: 'right', width: '200px' }}>
                                    {this.state.serieslist.map(x => {
                                        return (<Menu.Item key={x.idx}>{x.seriesName}</Menu.Item>)
                                    })}
                                </Menu>
                            </div>
                        </Col>
                        <Col span={14}>
                            <Row style={{ padding: '50px 10px' }}>
                                <div className="seriesTitle">
                                    <h1>{this.state.assData.seriesName}</h1>
                                    <p>{this.state.month}</p>
                                </div>
                                <ScoreBlock data={this.state.assData} datainfoFun={this.setloading.bind(this)} />
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        {this.state.modalVisible === true ? (<Modal
                            title={this.state.modularName + "详情数据"}
                            visible={this.state.modalVisible}
                            footer={null}
                            width="80%"
                            style={{ top: 20 }}
                            onCancel={() => this.setState({ modalVisible: false })}
                        >
                            <AssData
                                modular={this.state.modularName}
                                seriesName={this.state.assData.seriesName}
                                month={this.state.month}
                            />
                        </Modal>) : null}

                    </div>
                </Spin>
            </div>
        );
    }
}

