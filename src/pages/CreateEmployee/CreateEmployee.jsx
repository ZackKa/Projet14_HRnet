import { useState } from 'react'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import DropdownInput from '../../components/dropdownInput/DropdownInput'; 
import { states, departments } from '../../utils/Constants'; 
import Modal from '../../components/modal/Modal';

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
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees));
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
    setIsModalOpen(true);
  };

  const today = new Date();
  const minDateOfBirth = new Date();
  minDateOfBirth.setFullYear(today.getFullYear() - 18);

  const minStartDate = new Date();
  minStartDate.setDate(today.getDate() - 7);

  return (
    <div id='create-div' className="container">
      {/* <Modal isOpen={isModalOpen} message="Employee Created!" onClose={() => setIsModalOpen(false)} /> */}
      {/* Modal avec children pour afficher un message personnalisé */}
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