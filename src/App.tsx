import Header from './components/layout/Header';
import { MainLayout } from './pages/Home/NoteLayout/MainLayout';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-modern-glow flex justify-center px-8 py-4 flex-col flex-2 box-border gap-4">
      <Header></Header>
      <MainLayout></MainLayout>
    </div>
  );
}
export default App;
