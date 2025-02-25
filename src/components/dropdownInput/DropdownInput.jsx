import PropTypes from 'prop-types'; // Importer PropTypes

// Composant réutilisable pour les menus déroulants
function DropdownInput({ label, name, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.abbreviation} value={option.abbreviation}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// Validation des props
DropdownInput.propTypes = {
  label: PropTypes.string.isRequired,      // 'label' doit être une chaîne de caractères et est obligatoire
  name: PropTypes.string.isRequired,       // 'name' doit être une chaîne de caractères et est obligatoire
  value: PropTypes.string.isRequired,      // 'value' doit être une chaîne de caractères et est obligatoire
  options: PropTypes.arrayOf(              // 'options' doit être un tableau d'objets
    PropTypes.shape({
      abbreviation: PropTypes.string.isRequired,  // 'abbreviation' dans chaque objet doit être une chaîne de caractères et est obligatoire
      name: PropTypes.string.isRequired,          // 'name' dans chaque objet doit être une chaîne de caractères et est obligatoire
    })
  ).isRequired,  // 'options' est un tableau et doit être obligatoire
  onChange: PropTypes.func.isRequired,       // 'onChange' doit être une fonction et est obligatoire
};

export default DropdownInput;
