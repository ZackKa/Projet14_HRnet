import { useState } from 'react'; // Importation du hook useState pour gérer l'état local
import DatePicker from 'react-datepicker'; // Importation du composant DatePicker pour choisir une date
import 'react-datepicker/dist/react-datepicker.css'; // Importation du style CSS de react-datepicker

function CreateEmployee() {
  // Initialisation de l'état local pour l'employé
  const [employee, setEmployee] = useState({
    firstName: '', // Prénom de l'employé
    lastName: '', // Nom de famille de l'employé
    dateOfBirth: null, // Date de naissance, initialement vide
    startDate: null, // Date de début, initialement vide
    street: '', // Rue de l'adresse de l'employé
    city: '', // Ville de l'adresse de l'employé
    state: '', // État de l'adresse de l'employé
    zipCode: '', // Code postal de l'adresse de l'employé
    department: 'Sales', // Département par défaut de l'employé
  });

  // Liste des états à sélectionner dans le formulaire
  const states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  // Fonction pour gérer les changements d'entrée dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target; // Récupère le nom et la valeur de l'input
    setEmployee({
      ...employee,
      [name]: value, // Mette à jour l'état avec la nouvelle valeur
    });
  };

  // Fonction pour gérer le changement de date (pour les dates de naissance et de début)
  const handleDateChange = (date, name) => {
    setEmployee({
      ...employee,
      [name]: date, // Mette à jour l'état avec la nouvelle date
    });
  };

  // Fonction pour sauvegarder l'employé dans le localStorage
  const saveEmployee = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || []; // Récupérer les employés existants ou initialiser un tableau vide
    employees.push(employee); // Ajouter le nouvel employé à la liste
    localStorage.setItem('employees', JSON.stringify(employees)); // Sauvegarder la nouvelle liste dans le localStorage
    alert('Employee Created!'); // Afficher une alerte pour indiquer que l'employé a été créé
  };

  // Calcul de la date limite pour la date de naissance (18 ans dans le passé par rapport à aujourd'hui)
  const today = new Date(); // Date actuelle
  const minDateOfBirth = new Date();
  minDateOfBirth.setFullYear(today.getFullYear() - 18); // 18 ans dans le passé

  // Calcul de la date limite pour la startDate (1 semaine dans le passé)
  const minStartDate = new Date();
  minStartDate.setDate(today.getDate() - 7); // 7 jours dans le passé

  return (
    <div className="container">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <a href="/employee-list">View Current Employees</a>
      <h2>Create Employee</h2>
      <form onSubmit={(e) => e.preventDefault()} id="create-employee">
        {/* Input pour le prénom de l'employé */}
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange} // On change l'état lors de la saisie
        />

        {/* Input pour le nom de l'employé */}
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />

        {/* Sélecteur de la date de naissance */}
        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          selected={employee.dateOfBirth} // Valeur actuelle de la date de naissance
          onChange={(date) => handleDateChange(date, 'dateOfBirth')} // Mise à jour de la date
          dateFormat="MM/dd/yyyy" // Format de la date
          placeholderText="Select date"
          maxDate={minDateOfBirth} // Limite de sélection : maximum 18 ans dans le passé
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        {/* Sélecteur de la date de début */}
        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={employee.startDate} // Valeur actuelle de la startDate
          onChange={(date) => handleDateChange(date, 'startDate')} // Mise à jour de la startDate
          dateFormat="MM/dd/yyyy"
          placeholderText="Select date"
          minDate={minStartDate} // Limite de sélection : au minimum 1 semaine dans le passé
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <fieldset className="address">
          <legend>Address</legend>
          {/* Inputs pour l'adresse */}
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={employee.street}
            onChange={handleChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={employee.city}
            onChange={handleChange}
          />

          <label htmlFor="state">State</label>
          <select
            name="state"
            id="state"
            value={employee.state}
            onChange={handleChange}
          >
            {/* Liste déroulante pour choisir l'état */}
            {states.map((state) => (
              <option key={state.abbreviation} value={state.abbreviation}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="number"
            id="zip-code"
            name="zipCode"
            value={employee.zipCode}
            onChange={handleChange}
          />
        </fieldset>

        {/* Sélecteur de département */}
        <label htmlFor="department">Department</label>
        <select
          name="department"
          id="department"
          value={employee.department}
          onChange={handleChange}
        >
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>
      </form>

      {/* Bouton pour sauvegarder l'employé */}
      <button onClick={saveEmployee}>Save</button>
    </div>
  );
};

export default CreateEmployee; // Exportation du composant
