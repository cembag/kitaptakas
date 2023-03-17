import './app.css'
import Router from './router';
import Bar from "./components/nav/nav"
import Footer from './components/footer/footer';
import Modals from './components/modal/modals';
import Elements from './elements';
import useListenUser from './hooks/use.listen.user';

export default function App(): JSX.Element {

  useListenUser()

  return (
    <main id="app" className="app">
      <Elements/>
      <Modals/>
      <Bar/>
      <Router/>
      <Footer/>
    </main>
  );
}