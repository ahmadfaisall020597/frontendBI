// third party
import { createRoot } from 'react-dom/client';

// contexts
import { ConfigProvider } from './contexts/ConfigContext';
import { AuthProvider } from './contexts/AuthContext';

// project imports
import App from './App';
import reportWebVitals from './reportWebVitals';

// style + assets
import './index.scss';

// -----------------------|| REACT DOM RENDER ||-----------------------//

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </AuthProvider>
);

reportWebVitals();
