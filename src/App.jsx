import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import Package from './components/Package';
import Version from './components/Version';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/package/:name" element={<Package />} />
      <Route path ="/version/:name" element={<Version />} />
    </Routes>
    </BrowserRouter>
      );
}

export default App;
