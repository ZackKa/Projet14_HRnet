import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

function DatePickerInput({ label, id, name, selected, onChange, minDate, maxDate,}) {
  return (
    <div className="date-picker-input">
      <label htmlFor={id} id={`${id}-label`}>{label}</label>
      <DatePicker
        selected={selected}
        onChange={(date) => onChange(date, name)}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select date"
        minDate={minDate}
        maxDate={maxDate}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        id={id}
        aria-labelledby={`${id}-label`}
      />
    </div>
  );
}

DatePickerInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default DatePickerInput;
