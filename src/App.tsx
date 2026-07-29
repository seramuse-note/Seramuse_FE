import Header from './components/layout/HeaderLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div
      className="h-screen w-screen overflow-hidden bg-modern-glow 
    flex flex-col justify-center px-8 py-4 gap-4 box-border "
    >
      <Header />
      <HomePage />
    </div>
  );
}
export default App;
