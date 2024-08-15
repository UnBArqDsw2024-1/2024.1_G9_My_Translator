import React, {useEffect, useState} from "react";
import Header from "./Header";
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";
import './LanguageSelector.css';
import axios from "axios";

function TranslatorPage() {
    const [translatedText, setTranslatedText] = useState('');
    const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('Inglês');
    const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('Português');
    const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
    const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [languagesSource, setLanguagesSource] = useState([]);
    const [languagesTarget, setLanguagesTarget] = useState([]);

    const handleGetLanguages = async () => {
        try {
            debugger;
            const response = await axios.get('http://localhost:8000/api/translate/languages_supported', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const [sourceLanguages, targetLanguages] = response.data;
            setLanguagesSource(Object.values(sourceLanguages));
            setLanguagesTarget(Object.values(targetLanguages));
        } catch (error) {
            console.error("Erro ao buscar as linguas:", error);
        }
    };

    useEffect(() => {
        handleGetLanguages();
    }, []);

    const handleInputChange = (text) => {
        // Lógica da tradução
        setTranslatedText(text.split('').join(''));
    };

    const toggleSourceDropdown = () => {
        setIsSourceDropdownOpen(!isSourceDropdownOpen);
    };

    const toggleTargetDropdown = () => {
        setIsTargetDropdownOpen(!isTargetDropdownOpen);
    };

    const handleSourceLanguageSelect = (language) => {
        setSelectedSourceLanguage(language);
        setIsSourceDropdownOpen(false);
    };

    const handleTargetLanguageSelect = (language) => {
        setSelectedTargetLanguage(language);
        setIsTargetDropdownOpen(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const sourceFilteredLanguages = languagesSource.filter((language) =>
        language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const targetFilteredLanguages = languagesTarget.filter((language) =>
        language.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const swapLanguages = () => {
        const temp = selectedSourceLanguage;
        setSelectedSourceLanguage(selectedTargetLanguage);
        setSelectedTargetLanguage(temp);
    };

    return (
        <main>
            
            <section className="language-selector">
                <div className="selected-language" onClick={toggleSourceDropdown}>
                    {selectedSourceLanguage} <span className="dropdown-arrow">▼</span>
                </div>
                {isSourceDropdownOpen && (
                    <div className="dropdown-menu">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Pesquisar idioma" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <ul className="language-list">
                            {sourceFilteredLanguages?.map((language, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => handleSourceLanguageSelect(language)}
                                    className={language === selectedSourceLanguage ? 'selected' : ''}
                                >
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                
                <div className="swap-icon" onClick={swapLanguages}>
                    ⇄
                </div>
            
                <div className="selected-language" onClick={toggleTargetDropdown}>
                    {selectedTargetLanguage} <span className="dropdown-arrow">▼</span>
                </div>
                {isTargetDropdownOpen && (
                    <div className="dropdown-menu">
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Pesquisar idioma" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <ul className="language-list">
                            {targetFilteredLanguages?.map((language, index) => (
                                <li 
                                    key={index} 
                                    onClick={() => handleTargetLanguageSelect(language)}
                                    className={language === selectedTargetLanguage ? 'selected' : ''}
                                >
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <section className="container">
                <TranslationInput onChange={handleInputChange} />
                <TranslationOutput text={translatedText} />
            </section>
        </main>
    );
}

export default TranslatorPage;
