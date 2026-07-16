import Header from './components/layout/Header';
import { MainLayout } from './components/layout/Blog/MainLayout';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-cyberpunk flex justify-center px-8 py-4 flex-col flex-2 box-border gap-4">
      <Header></Header>
      <MainLayout></MainLayout>
    </div>
  );
}
export default App;
