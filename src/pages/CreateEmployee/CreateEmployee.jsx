
import { useState } from 'react'; 
import { useDispatch } from 'react-redux';  // Importer useDispatch
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import DropdownInput from '../../components/dropdownInput/DropdownInput'; 
import { states, departments } from '../../utils/Constants'; 
import Modal from "@lelotgh/react_modal_component";
import { addEmployee } from '../../features/EmployeeSlice';  // Importer l'action

function CreateEmployee() {
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
  const dispatch = useDispatch();  // Initialiser le dispatch

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setEmployee({
      ...employee,
      [name]: date,
    });
  };

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
  
  

  const today = new Date();
  const minDateOfBirth = new Date();
  minDateOfBirth.setFullYear(today.getFullYear() - 18);

  const minStartDate = new Date();
  minStartDate.setDate(today.getDate() - 7);

  return (
    <div id='create-div' className="container">
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} closeOnOverlayClick={false}>
        <h2>Employee Created!</h2>
        <p>Your new employee has been successfully created.</p>
      </Modal>
       <div className="title">
         <h1>HRnet</h1>
       </div>
       <a href="/employee-list">View Current Employees</a>
       <h2>Create Employee</h2>
       <form onSubmit={(e) => e.preventDefault()} id="create-employee">
         <label htmlFor="first-name">First Name</label>
         <input
          type="text"
          id="first-name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
        />

        <div className='dates'>
          <div className='dates-birth'>
            <label htmlFor="date-of-birth">Date of Birth</label>
            <DatePicker
              selected={employee.dateOfBirth}
              onChange={(date) => handleDateChange(date, 'dateOfBirth')}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              maxDate={minDateOfBirth}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className='dates-start'>
            <label htmlFor="start-date">Start Date</label>
            <DatePicker
              selected={employee.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select date"
              minDate={minStartDate}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
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
            />
          </div>

          <DropdownInput
            label="State"
            name="state"
            value={employee.state}
            options={states}
            onChange={handleChange}
          />
          <div className='element-fieldset'>
            <label htmlFor="zip-code">Zip Code</label>
            <input
              type="number"
              id="zip-code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <DropdownInput
          label="Department"
          name="department"
          value={employee.department}
          options={departments}
          onChange={handleChange}
        />
      </form>
      <button onClick={saveEmployee}>Save</button>
    </div>
  );
}

export default CreateEmployee;
