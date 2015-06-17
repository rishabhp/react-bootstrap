import React from 'react';
import classnames from 'classnames';

class ModalTitle extends React.Component {

  render() {
    return (
      <h4 {...this.props} className={classnames(this.props.className, 'modal-title')}>
        { this.props.children }
      </h4>
    );
  }
}

export default ModalTitle;
