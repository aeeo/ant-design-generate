import { Button, message } from 'antd';
import React, { Component } from 'react';

export default class test extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
    console.debug('123');
  }
  changeCount() {
    this.setState({
      count: this.state.count + 1,
    });
  }
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    console.debug(prevState);
    return {
      a: prevState.count,
    };
  }
  render() {
    return (
      <div>
        <p>数值：{this.state.count}</p>
        <p>a:{this.state.a}</p>
        <Button onClick={this.changeCount.bind(this)}>点击</Button>
      </div>
    );
  }
}
