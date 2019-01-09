import React, { Component } from 'react';

const withSplitting = (getComponent: () => any) => {
    // 여기서 getComponent 는 () => import('./SplitMe') 의 형태로 함수가 전달되야합니다.
    class WithSplitting extends Component {
      state: {Splitted: any} = {
        Splitted: null
      };
  
      constructor(props: any) {
        super(props);
        getComponent().then(({ default: Splitted }: any) => {
          this.setState({
            Splitted
          });
        });
      }
  
      render() {
        const { Splitted } = this.state;
        if (!Splitted) {
          return null;
        }
        return <Splitted {...this.props} />;
      }
    }
  
    return WithSplitting;
  };
  
  export default withSplitting;