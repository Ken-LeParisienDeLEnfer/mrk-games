import './App.css';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { theme } from './styles/theme/theme';
import Header from './components/Header/Header';
import Home from './modules/home/Home';
import Fut from './modules/fut/Fut';
import NavalBattle from './modules/naval-battle/NavalBattle';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fut" element={<Fut />} />
          <Route path="/naval-battle" element={<NavalBattle />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </Router>
      

    </ThemeProvider>
  );
}

export default App;
