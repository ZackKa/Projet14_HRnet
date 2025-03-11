import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children, className, closeOnOverlayClick }) {
    // Si la modal n'est pas ouverte, ne rien afficher
    if (!isOpen) return null;

    // Empêche la fermeture de la modal si on clique à l'intérieur du contenu
    const handleModalClick = (e) => {
        e.stopPropagation(); // Empêche la propagation du clic vers l'overlay
    };

    // Gère le clic sur l'overlay pour fermer la modal si closeOnOverlayClick est true
    const handleOverlayClick = () => {
        if (closeOnOverlayClick) {
            onClose(); // Ferme la modal si closeOnOverlayClick est true
        }
    };

    return (
        <div className={`modal-overlay ${className}`} onClick={handleOverlayClick} aria-hidden="true">
            <div className="modal-content" onClick={handleModalClick} role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
                <div id="modal-element">
                    {children}
                </div>
                <button onClick={onClose} aria-label="Close modal">Close</button>
            </div>
        </div>
    );
}

// Validation des props
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // La prop 'isOpen' doit être un booléen et est obligatoire
    onClose: PropTypes.func.isRequired, // La prop 'onClose' doit être une fonction et est obligatoire
    children: PropTypes.node.isRequired, // La prop 'children' peut être n'importe quel contenu React
    className: PropTypes.string, // La prop 'className' permet de personnaliser les styles si nécessaire
    closeOnOverlayClick: PropTypes.bool, // Permet de contrôler la fermeture de la modal en cliquant sur l'overlay
};


export default Modal;
