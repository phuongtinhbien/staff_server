import React, { Component } from 'react'
import QrReader from 'react-qr-scanner';
 
class QrScan extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
 
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
      align: 'center',
    }
    let {handleScan} = this.props;
    return(
      <div className="text-center">
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={handleScan}
          
          />
      </div>
    )
  }
}

export default QrScan;