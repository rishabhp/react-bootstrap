import React from 'react';
import classnames from 'classnames';

class ModalFooter extends React.Component {

  render() {
    return (
      <div {...this.props} className={classnames(this.props.className, 'modal-footer')}>
        {this.props.children}
      </div>
    );
  }
}

export default ModalFooter;
