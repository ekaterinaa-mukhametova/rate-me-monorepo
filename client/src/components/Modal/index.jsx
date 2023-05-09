import React from 'react';
import propTypes from 'prop-types';

function Modal({
  header, body, footer, withCloseButton, id,
}) {
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-bg-dark" id="staticBackdropLabel">{header}</h5>
            {withCloseButton && <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />}
          </div>
          <div className="modal-body">
            {body}
          </div>
          <div className="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  header: propTypes.string,
  body: propTypes.node.isRequired,
  footer: propTypes.node,
  withCloseButton: propTypes.bool,
  id: propTypes.string.isRequired,
};

Modal.defaultProps = {
  header: null,
  footer: null,
  withCloseButton: true,
};

export default Modal;
