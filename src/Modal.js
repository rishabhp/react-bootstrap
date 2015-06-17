import React, { cloneElement } from 'react';
import warning from 'react/lib/warning';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import BootstrapMixin from './BootstrapMixin';
import FadeMixin from './FadeMixin';
import domUtils from './utils/domUtils';
import EventListener from './utils/EventListener';


import Body from './ModalBody';
import Header from './ModalHeader';
import Title from './ModalTitle';
import Footer from './ModalFooter';


/**
 * Gets the correct clientHeight of the modal container
 * when the body/window/document you need to use the docElement clientHeight
 * @param  {HTMLElement} container
 * @param  {ReactElement|HTMLElement} context
 * @return {Number}
 */
function containerClientHeight(container, context) {
  let doc = domUtils.ownerDocument(context);

  return (container === doc.body || container === doc.documentElement)
      ? doc.documentElement.clientHeight
      : container.clientHeight;
}

function getContainer(context){
  return (context.props.container && React.findDOMNode(context.props.container)) ||
    domUtils.ownerDocument(context).body;
}

function toChildArray(children){
  let result = [];
  React.Children.forEach(children, c => result.push(c));
  return result;
}
/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
 * @param  {ReactElement|HTMLElement} context
 * @param  {Function} handler
 */
function onFocus(context, handler) {
  let doc = domUtils.ownerDocument(context);
  let useFocusin = !doc.addEventListener;
  let remove;

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = () => document.detachEvent('onfocusin', handler);
  } else {
    document.addEventListener('focus', handler, true);
    remove = () => document.removeEventListener('focus', handler, true);
  }
  return { remove };
}

let scrollbarSize;

if (domUtils.canUseDom) {
  let scrollDiv = document.createElement('div');

  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);

  scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  document.body.removeChild(scrollDiv);
  scrollDiv = null;
}

const Modal = React.createClass({

  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    title: React.PropTypes.node,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    onHide: React.PropTypes.func.isRequired,
    dialogClassName: React.PropTypes.string,
    enforceFocus: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true,
      closeButton: true,
      enforceFocus: true
    };
  },

  getInitialState(){
    return { };
  },

  render() {
    let state = this.state;
    let modalStyle = { ...state.dialogStyles, display: 'block'};
    let dialogClasses = this.getBsClassSet();

    delete dialogClasses.modal;
    dialogClasses['modal-dialog'] = true;

    let classes = {
      modal: true,
      fade: this.props.animation,
      'in': !this.props.animation
    };

    let modal = (
      <div
        {...this.props}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, classes)}
        onClick={this.props.backdrop === true ? this.handleBackdropClick : null}
        ref="modal">
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className="modal-content">
            { this.renderContent() }
          </div>
        </div>
      </div>
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal, state.backdropStyles) : modal;
  },

  renderContent() {
    let children = toChildArray(this.props.children); // b/c createFragment is in addons and children can be a key'd object
    let hasNewHeader = children.some( c => c.type.__isModalHeader);

    if (!hasNewHeader && this.props.closeButton || this.props.title != null){
      warning(false, 'Specifing `closeButton` or `title` props on a Modal is depreciated. ' +
        'Please use the new ModalHeader, and ModalTitle components instead');

      children.unshift(
        <Header closeButton={this.props.closeButton} onHide={this._getHide()}>
          { this.props.title &&
            <Title>{this.props.title}</Title>
          }
        </Header>
      );
    }

    return React.Children.map(children, child => {
      // TODO: use context in 0.14
      if (child.type.__isModalHeader) {
        return cloneElement(child, {
          onHide: createChainedFunction(this._getHide(), child.props.onHide)
        });
      }
      return child;
    });
  },

  renderBackdrop(modal) {
    let classes = {
      'modal-backdrop': true,
      fade: this.props.animation,
      'in': !this.props.animation
    };

    let onClick = this.props.backdrop === true ?
      this.handleBackdropClick : null;

    return (
      <div>
        <div className={classNames(classes)} ref="backdrop" onClick={onClick} />
        {modal}
      </div>
    );
  },

  _getHide(){
    warning(!(!this.props.onHide && this.props.onRequestHide),
      'The Modal prop `onRequestHide` has been renamed to `onHide`. `onRequestHide` will be removed in a future version');

    return this.props.onHide || this.props.onRequestHide;
  },

  iosClickHack() {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    React.findDOMNode(this.refs.modal).onclick = function () {};
    React.findDOMNode(this.refs.backdrop).onclick = function () {};
  },

  componentDidMount() {
    const doc = domUtils.ownerDocument(this);
    const win = domUtils.ownerWindow(this);

    this._onDocumentKeyupListener =
      EventListener.listen(doc, 'keyup', this.handleDocumentKeyUp);

    this._onWindowResizeListener =
        EventListener.listen(win, 'resize', this.handleWindowResize);

    if (this.props.enforceFocus) {
      this._onFocusinListener = onFocus(this, this.enforceFocus);
    }

    let container = getContainer(this);

    container.className += container.className.length ? ' modal-open' : 'modal-open';

    this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);

    this._originalPadding = container.style.paddingRight;

    if (this._containerIsOverflowing) {
      container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + scrollbarSize + 'px';
    }

    if (this.props.backdrop) {
      this.iosClickHack();
    }

    this.setState(this._getStyles() //eslint-disable-line react/no-did-mount-set-state
      , () => this.focusModalContent());
  },

  componentDidUpdate(prevProps) {
    if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
      this.iosClickHack();
      this.setState(this._getStyles()); //eslint-disable-line react/no-did-update-set-state
    }

    if (this.props.container !== prevProps.container) {
      let container = getContainer(this);
      this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);
    }
  },

  componentWillUnmount() {
    this._onDocumentKeyupListener.remove();
    this._onWindowResizeListener.remove();

    if (this._onFocusinListener) {
      this._onFocusinListener.remove();
    }

    let container = getContainer(this);

    container.style.paddingRight = this._originalPadding;

    container.className = container.className.replace(/ ?modal-open/, '');

    this.restoreLastFocus();
  },

  handleBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this._getHide()();
  },

  handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this._getHide()();
    }
  },

  handleWindowResize() {
    this.setState(this._getStyles());
  },

  focusModalContent () {
    if (this.props.enforceFocus) {
      this.lastFocus = domUtils.activeElement(this);

      let modalContent = React.findDOMNode(this.refs.modal);
      modalContent.focus();
    }
  },

  restoreLastFocus () {
    if (this.lastFocus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  },

  enforceFocus() {
    if ( !this.isMounted() ) {
      return;
    }

    let active = domUtils.activeElement(this);
    let modal = React.findDOMNode(this.refs.modal);

    if (modal !== active && !domUtils.contains(modal, active)){
      modal.focus();
    }
  },

  _getStyles() {
    if ( !domUtils.canUseDom ) { return {}; }

    let node = React.findDOMNode(this.refs.modal);
    let scrollHt = node.scrollHeight;
    let container = getContainer(this);
    let containerIsOverflowing = this._containerIsOverflowing;
    let modalIsOverflowing = scrollHt > containerClientHeight(container, this);

    return {
      dialogStyles: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize : void 0,
        paddingLeft:  !containerIsOverflowing && modalIsOverflowing ? scrollbarSize : void 0
      }
    };
  }
});

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

export default Modal;
