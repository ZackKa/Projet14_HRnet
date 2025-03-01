import PropTypes from 'prop-types'; // Importer PropTypes pour valider les props
import Select from 'react-select'; // Importer le composant Select de React-Select


// DropdownInput esqt un composant réutilisable pour afficher un menu déroulant avec React-Select.

function DropdownInput({ label, name, value, options, onChange }) {

  // Transforme les options au format requis par React-Select (chaque option doit avoir une clé 'value' et 'label').
  const reactSelectOptions = options.map(option => ({
    value: option.abbreviation,  // 'value' correspond à la valeur à envoyer lors de la soumission du formulaire
    label: option.name,          // 'label' est le texte affiché pour chaque option dans le menu déroulant
  }));

  return (
    <div>
      {/* Affiche le label du champ de sélection */}
      <label htmlFor={name}>{label}</label>

      {/* Composant React-Select qui affiche un menu déroulant avec les options */}
      <Select
        name={name}  // Attribue un nom au champ pour l'associer au formulaire
        id={name}    // Associe un ID au champ
        value={reactSelectOptions.find(option => option.value === value)} // représente l'option actuellement sélectionnée, passée pour afficher la sélection dans l'interface
        onChange={selectedOption => onChange({ target: { name, value: selectedOption.value } })
        } // Récupère l'option sélectionnée et passe sa valeur à 'handleChange' dans le parent pour mettre à jour l'état
        options={reactSelectOptions} // Les options à afficher dans le menu déroulant
      />
    </div>
  );
}

// Validation des props pour garantir que les données passées au composant respectent les formats attendus
DropdownInput.propTypes = {
  label: PropTypes.string.isRequired, // Le label doit être une chaîne de caractères et est obligatoire
  name: PropTypes.string.isRequired,  // Le nom du champ doit être une chaîne de caractères et est obligatoire
  value: PropTypes.string.isRequired, // La valeur sélectionnée doit être une chaîne de caractères et est obligatoire
  options: PropTypes.arrayOf(         // Les options doivent être un tableau d'objets avec des propriétés spécifiques
    PropTypes.shape({
      abbreviation: PropTypes.string.isRequired,  // Chaque option doit avoir une 'abbreviation' qui est une chaîne de caractères
      name: PropTypes.string.isRequired,          // Chaque option doit avoir un 'name' qui est une chaîne de caractères
    })
  ).isRequired,  // Les options sont obligatoires et doivent être sous cette forme
  onChange: PropTypes.func.isRequired,  // La fonction de changement doit être une fonction et est obligatoire
};

export default DropdownInput;
