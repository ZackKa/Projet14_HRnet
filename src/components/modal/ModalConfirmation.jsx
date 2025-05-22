import PropTypes from 'prop-types';
import Modal from '@lelotgh/react_modal_component';

function ModalConfirmation({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
      <h2>Employee Created!</h2>
      <p>Your new employee has been successfully created.</p>
    </Modal>
  );
}

ModalConfirmation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalConfirmation;
