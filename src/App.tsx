import Header from './components/layout/HeaderLayout';
import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div
      className="h-screen w-screen bg-modern-glow 
    flex flex-col justify-center px-8 py-4 gap-4 box-border "
    >
      <Header />
      <HomePage />
      <ToastContainer />
    </div>
  );
}
export default App;
