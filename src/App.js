import './normalize.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Cartelera from './pages/Cartelera';
import Teatros from './pages/Teatros';
import Cursos from './pages/Cursos';
import Contacto from './pages/Contacto';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='pages/Cartelera' element={<Cartelera />} />
        <Route path='pages/Teatros' element={<Teatros />} />
        <Route path='pages/Cursos' element={<Cursos />} />
        <Route path='pages/Contacto' element={<Contacto />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
