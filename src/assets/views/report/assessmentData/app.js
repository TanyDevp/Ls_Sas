import React, { Component } from 'react';
import { Row, Table } from 'antd';
import BaseFunction from '../../../common/common.js';
import moment from 'moment';
import './app.css';


//发货数
const AftermarketDetailColums = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    render: (text, record, index) => index + 1,
    width: 85
}, {
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 240
}, {
    title: '系列',
    dataIndex: '系列',
    align: 'center',
    width: 96
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 100
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 173
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 355
}, {
    title: '发货数',
    dataIndex: '发货数',
    align: 'center',
    width: 100,
    footer: true,
    sorter: (a, b) => Number(a["发货数"]) - Number(b["发货数"]),
}, {
    title: '发货日期',
    dataIndex: '发货日期',
    align: 'center',
    width: 128
}];

//售后数
const CurServerDetailColums = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    render: (text, record, index) => index + 1,
    width: 85
}, {
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 240
}, {
    title: '系列',
    dataIndex: '系列',
    align: 'center',
    width: 96
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 100
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 173
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 355
}, {
    title: '售后数',
    dataIndex: '售后数',
    align: 'center',
    width: 100,
    footer: true,
    sorter: (a, b) => Number(a["售后数"]) - Number(b["售后数"]),
}, {
    title: '售后日期',
    dataIndex: '售后日期',
    align: 'center',
    width: 128
}];

//应交数
const PurchaseDeliveryDetail = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    render: (text, record, index) => index + 1,
    width: 85
}, {
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 240
}, {
    title: '系列',
    dataIndex: '系列',
    align: 'center',
    width: 96
}, {
    title: '采购单号',
    dataIndex: '采购单号',
    align: 'center',
    width: 100
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 100
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 173
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 340
}, {
    title: '采购数',
    dataIndex: '采购数量',
    align: 'center',
    width: 120,
    footer: true,
    sorter: (a, b) => Number(a["采购数量"]) - Number(b["采购数量"]),
}, {
    title: '原定交期',
    dataIndex: '原定交期',
    align: 'center',
    width: 128
}];

//达交数
const PurchaseStorageDetail = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    render: (text, record, index) => index + 1,
    width: 85
}, {
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 240
}, {
    title: '系列',
    dataIndex: '系列',
    align: 'center',
    width: 96
}, {
    title: '采购单号',
    dataIndex: '采购单号',
    align: 'center',
    width: 100
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 100
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 173
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 340
}, {
    title: '交货数',
    dataIndex: '交货数量',
    align: 'center',
    width: 120,
    footer: true,
    sorter: (a, b) => Number(a["交货数量"]) - Number(b["交货数量"]),
}, {
    title: '原定交期',
    dataIndex: '原定交期',
    align: 'center',
    width: 128
}];

//补件
const SupplierPatch = [{
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 240
}, {
    title: '采购单号',
    dataIndex: '采购单号',
    align: 'center',
    width: 150
}, {
    title: '采购日期',
    dataIndex: '采购日期',
    align: 'center',
    width: 150,
    render: (value) => moment(value).format('YYYY-MM-DD')
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 150
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 150
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 300
}, {
    title: '采购数',
    dataIndex: '采购数量',
    align: 'center',
    width: 100,
}, {
    title: '交货数',
    dataIndex: '交货数量',
    align: 'center',
    width: 100,
}, {
    title: '协议交期',
    dataIndex: '协议交期',
    align: 'center',
    width: 128,
    render: (value) => moment(value).format('YYYY-MM-DD')
}, {
    title: '入库时间',
    dataIndex: '入库时间',
    align: 'center',
    width: 128,
    render: (value) => moment(value).format('YYYY-MM-DD')
}, {
    title: '状态',
    dataIndex: '状态',
    align: 'center',
    width: 100
}];


//价格
const SupplierPrice = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    render: (text, record, index) => index + 1,
    width: 85
}, {
    title: '供应商',
    dataIndex: '供应商',
    align: 'center',
    width: 260
}, {
    title: '系列',
    dataIndex: '系列',
    align: 'center',
    width: 96
}, {
    title: '林氏型号',
    dataIndex: '林氏型号',
    align: 'center',
    width: 100
}, {
    title: '林氏编码',
    dataIndex: '林氏编码',
    align: 'center',
    width: 173
}, {
    title: '编码描述',
    dataIndex: '编码描述',
    align: 'center',
    width: 355
}, {
    title: '价格',
    dataIndex: '价格',
    align: 'center',
    width: 128,
    sorter: (a, b) => Number(a["价格"]) - Number(b["价格"]),
}];


const supplierName = localStorage.user;

