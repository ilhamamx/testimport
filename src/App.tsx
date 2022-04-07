import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation();

  function changeLanguage(lng: string) {
    i18n.changeLanguage(lng);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a>Ini contoh penggunaan translate</a>
        <button onClick={() => changeLanguage('id')}>Change to id</button>
        <button onClick={() => changeLanguage('en')}>Change to en</button>
        <p>{t('Hello.World')}</p>
      </header>
    </div>
  );
}

export default App;
