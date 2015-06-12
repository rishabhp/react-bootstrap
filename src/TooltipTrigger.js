import React from 'react';
import OverlayTrigger from './OverlayTrigger';
import Tooltip from './Tooltip';

const TooltipTrigger = React.createClass({

  propTypes: {
    tooltip: React.PropTypes.oneOfType([
      React.PropTypes.node,
      React.PropTypes.arrayOf(React.PropTypes.node)
    ]).isRequired,
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
  },

  getOverlay(show, onHide){
    let { tooltip, ...props } = this.props;

    return (
      <Tooltip
        {...props}
        show={show} onHide={onHide}
        placement={this.props.placement}
        container={React.findDOMNode(this.props.container) || document.body}
        target={()=> React.findDOMNode(this)}
      >
        { this.props.tooltip }
      </Tooltip>
    );
  },

  render() {
    let { tooltip, ...props } = this.props;

    return <OverlayTrigger {...props} overlay={this.getOverlay} />;
  }
});


TooltipTrigger.withContext = OverlayTrigger.withContext;

export default TooltipTrigger;
