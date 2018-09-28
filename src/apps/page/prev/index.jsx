/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import wei from '../../../images/wei.png'
import bu from '../../../images/bu.png';
import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Radio,
  List,
  Spin,
  Card,
  DatePicker,
  Select,
  Tabs,
  Form,
  TreeSelect
} from 'antd';
import 'moment/locale/zh-cn'

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const defaultState = {
  goods: [],
  preAsset: '',
  tmpAsset: ''
};

class Prev extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.asset !== this.props.asset)
      this.setState({
        asset: nextProps.asset
      });
  }

  handleTab(value) {
    console.log(value);
  }

  handleSelect(e) {
    // console.log(e.target.value);
    this.setState({preAsset: e.target.value, tmpAsset: e.target.value})
  }

  handleSubmit(e) {

    this.props.changeAsset({preAsset: this.state.preAsset, tmpAsset: this.state.tmpAsset})

  }


  componentDidMount() {
    this.props.fetchAsset();
  }

  render() {
    const {asset} = this.props;
    console.log(asset)
    return (

      <div className="prev">
          <div className="toptitle">
              <span className="mail">邮箱账号</span>
              <span className="name">zhangsan@sogou-inc.com</span>
          </div>
          <div className="detail">
              <div className="bigtitle">办公资产选择</div>
              <div className="prev">
                <span className='title'>预选资产</span>
                <img src={bu} className='bu' />
                {
                  asset&&asset.preAsset.map((item,i)=>{
                    return (<span key={i}>
                    <span className='level'> {item.split(',')[0]}</span>
                    <span className='sword'>></span>
                    <span className='level'> {item.split(',')[1]}  </span>
                    </span>)
                  })
                }
              </div>
              <div className="temp">
                <span className='title'>临时资产</span>
                {
                  asset&&asset.tmpAsset.map((item,i)=>{
                  return (<span key={i}>
                    <span className='level'> {item.split(',')[0]}</span>
                    <span className='sword'>></span>
                    <span className='level'> {item.split(',')[1]}  </span>
                    </span>)
                  })
                }
              </div>
              <div className="default">
                <span className='title'>默认耗材</span>
                {
                  asset&&asset.dftCmls.map((item,i)=>{
                    return <span key={i} className='level'>{item}  </span>
                  })
                }
              </div>
          </div>
          <div className="xiaop">
              <div className="bigtitle">预装办公软件</div>
              <img src={wei} alt=""/>
              <div className="install">日常办公必备，请提前扫码安装</div>
          </div>
        <div className="buttonclub">
          <Button type="primary" onClick={this.handleSubmit}>完成</Button>
          <Link to="/mail">
            <Button type="primary">上一步</Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    asset: state.asset.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchAsset: (payload) => dispatch({
    type: actionTypes.FETCH_ASSET,
  }),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Prev));





