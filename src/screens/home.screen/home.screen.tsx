import './home.screen.scss'
import React from 'react';
import { useTypedSelector } from '../../provider/store';
import NavigationBar from '../..//components/navigation-bar/navigation-bar';

function Home(): JSX.Element {

  const {theme, language} = useTypedSelector(state => state)

  return (
    <div id="home">
        <NavigationBar theme={theme} language={language}/>
    </div>
  );
}

export default Home;
