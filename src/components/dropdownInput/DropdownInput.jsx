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
    <div className='dropdown-div'>
      <label htmlFor={name} id={`${name}-label`}>{label}</label> {/* Composant React-Select qui affiche un menu déroulant avec les options */}
      <Select
        name={name} // Attribue un nom au champ pour l'associer au formulaire
        id={name} // Associe un ID au champ
        value={value ? reactSelectOptions.find(option => option.value === value) : null} // Si une valeur est sélectionnée, trouve l’option correspondante. Sinon, ne rien afficher.
        onChange={selectedOption => onChange({ target: { name, value: selectedOption ? selectedOption.value : '' } })} // Gère le changement de valeur
        options={reactSelectOptions} // Les options à afficher dans le menu déroulant
        placeholder={`Select ${label}`} // Afficher un placeholder si value est null
        aria-labelledby={`${name}-label`}  // Association explicite avec le label
      />
    </div>
  );
}

// Validation des props pour garantir que les données passées au composant respectent les formats attendus
DropdownInput.propTypes = {
  label: PropTypes.string.isRequired, // Le label doit être une chaîne de caractères et est obligatoire
  name: PropTypes.string.isRequired,  // Le nom du champ doit être une chaîne de caractères et est obligatoire
  value: PropTypes.string, // La valeur peut être une chaîne ou null (si rien n'est sélectionné)
  options: PropTypes.arrayOf(         // Les options doivent être un tableau d'objets avec des propriétés spécifiques
    PropTypes.shape({
      abbreviation: PropTypes.string.isRequired,  // Chaque option doit avoir une 'abbreviation' qui est une chaîne de caractères
      name: PropTypes.string.isRequired,          // Chaque option doit avoir un 'name' qui est une chaîne de caractères
    })
  ).isRequired,  // Les options sont obligatoires et doivent être sous cette forme
  onChange: PropTypes.func.isRequired,  // La fonction de changement doit être une fonction et est obligatoire
};

export default DropdownInput;