export default class AssData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataColums1: [],
            dataColums2: [],
            dataTitle1: null,
            dataTitle2: null,
            datalist1: [],
            datalist2: [],
        }
    }

    aftermarketDetail(seriesName, month) {
        let _this = this;
        BaseFunction.getServerDatabyget('SendGoodsDetail/GetSendGoodsDetail', {
            SupplierName: supplierName,
            Series: seriesName,
            SendGoodsTime: month
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist1: data,
                dataColums1: AftermarketDetailColums,
                loading: false,
                dataTitle1: supplierName + "[" + seriesName + "]发货明细"
            });
        });
        BaseFunction.getServerDatabyget('CurServerDetail/GetCurServerDetail', {
            SupplierName: supplierName,
            Series: seriesName,
            SHAduitTime: month
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist2: data,
                dataColums2: CurServerDetailColums,
                loading: false,
                dataTitle2: supplierName + "[" + seriesName + "]售后数据明细"
            });
        });
    }

    purchaseDeliveryDetail(seriesName, month) {
        let _this = this;
        BaseFunction.getServerDatabyget('PurchaseDeliveryDetail/GetPurchaseDeliveryDetail', {
            SupplierName: supplierName,
            Series: seriesName,
            DeliverDate: month
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist1: data,
                dataColums1: PurchaseDeliveryDetail,
                loading: false,
                dataTitle1: supplierName + "[" + seriesName + "]供应商应交明细"
            });
        });
        BaseFunction.getServerDatabyget('PurchaseStorageDetail/GetPurchaseStorageDetail', {
            SupplierName: supplierName,
            Series: seriesName,
            DeliverDate: month
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist2: data,
                dataColums2: PurchaseStorageDetail,
                loading: false,
                dataTitle2: supplierName + "[" + seriesName + "]达交明细"
            });
        });
    }

    supplierPatchDetail(seriesName, month) {
        let _this = this;
        BaseFunction.getServerDatabyget('SupplierPatchDetail/GetSupplierPatch', {
            SupplierName: supplierName,
            SendGoodsTime: month
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist1: data,
                dataColums1: SupplierPatch,
                loading: false,
                dataTitle1: supplierName + "-补件明细"
            });
        });
    }

    supplierPriceDetail(seriesName, month) {
        let _this = this;
        BaseFunction.getServerDatabyget('SupplierPriceDetail/GetSupplierPrice', {
            SupplierName: supplierName,
            Series: seriesName
        }, data => {
            data.map((x, i) => x.key = i);
            _this.setState({
                datalist1: data,
                dataColums1: SupplierPrice,
                loading: false,
                dataTitle1: supplierName + "-价格明细"
            });
        });
    }

    componentDidMount() {
        const seriesName = this.props.seriesName;
        const month = this.props.month;
        const moudler = this.props.modular;
        switch (moudler) {
            case '售后':
                this.aftermarketDetail(seriesName, month);
                break;
            case '达交率':
                this.purchaseDeliveryDetail(seriesName, month);
                break;
            case '补件':
                this.supplierPatchDetail(seriesName, month);
                break;
            case '价格':
                this.supplierPriceDetail(seriesName, month);
                break;
            default:
                break;
        }
    }

    sumArray(arr) {
        let sum = 0;
        arr.map(x => {
            sum += Number(x);
            return x;
        })
        return sum;
    }

    render() {
        return (
            <div>
                {this.state.datalist1.length > 0 ? (<Row>
                    <Table
                        columns={this.state.dataColums1}
                        dataSource={this.state.datalist1}
                        bordered
                        pagination={false}
                        scroll={{ y: 400 }}
                        title={() => (<h2 style={{ textAlign: 'center' }}>{this.state.dataTitle1}</h2>)}
                        footer={(currentPageData) => {
                            return (<table className="ant-tablefooter">
                                <tfoot>
                                    <tr>
                                        {
                                            this.state.dataColums1.filter(x => x.footer === true).length > 0 ?
                                                this.state.dataColums1.map((x, i) =>
                                                    (<td key={i} width={x.width}>
                                                        <span>
                                                            {i === 0 ? "合计：" : x.footer === true ? this.sumArray(this.state.datalist1.map(k => k[x.dataIndex])) : null}
                                                        </span>
                                                    </td>)) : null
                                        }
                                    </tr>
                                </tfoot>
                            </table>
                            )
                        }}
                    />
                </Row>) : null}
                {this.state.datalist2.length > 0 ? (<Row>
                    <Table
                        columns={this.state.dataColums2}
                        dataSource={this.state.datalist2}
                        bordered
                        pagination={false}
                        scroll={{ y: 400 }}
                        title={() => (<h2 style={{ textAlign: 'center' }}>{this.state.dataTitle2}</h2>)}
                        footer={(currentPageData) => {
                            return (<table className="ant-tablefooter">
                                <tfoot>
                                    <tr>
                                        {this.state.dataColums2.map((x, i) =>
                                            (<td key={i} width={x.width}>
                                                <span>
                                                    {i === 0 ? "合计：" : x.footer === true ? this.sumArray(this.state.datalist2.map(k => k[x.dataIndex])) : null}
                                                </span>
                                            </td>))
                                        }
                                    </tr>
                                </tfoot>
                            </table>
                            )
                        }}
                    />
                </Row>) : null}

            </div>
        );
    }
}

