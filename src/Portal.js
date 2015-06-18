import React from 'react';
import { OverlayMixin } from './OverlayMixin';

let prop = 'hi';

let obj = { prop: ...prop };

let Portal = React.createClass({

  prop: obj,

  displayName: 'Portal',

  // we use the mixin for now, to avoid duplicating a bunch of code.
  // when the deprecation is removed we need to move the logic here from OVerlayMixin
  mixins: [ OverlayMixin ],

  propTypes: {
    onRootClose: React.PropTypes.func,
    rootClose:   React.PropTypes.bool
  },

  renderOverlay() {
    if (!this.props.children) {
      return null;
    }

    return React.Children.only(this.props.children);
  },

  render() {
    return null;
  }
});


export default Portal;
