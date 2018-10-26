import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

class VectorMap extends Component {
  state = {
    viewport: {
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8,
      bearing: 0,
      pitch: 0,
      width: 300,
      height: 300
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    let size = this.container.getBoundingClientRect();
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: size.width - 60,
        height: size.height-30,
        margin: 30
      }
    });
  }

  _onViewportChange = viewport => this.setState({viewport});

  render() {
    let { width, height } = this.state;
    return (
      <div
        className="card"
        style={{ width: width, height: height, boxSizing: 'border-box' }}
        ref={container => this.container = container}>
        <div className="content">
          <ReactMapGL
            {...this.state.viewport} onViewportChange={this._onViewportChange} />
        </div>
      </div>

    )
  }
}

export default VectorMap;