import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/EmployeeSlice';

// Création du store avec le reducer
const store = configureStore({
  reducer: {
    employees: employeeReducer, // Le slice est intégré au store
  },
});

export default store;
