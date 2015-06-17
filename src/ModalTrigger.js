import React, { cloneElement } from 'react';
import warning from 'react/lib/warning';
import OverlayMixin from './OverlayMixin';

import createChainedFunction from './utils/createChainedFunction';
import createContextWrapper from './utils/createContextWrapper';

function createHideDepreciationWrapper(hide){
  return function(...args){
    warning(false,
      'The Modal prop `onRequestHide` has been renamed to `onHide`. `onRequestHide` will be removed in a future version');
    return hide(...args);
  };
}

const ModalTrigger = React.createClass({

  propTypes: {
    modal: React.PropTypes.node.isRequired
  },

  getInitialState() {
    return {
      isOverlayShown: false
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
    this.setState({
      isOverlayShown: !this.state.isOverlayShown
    });
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

  getOverlay() {
    let modal = this.props.modal;

    return cloneElement(
      modal,
      {
        show: this.state.isOverlayShown,
        onHide: this.hide,
        onRequestHide: createHideDepreciationWrapper(this.hide),
        container: modal.props.container || this.props.container
      }
    );
  },

  render() {
    let child = React.Children.only(this.props.children);
    let props = {};

    props.onClick = createChainedFunction(child.props.onClick, this.toggle);
    props.onMouseOver = createChainedFunction(child.props.onMouseOver, this.props.onMouseOver);
    props.onMouseOut = createChainedFunction(child.props.onMouseOut, this.props.onMouseOut);
    props.onFocus = createChainedFunction(child.props.onFocus, this.props.onFocus);
    props.onBlur = createChainedFunction(child.props.onBlur, this.props.onBlur);

    return cloneElement(child, props);
  }
});

/**
 * Creates a new ModalTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default ModalTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
ModalTrigger.withContext = createContextWrapper(ModalTrigger, 'modal');

let DepreciatedModalTrigger = React.createClass({
  componentWillMount(){
    warning(false, 'The `ModalTrigger` component has been depreciated. Please see the new examples at: ' +
     'http://react-bootstrap.github.io/components.html#modals');
  },

  render(){
    return (<ModalTrigger {...this.props}/>);
  }
});

DepreciatedModalTrigger.withContext = ModalTrigger.withContext;
DepreciatedModalTrigger.ModalTrigger = ModalTrigger;

export default DepreciatedModalTrigger;
