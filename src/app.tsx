import './app.css'
import Router from './router';
import Bar from "./components/nav/nav"
import Footer from './components/footer/footer';
import ScrollElement from './components/scroll.element/scroll.element';
import Modals from './components/modal/modals';

export default function App(): JSX.Element {

  return (
    <main id="app" className="app">
      <ScrollElement/>
      <Modals/>
      <Bar/>
      <Router/>
      <Footer/>
    </main>
  );
}