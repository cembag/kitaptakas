import './index.css';
import ReactDOM from 'react-dom/client';
import App from "./app"
import { Provider } from 'react-redux';
import store from './provider/store';
import ScrollToTop from './hooks/scroll.to.top';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './hooks/auth.provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
  </Provider>
);
