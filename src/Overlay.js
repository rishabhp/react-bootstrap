/*eslint-disable object-shorthand, react/prop-types */
import React from 'react';
import Portal from './Portal';
import Position from './Position';
import RootCloseWrapper from './RootCloseWrapper';

class Overlay extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render(){
    let {
        container
      , containerPadding
      , target
      , placement
      , rootClose
      , ...props } = this.props;

    let positionedChild = (
      <Position {...{ container, containerPadding, target, placement }}>
        { this.props.children }
      </Position>
    );

    if (rootClose) {
      positionedChild = (
        <RootCloseWrapper onRootClose={this.props.onHide}>
          { positionedChild }
        </RootCloseWrapper>
      );
    }

    return (
      <Portal container={container} rootClose={rootClose} onRootClose={this.props.onHide}>
      { props.show &&
          positionedChild
      }
      </Portal>
    );
  }
}

Overlay.propTypes = {
  ...Portal.propTypes,
  ...Position.propTypes,
  show: React.PropTypes.bool,
  rootClose: React.PropTypes.bool,
  onHide: React.PropTypes.func
};

export default Overlay;
