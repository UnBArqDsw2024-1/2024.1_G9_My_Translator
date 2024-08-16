import React, {useEffect, useState} from "react";
import Header from "./Header";
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";
import './LanguageSelector.css';
import axios from "axios";

const DE_PARA_TARGET = {
    'Inglês (Britânico)': 'Inglês',
    'Inglês (Americano)': 'Inglês',
    'Português (Brasileiro)': 'Português',
    'Português (Europeu)': 'Português',
    'Chinês (simplificado)': 'Chinês',
}

const DE_PARA_SOURCE= {
    'Inglês': 'Inglês (Americano)',
    'Português': 'Português (Brasileiro)',
    'Chinês': 'Chinês (simplificado)',
}

function TranslatorPage() {
    const [localText, setLocalText] = useState('');
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [selectedSourceLanguage, setSelectedSourceLanguage] = useState('Português');
    const [selectedTargetLanguage, setSelectedTargetLanguage] = useState('Inglês (Americano)');
    const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
    const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [languagesSource, setLanguagesSource] = useState([]);
    const [languagesTarget, setLanguagesTarget] = useState([]);
    const [dictLanguagesSource, setDictLanguagesSource] = useState([]);
    const [dictLanguagesTarget, setDictLanguagesTarget] = useState([]);

    const handleGetLanguages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/translate/languages_supported', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            const [sourceLanguages, targetLanguages] = response.data;

            setDictLanguagesSource(sourceLanguages);
            setLanguagesSource(Object.keys(sourceLanguages));

            setDictLanguagesTarget(targetLanguages);
            setLanguagesTarget(Object.keys(targetLanguages));
        } catch (error) {
            console.error("Erro ao buscar as linguas:", error);
        }
    };

    useEffect(() => {
        handleGetLanguages();
    }, []);

    const handleInputChange = (text) => {
        setText(text.split('').join(''));
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
        let tempTargetLanguage = selectedTargetLanguage;
        let tempSourceLanguage = selectedSourceLanguage;
        if(Object.keys(DE_PARA_TARGET).includes(tempTargetLanguage)) {
            tempTargetLanguage = DE_PARA_TARGET[tempTargetLanguage];
        }
        if(Object.keys(DE_PARA_SOURCE).includes(tempSourceLanguage)) {
            tempSourceLanguage = DE_PARA_SOURCE[tempSourceLanguage];
        }
        setSelectedSourceLanguage(tempTargetLanguage);
        setSelectedTargetLanguage(tempSourceLanguage);
        setLocalText(translatedText);
        setText(translatedText);
        setTranslatedText(text);
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
                <TranslationInput onChange={handleInputChange} localText={localText} setLocalText={setLocalText} />
                <TranslationOutput
                    text={text}
                    selectedSourceLanguage={selectedSourceLanguage}
                    selectedTargetLanguage={selectedTargetLanguage}
                    languagesSource={dictLanguagesSource}
                    languagesTarget={dictLanguagesTarget}
                    translatedText={translatedText}
                    setTranslatedText={setTranslatedText}
                />
            </section>
        </main>
    );
}

export default TranslatorPage;
