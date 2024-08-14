import React from 'react';
import './App.css';
import TranslatorPage from "./components/TranslatorPage";
import Header from "./components/Header";

function App() {
    return (
        <div className="app">
            <Header />
            

            <TranslatorPage />
        </div>
    );
}

export default App;
