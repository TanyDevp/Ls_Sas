import React, { Component } from 'react';
import { Row, Col, Spin, Table, Select } from 'antd';
import BaseFunction from '../../common/common.js';
import moment from 'moment';
import './index.css';

const Option = Select.Option;
const tun = { SupplierName: '供应商名称', SupplierLevel: '季度评级', Remark: '备注' };
const fidlist = ['SupplierName', 'SupplierLevel', 'Remark'];

export default class QuarterData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataColums: [],
            datalist: [],
        }
    }

    componentDidMount() {
        let month;
        let now = new Date();
        if (now.getDate() > 6) {
            month = moment().add(-1, 'months').format("YYYY-MM");
        }
        else {
            month = moment().add(-2, 'months').format("YYYY-MM");
        }
        this.selectDate(month);
    }

    selectDate(value) {
        let _this = this;
        _this.setState({
            loading: true,
        });
        BaseFunction.getServerDatabyget('SupplierPerformance/GetQuarterlyRemove', {
            month: value,
            Supplier: ''
        }, data => {
            if (data.length > 0) {
                data.map((x, i) => x.key = i);
                let columns = [{
                    title: '序号',
                    dataIndex: 'key',
                    align: 'center',
                    render: (text, record, index) => text + 1,
                    sorter: (a, b) => Number(a.key) - Number(b.key),
                    width: 85
                }];
                for (let i in data[0]) {
                    if (fidlist.indexOf(i) > -1) {
                        columns.push({
                            dataIndex: i,
                            title: tun[i],
                            align: 'center',
                            width: i === 'SupplierName' ? 350 : i === 'Remark' ? 260 : 120
                            //sorter: (a, b) => a[i] > b[i],
                        })
                    }
                    else if (i === 'avgScore') {
                        columns.push({
                            dataIndex: i,
                            title: '季度总分',
                            align: 'center',
                            sorter: (a, b) => Number(a[i]) - Number(b[i]),
                            render: (value) => {
                                if (value) {
                                    return Number(value).toFixed(2);
                                }
                                return '-';
                            },
                            width: 120
                        })
                    }
                    else if (i === 'months' || i === 'key') {
                    }
                    else
                        columns.push({
                            dataIndex: i,
                            title: i,
                            align: 'center',
                            sorter: (a, b) => Number(a[i]) - Number(b[i]),
                            render: (value) => {
                                if (value) {
                                    return Number(value).toFixed(2);
                                }
                                return '-';
                            },
                            width: 120
                        })
                }

                _this.setState({
                    datalist: data,
                    dataColums: columns,
                    loading: false,
                });
            }
            else {
                _this.setState({
                    datalist: [],
                    dataColums: [],
                    loading: false,
                });
            }
        });
    }

    bindQuarterData() {
        let lt = [];
        let date = new Date();
        let year = date.getFullYear();
        let months = date.getMonth();
        let jdturn = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 1];
        let jdtomonth = [1, 4, 7, 10]
        for (let i = year; i >= 2017; i--) {
            if (year === i) {
                for (let t = jdturn[months - 1] - 1; t >= 0; t--) {
                    lt.push({
                        month: year + "-" + jdtomonth[t],
                        quarter: year + "年第" + Number(t + 1) + "季度"
                    });
                }
            }
            else {
                [3, 2, 1, 0].map(x => {
                    lt.push({
                        month: year + "-" + jdtomonth[x],
                        quarter: year + "年第" + Number(x + 1) + "季度"
                    });
                    return x;
                });
            }
        }
        return (<Select
            defaultValue={lt.length > 0 ? lt[0].month : ""}
            showSearch
            className="QuarterSelect"
            style={{ width: 200 }}
            placeholder="请选择季度"
            optionFilterProp="children"
            onSelect={this.selectDate.bind(this)}
        >
            {lt.map((x, i) => {
                return (<Option key={i} value={x.month}>{x.quarter}</Option>);
            })}
        </Select>)
    }

    render() {
        return (
            <div>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}>
                    <Row type="flex" justify="center">
                        <Col span={20} style={{ padding: '20px', background: '#f3f3f3' }}>
                            <Table
                                className="quarterTable"
                                columns={this.state.dataColums}
                                dataSource={this.state.datalist}
                                bordered
                                pagination={false}
                                scroll={{ y: 500 }}
                                title={() => (
                                    <div>
                                        <h1 style={{ textAlign: 'center', color: '#fff' }}>林氏木业本季度战果播报</h1>
                                        <Row type="flex" justify="center">
                                            {this.bindQuarterData()}
                                        </Row>
                                    </div>
                                )
                                }>
                            </Table>
                        </Col>
                    </Row>
                </Spin>
            </div >
        );
    }
}

