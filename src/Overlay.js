/*eslint-disable object-shorthand, react/prop-types */
import React from 'react';
import Portal from './Portal';
import Position from './Position';

class Overlay extends React.Component {

  constructor(props, context){
    super(props, context);
    this.state = { show: false };
  }

  render(){
    let {
        container
      , containerPadding
      , target
      , placement
      , ...props } = this.props;

    return (
      <Portal show={props.show} container={container}>
        <Position {...{ container, containerPadding, target, placement }}>
          { this.props.children }
        </Position>
      </Portal>
    );
  }
}

Overlay.propTypes = {
  ...Portal.propTypes,
  ...Position.propTypes
};

export default Overlay;
