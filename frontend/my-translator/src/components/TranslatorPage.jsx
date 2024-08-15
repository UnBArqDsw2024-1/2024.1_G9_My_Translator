import { useState } from "react";
import Header from "./Header";
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";
import DictionaryOutput from "./DictionaryOutput";

function TranslatorPage(){
    const [translatedText, setTranslatedText, dictionaryText] = useState('');

    const handleInputChange = (text) => {
        //Logica da traducao
        setTranslatedText(text.split('').join(''));
    }

    return(
        <main>
            <div className="language-selector">
                <div className="select-container">
                    <select className="language-select">
                        <option value="en">Inglês</option>
                    </select>
                </div>
                <div className="swap-icon">
                    <span>⇄</span>
                </div>
                <div className="select-container">
                    <select className="language-select">
                        <option value="pt">Português</option>
                    </select>
                </div>
            </div>
            
            <section className="container">
            <div className="translate-container">
                <TranslationInput onChange={handleInputChange} />
                <TranslationOutput text={translatedText} />
            </div>
                <DictionaryOutput text={dictionaryText} />
                
            </section>
        </main>
    )
}

export default TranslatorPage;