import React, { Component } from 'react';
import { Row, Col, Spin, Button, Icon, Table, Steps, Modal, message } from 'antd';
import BaseFunction from '../../common/common.js';
import './index.css';



const columns = [{
    title: '序号',
    dataIndex: 'rownum',
    align: 'center',
    className: 'commodityTableRow',
    render: (text, record, index) => index + 1
}, {
    title: '型号',
    align: 'center',
    dataIndex: 'ItemName',
    className: 'commodityTableRow',
}, {
    title: '编码',
    dataIndex: 'SkuCode',
    className: 'commodityTableRow',
    align: 'center',
}, {
    title: '规格描述',
    className: 'commodityTableRow',
    dataIndex: 'SkuName',
}, {
    title: '需求量',
    dataIndex: 'Requirement',
    className: 'commodityTableRow',
    align: 'center',
    render: (text, record, index) => Number(text).toFixed(2),
    sorter: (a, b) => Number(a.Requirement) - Number(b.Requirement),
}];

const Subcolumns = [
    {
        title: '序号',
        dataIndex: 'rownum',
        align: 'center',
        className: 'commodityTableRow',
        render: (text, record, index) => index + 1,
        width: 85
    },
    { title: '物料编码', dataIndex: 'MaterialCode', align: 'center', width: 170, className: 'commodityTableRow' },
    { title: '物料名称', dataIndex: 'MaterialName', align: 'center', width: 455, className: 'commodityTableRow' },
    {
        title: '用量',
        dataIndex: 'MaterialQty',
        align: 'center',
        width: 170,
        className: 'commodityTableRow',
        sorter: (a, b) => Number(a.MaterialQty) - Number(b.MaterialQty),
        render: (text, record, index) => Number(text).toFixed(2),
    },
    { title: '单位', dataIndex: 'MaterialUnit', align: 'center', width: 130, className: 'commodityTableRow' },
];

const search = window.location.hash.replace('?', '');

const tid = search.split('=')[1];

export default class Commodity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            datalist: [],
            visible: false,
            confirmLoading: false,
            isCom: false,
            seriesState: 0,
            seriesName: null
        };
    }

    componentDidMount() {
        let _this = this;
        BaseFunction.getServerData('SupplierPerformance/getSupplierReleaseInfo', {
            SeriesId: tid
        }, data => {
            let tdata = data.datalist.map((x, i) => {
                return {
                    key: i,
                    ItemName: x.ItemName,
                    SkuCode: x.SkuCode,
                    SkuName: x.SkuName,
                    Requirement: x.Requirement,
                    SkuData: x.SkuData
                }

            });
            _this.setState({
                loading: false,
                datalist: tdata,
                isCom: data.IsCom,
                seriesState: data.State,
                seriesName: data.datalist[0].SeriesName
            });
        });
    }

    sureCooperate() {
        this.setState({
            visible: true
        });
    }

    handleCancel() {
        this.setState({
            visible: false
        });
    }

    suertoCooperation() {
        this.setState({
            confirmLoading: true
        });
        let _this = this;
        BaseFunction.getServerData('SupplierPerformance/LaunchCooperation', {
            SeriesId: tid
        }, data => {
            message.success('操作成功');
            _this.setState({
                confirmLoading: false,
                visible: false,
                isCom: true
            });
        });
    }

    downSeriesInfo() {
        let SeriesName = this.state.seriesName;
        window.open("http://113.105.237.98:8806/BSPRT-API/Muban/SupplierRelease/" + SeriesName + "/" + SeriesName + "资料.zip");
    }

    render() {
        return (
            <div style={{ padding: '50px 10px' }}>
                <Spin tip="数据加载中..."
                    spinning={this.state.loading}>
                    <Row type="flex" justify="center" className="releaseRow">
                        <Col span={22}>
                            <Row>
                                <Steps current={this.state.seriesState} className="CommoditySteps">
                                    <Steps.Step title="筹备中" />
                                    <Steps.Step title="进行中" />
                                    <Steps.Step title="已结束" status={this.state.seriesState > 1 ? 'finish' : 'wait'} />
                                </Steps>
                            </Row>
                            <Row className="commodityRow">
                                <Button type="primary"
                                    onClick={this.downSeriesInfo.bind(this)}
                                    size="large"
                                    style={{ fontSize: '18px', fontWeight: 600, marginRight: '10px' }}>
                                    <Icon type="download" />
                                    <span>下载文件</span>
                                </Button>
                                {this.state.isCom === true ? (<Button type="primary"
                                    disabled
                                    size="large"
                                    style={{ fontSize: '18px', fontWeight: 600 }}>
                                    <Icon type="smile-o" />
                                    <span>已参与</span>
                                </Button>) : (<Button type="primary"
                                    onClick={this.sureCooperate.bind(this)}
                                    size="large"
                                    style={{ fontSize: '18px', fontWeight: 600 }}>
                                    <Icon type="smile-o" />
                                    <span>有意向</span>
                                </Button>)}

                            </Row>

                            <Row className="commodityRow">
                                <p className="itemTitle">产品信息</p>
                            </Row>
                            <Row>
                                <Table
                                    bordered
                                    pagination={false}
                                    columns={columns}
                                    expandedRowRender={record => {
                                        return (
                                            <Table
                                                columns={Subcolumns}
                                                dataSource={record.SkuData}
                                                pagination={false}
                                                scroll={{ y: 260 }}
                                                size="small"
                                            />
                                        );
                                    }}
                                    dataSource={this.state.datalist} />
                            </Row>
                        </Col>
                    </Row>
                    <Modal title="合作确认框"
                        visible={this.state.visible}
                        onOk={this.suertoCooperation.bind(this)}
                        confirmLoading={this.state.confirmLoading}
                        okText="确定"
                        cancelText="取消"
                        onCancel={this.handleCancel.bind(this)}
                    >
                        <p>1</p>
                    </Modal>
                </Spin>
            </div >
        );
    }
}

