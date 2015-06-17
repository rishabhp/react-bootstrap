import React from 'react';
import OverlayMixin from './OverlayMixin';
import RootCloseWrapper from './RootCloseWrapper';

let Portal = React.createClass({

  displayName: 'Portal',

  mixins: [ OverlayMixin ],

  propTypes: {
    show:      React.PropTypes.bool,
    onHide:    React.PropTypes.func,
    rootClose: React.PropTypes.bool
  },

  renderOverlay() {
    let show = this.props.show;

    if (!this.props.children || !show) {
      return null;
    }

    let tooltip = React.Children.only(this.props.children);

    if (this.props.rootClose) {
      return (
        <RootCloseWrapper onRootClose={this.props.onHide}>
          { tooltip }
        </RootCloseWrapper>
      );
    } else {
      return tooltip;
    }
  },

  render() {
    return null;
  }
});


export default Portal;
