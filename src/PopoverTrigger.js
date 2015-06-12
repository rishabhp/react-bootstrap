import React from 'react';
import OverlayTrigger from './OverlayTrigger';
import Popover from './Popover';

const PopoverTrigger = React.createClass({

  propTypes: {
    popover: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.arrayOf(React.PropTypes.node)
    ]).isRequired,
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
  },

  getOverlay(show, onHide){
    let { popover, ...props } = this.props;

    return (
      <Popover
        {...props}
        show={show} onHide={onHide}
        container={React.findDOMNode(props.container) || document.body}
        target={()=> React.findDOMNode(this)}
      >
        { popover }
      </Popover>
    );
  },

  render() {
    let { popover, ...props } = this.props;

    return <OverlayTrigger {...props} overlay={this.getOverlay} />;
  }
});


PopoverTrigger.withContext = OverlayTrigger.withContext;

export default PopoverTrigger;
