import React, { cloneElement } from 'react';

import createChainedFunction from './utils/createChainedFunction';
import createContextWrapper from './utils/createContextWrapper';

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

const OverlayTrigger = React.createClass({

  propTypes: {
    trigger: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['manual', 'click', 'hover', 'focus']),
      React.PropTypes.arrayOf(React.PropTypes.oneOf(['click', 'hover', 'focus']))
    ]),
    placement: React.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    delay: React.PropTypes.number,
    delayShow: React.PropTypes.number,
    delayHide: React.PropTypes.number,

    defaultOverlayShown: React.PropTypes.bool,
    overlay: React.PropTypes.oneOfType([
      React.PropTypes.func,
      React.PropTypes.node
    ]),
    containerPadding: React.PropTypes.number,
    rootClose: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      placement: 'right',
      trigger: ['hover', 'focus'],
      containerPadding: 0
    };
  },

  getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ?
        false : this.props.defaultOverlayShown
    };
  },

  show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },

  componentDidMount(){
    this._overlay = document.createElement('div');
    React.render(this.getOverlay(), this._overlay);
  },

  componentWillUnmount() {
    React.unmountComponentAtNode(this._overlay);
    this._overlay = null;
    clearTimeout(this._hoverDelay);
  },

  componentDidUpdate(){
    React.render(this.getOverlay(), this._overlay);
  },

  getOverlay(){
    let overlay = this.props.overlay;

    if ( typeof overlay === 'function'){
      overlay = overlay(this.state.isOverlayShown, this.hide);
    } else {
      overlay = cloneElement(overlay, {
        show: this.state.isOverlayShown,
        onHide: createChainedFunction(this.hide, overlay.props.onHide)
      });
    }

    return overlay;
  },

  render() {
    const child = React.Children.only(this.props.children);

    if (this.props.trigger === 'manual') {
      return child;
    }

    const props = {};

    props.onClick = createChainedFunction(child.props.onClick, this.props.onClick);

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = createChainedFunction(this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      props.onMouseOver = createChainedFunction(this.handleDelayedShow, this.props.onMouseOver);
      props.onMouseOut = createChainedFunction(this.handleDelayedHide, this.props.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = createChainedFunction(this.handleDelayedShow, this.props.onFocus);
      props.onBlur = createChainedFunction(this.handleDelayedHide, this.props.onBlur);
    }

    return cloneElement(
      child,
      props
    );
  },

  handleDelayedShow() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayShow != null ?
      this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverDelay = setTimeout(() => {
      this._hoverDelay = null;
      this.show();
    }, delay);
  },

  handleDelayedHide() {
    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    const delay = this.props.delayHide != null ?
      this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverDelay = setTimeout(() => {
      this._hoverDelay = null;
      this.hide();
    }, delay);
  }

});

/**
 * Creates a new OverlayTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default OverlayTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
OverlayTrigger.withContext = createContextWrapper(OverlayTrigger, 'overlay');

export default OverlayTrigger;
