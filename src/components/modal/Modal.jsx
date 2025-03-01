import PropTypes from 'prop-types'; // Importation de PropTypes

// const Modal = ({ isOpen, message, onClose }) => {
//   if (!isOpen) return null; // Si la modal est fermée, elle ne s'affiche pas

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>{message}</h2>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// };

// // Validation des props
// Modal.propTypes = {
//     isOpen: PropTypes.bool.isRequired, // La prop 'isOpen' doit être un booléen et est obligatoire
//     message: PropTypes.string.isRequired, // La prop 'message' doit être une chaîne de caractères et est obligatoire
//     onClose: PropTypes.func.isRequired, // La prop 'onClose' doit être une fonction et est obligatoire
//   };
  

// export default Modal;

function Modal({ isOpen, message, onClose }) {
    // Si la modal n'est pas ouverte, ne rien afficher
    if (!isOpen) return null;

    // Empêche la fermeture de la modal si on clique à l'intérieur du contenu
    const handleModalClick = (e) => {
        e.stopPropagation(); // Empêche la propagation du clic vers l'overlay
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={handleModalClick}>
            <p>{message}</p>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
}
  // Validation des props
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // La prop 'isOpen' doit être un booléen et est obligatoire
    message: PropTypes.string.isRequired, // La prop 'message' doit être une chaîne de caractères et est obligatoire
    onClose: PropTypes.func.isRequired, // La prop 'onClose' doit être une fonction et est obligatoire
};
  
  export default Modal;