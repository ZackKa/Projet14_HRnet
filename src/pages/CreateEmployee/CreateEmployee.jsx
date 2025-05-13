
import { useState } from 'react'; 
import { useDispatch } from 'react-redux';  // Importer useDispatch pour envoyer des actions au store Redux
import DatePicker from 'react-datepicker'; // Importer le composant DatePicker pour sélectionner une date
import 'react-datepicker/dist/react-datepicker.css'; // Importer le CSS de DatePicker
import DropdownInput from '../../components/dropdownInput/DropdownInput'; // Importer le composant DropdownInput pour les menus déroulants
import { states, departments } from '../../utils/Constants'; // Importer les options de states et departments
import Modal from "@lelotgh/react_modal_component"; // Importer le composant Modal 
import { addEmployee } from '../../features/EmployeeSlice';  // Importer l'action

function CreateEmployee() {
  // Initialisation de l'état local pour stocker les informations de l'employé
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();  // Initialiser le dispatch pour envoyer l'action au store Redux

  // Fonction pour gérer les changements de champ dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    // ...employee Copie toutes les propriétés de l'objet 'employee'
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Fonction pour gérer le changement des dates dans le formulaire
  const handleDateChange = (date, name) => {
    setEmployee({
      ...employee,
      [name]: date,
    });
  };

  // Fonction pour sauvegarder un employé, envoyer l'action et réinitialiser le formulaire
  const saveEmployee = () => {
    // Avant de dispatcher l'employé, on transforme les dates en chaînes ISO
    const employeeToDispatch = {
      ...employee,
      dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toISOString() : null,
      startDate: employee.startDate ? employee.startDate.toISOString() : null,
    };
  
    // Dispatche l'action 'addEmployee' avec l'employé transformé
    dispatch(addEmployee(employeeToDispatch));
  
    // Réinitialiser les champs du formulaire
    setEmployee({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      street: '',
      city: '',
      state: null,
      zipCode: '',
      department: null,
    });
  
    // Ouvrir le modal de confirmation
    setIsModalOpen(true);
  };


  // Définition des dates minimales pour la date de naissance et la date de début
  const today = new Date();
  const minDateOfBirth = new Date();
  minDateOfBirth.setFullYear(today.getFullYear() - 18);

  const minStartDate = new Date();
  minStartDate.setDate(today.getDate() - 7);

  return (
    <div id='create-div' className="container">
      {/* Modal de confirmation après la création de l'employé */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnOverlayClick={false}>
        <h2>Employee Created!</h2>
        <p>Your new employee has been successfully created.</p>
      </Modal>
       <div className="title">
         <h1>HRnet</h1>
       </div>
       <a href="/employee-list" title="View the current list of employees">View Current Employees</a>
       <h2>Create Employee</h2>
       <form onSubmit={(e) => e.preventDefault()} id="create-employee">
         <label htmlFor="first-name">First Name</label>
         <input
          type="text"
          id="first-name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          aria-label="First name of the employee"
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          aria-label="last name of the employee"
        />

        <div className='dates'>
          <div className='dates-birth'>
            <label htmlFor="date-of-birth" id="date-of-birth-label">Date of Birth</label>
            <DatePicker
              selected={employee.dateOfBirth}
              onChange={(date) => handleDateChange(date, 'dateOfBirth')}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              maxDate={minDateOfBirth}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              id="date-of-birth"
              aria-labelledby="date-of-birth-label"  // Associer le DatePicker à son label
            />
          </div>

          <div className='dates-start'>
            <label htmlFor="start-date" id="start-date-label">Start Date</label>
            <DatePicker
              selected={employee.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              minDate={minStartDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              id="start-date"
              aria-labelledby="start-date-label"  // Associer le DatePicker à son label
            />
          </div>
        </div>

        <fieldset className="address">
          <legend>Address</legend>
          <div className='element-fieldset'>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              value={employee.street}
              onChange={handleChange}
              aria-label="employee's address"
            />
          </div>
          <div className='element-fieldset'>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={employee.city}
              onChange={handleChange}
              aria-label="employee's city"
            />
          </div>

          <DropdownInput
            label="State"
            name="state"
            value={employee.state}
            options={states}
            onChange={handleChange}
            aria-label="employee's state"
          />
          <div className='element-fieldset'>
            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="number"
              id="zip-code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleChange}
              aria-label="employee's zip code"
            />
          </div>
        </fieldset>

        <DropdownInput
          label="Department"
          name="department"
          value={employee.department}
          options={departments}
          onChange={handleChange}
          aria-label="department of assignment"
        />
      </form>
      <button type="submit" onClick={saveEmployee}>Save</button>
    </div>
  );
}

export default CreateEmployee;
