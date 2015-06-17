import React from 'react';
import classnames from 'classnames';

class ModalHeader extends React.Component {

  render() {
    return (
      <div
        {...this.props}
        className={classnames(this.props.className, 'modal-header')}
      >
        { this.props.closeButton &&
          <button
            className='close'
            aria-label={this.props['aria-label'] || 'Close'}
            onClick={this.props.onHide}
            style={{ marginTop: -2 }}
          >
            <span aria-hidden="true">
              &times;
            </span>
          </button>
        }
        { this.props.children }
      </div>
    );
  }
}

//used in liue of parent contexts right now to auto wire the close button
ModalHeader.__isModalHeader = true;

ModalHeader.propTypes = {
  closeButton: React.PropTypes.bool,
  onHide: React.PropTypes.func
};

ModalHeader.defaultProps = {
  closeButton: false
};

export default ModalHeader;
