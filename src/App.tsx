import HomePage from './pages/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="h-screen w-screen relative flex flex-1 cursor: text bg-modern-glow">
      {/* <Header /> */}
      <HomePage />
      <ToastContainer />
    </div>
  );
}
export default App;
