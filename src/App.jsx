import './App.css';
import { AIchallenges } from './Components/AIchallenges/AIchallenges';
import { Createchallenge } from './Components/Createchallenge/Createchallenge';
import { Editchallenge } from './Components/Createchallenge/Editchallenge';
import { Detailpage } from './Components/Detailpage/Detailpage';
import { Explorechallenges } from './Components/Explorechallenges/Explorechallenges';
import { Header } from './Components/Header/Header';
import { Hero } from './Components/Hero/Hero';
import { Outcomes } from './Components/Outcomes/Outcomes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Hero />
                <Outcomes />
                <AIchallenges />
                <Explorechallenges />
                {/* <Createchallenge /> */}
              </>
            }
          />
          <Route path="/card/:id" element={
            <>
              <Header />
              <Detailpage />
            </>
          } />
          <Route path="/create-challenge" element={
            <>
              <Header />
              <Createchallenge />
            </>
          } />
          <Route path="/card/:id/edit" element={
            <>
              <Header />
              <Editchallenge />
            </>
          } />
        </Routes>
      </Router>

    </>
  )
}

export default App
