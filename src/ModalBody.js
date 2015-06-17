import React from 'react';
import classnames from 'classnames';

class ModalBody extends React.Component {
  render() {
    return (
      <div {...this.props} className={classnames(this.props.className, 'modal-body')}>
        {this.props.children}
      </div>
    );
  }
}

export default ModalBody;
