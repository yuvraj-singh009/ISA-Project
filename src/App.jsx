import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import Sky from './pages/Sky'
import Navbar from './components/Common/Navbar'
import Footer from './components/Common/Footer'
// import './styles/main.css'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sky" element={<Sky />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App