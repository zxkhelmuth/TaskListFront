import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App'

import TaskProvider from './Contexts/TaskContext';
import FormProvider from './Contexts/FormContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskProvider>
      <FormProvider>
        <App/>
      </FormProvider>
    </TaskProvider>
  </StrictMode>
);
