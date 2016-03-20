//a component for the modal that will pop up when the picture is clicked
import React, { PropTypes, Component } from 'react';
import styles from '../../../public/css/demo.css';
import Slider from 'react-slider';

export default class DemoModal extends React.Component{
  
  static propTypes = {
    lowImageSrc: PropTypes.string,
    medImageSrc: PropTypes.string,
    highImageSrc: PropTypes.string,
    beforeImageSrc: PropTypes.string,

  };

  //default prop values
  static defaultProps = {
    lowImageSrc: '',
    medImageSrc: '',
    highImageSrc: '',
    beforeImageSrc: '',
  };

  state = {pressed:true, after:this.props.medImageSrc, available:true};

  //will display original when the picture in the modal is pressed down
  handleClick = () => {
    this.setState({pressed: !this.state.pressed})
  };

  handleSlider = (value) => {
    switch (value) {
      case 1:
        if (this.props.lowImageSrc == '') { 
          this.setState({available: false}); 
        } else {
          this.setState({after: this.props.lowImageSrc, available: true}); 
        }
        break;
      case 2:
        if (this.props.medImageSrc == '') {
          this.setState({available: false}); 
        } else {
          this.setState({after: this.props.medImageSrc, available: true});
        }
        break;
      default:
        if (this.props.highImageSrc == '') {
          this.setState({available: false}); 
        } else {
          this.setState({after: this.props.highImageSrc, available: true});
        }
        break;
    }
  };

  render() {
    const {beforeImageSrc} = this.props;
    var imageText = this.state.pressed ? 'after' : 'before';
    var pic = this.state.pressed ? this.state.after : beforeImageSrc;
    return (
      <div className='demoModal'>
        {this.state.available ? '' : <div className='notAvailable'>Image Not Available</div>}
        <img src={pic} onMouseDown={this.handleClick}
            onMouseUp={this.handleClick}/>
        <div className='pressLabel'>Press and hold the image to see it before 
            it was popped</div>
        <h3>Level of Contrast</h3>
        <p>Adjust the amount of edge contrast using the indicators below.</p>
        <div className='sliderWrapper'>
          <Slider  defaultValue={2} min={1} max={3} step={1} withBars 
              onChange={this.handleSlider}>
            <div className='handle'/>
          </Slider>
          <div className='label labelLeft'>low</div>
          <div className='label'>med</div>
          <div className='label labelRight'>high</div>
        </div>
      </div>
    );
  }
}