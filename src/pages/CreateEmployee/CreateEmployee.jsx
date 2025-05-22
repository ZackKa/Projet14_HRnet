
import { useState } from 'react'; 
import { useDispatch } from 'react-redux';  // Importer useDispatch pour envoyer des actions au store Redux
import DatePickerInput from '../../components/datePicker/DatePicker';
import DropdownInput from '../../components/dropdownInput/DropdownInput'; // Importer le composant DropdownInput pour les menus déroulants
import { states, departments } from '../../utils/Constants'; // Importer les options de states et departments
import ModalConfirmation from '../../components/modal/ModalConfirmation'; // Importer le composant Modal 
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
  // handleDateChange ne reçoit pas un e.target comme handleChange, mais directement une date (Date) depuis react-datepicker
  const handleDateChange = (date, name) => {
    setEmployee({
      ...employee,
      [name]: date,
    });
  };

  // Fonction pour sauvegarder un employé, envoyer l'action et réinitialiser le formulaire
  const saveEmployee = () => {
    // Avant de dispatcher l'employé, on transforme les dates en chaînes ISO en texte standardisé pour le stockage
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
      <ModalConfirmation isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
            <DatePickerInput
              label="Date of Birth"
              id="date-of-birth"
              name="dateOfBirth"
              selected={employee.dateOfBirth}
              onChange={handleDateChange}
              maxDate={minDateOfBirth}
            />
          </div>

          <div className='dates-start'>
            <DatePickerInput
              label="Start Date"
              id="start-date"
              name="startDate"
              selected={employee.startDate}
              onChange={handleDateChange}
              minDate={minStartDate}
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
