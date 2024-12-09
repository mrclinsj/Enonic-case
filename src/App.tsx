import './App.sass';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import {PersonList} from './components/PersonList';
import {Person} from './components/Person';
import {LandingPage} from './components/LandingPage'
import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { Movie } from './components/Movie';
import { Footer } from './components/Footer';


export default function App() {
  return (
    <Router>
      <header>
      <Header />
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/p" element={<PersonList />}/>
        <Route path="/p/:name/:personId" element={<Person />}/>
        <Route path="/m" element={<MovieList />} />
        <Route path="/m/:name/:movieId" element={<Movie />} />
      </Routes>
      <Footer />
    </Router>
  );
}