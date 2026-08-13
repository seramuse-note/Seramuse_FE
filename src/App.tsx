import { ToastContainer } from 'react-toastify';
import { HomePage } from './pages/HomePage';

export const App = () => {
  return (
    <div className="h-screen w-screen relative flex flex-1 cursor: text bg-modern-glow">
      {/* <Header /> */}
      <HomePage />
      <ToastContainer />
    </div>
  );
};
