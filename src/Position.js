import React, { cloneElement } from 'react';
import domUtils from './utils/domUtils';
import { calcOverlayPosition } from './utils/overlayPositionUtils';
import CustomPropTypes from './utils/CustomPropTypes';

class PositionedComponent extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      positionLeft: null,
      positionTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  }

  componentWillMount(){
    this._needsflush = true;
  }

  componentWillRecieveProps(){
    this._needsflush = true;
  }

  componentDidMount(){
    if ( !this._needsflush ) { return; }
    this._needsflush = false;
    this._updatePosition();
  }
  componentDidUpate(){
    if ( !this._needsflush ) { return; }
    this._needsflush = false;
    this._updatePosition();
  }

  render() {
    let { placement, children } = this.props;
    let { positionLeft, positionTop, ...arrows } = this.props.target ? this.state : {};

    return cloneElement(
      React.Children.only(children), {
        ...arrows,
        positionTop,
        positionLeft,
        // style: {
        //   ...children.props.style,
        //   left: positionLeft,
        //   top: positionTop
        // }
      }
    );
  }

  _updatePosition() {
    if ( this.props.target == null ){
      return;
    }

    let target = React.findDOMNode(this.props.target(this.props));
    let container = React.findDOMNode(this.props.container) || domUtils.ownerDocument(this).body;

    this.setState(
      calcOverlayPosition(
          this.props.placement
        , React.findDOMNode(this)
        , target
        , container
        , this.props.containerPadding));
  }
}

PositionedComponent.propTypes = {
  target:           React.PropTypes.func,
  container:        CustomPropTypes.mountable,
  containerPadding: React.PropTypes.number,
  placement:        React.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

PositionedComponent.defaultProps = {
  containerPadding: 0,
  placement:        'right'
};


export default PositionedComponent;
