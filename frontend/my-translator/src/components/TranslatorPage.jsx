import { useState } from "react";
import Header from "./Header";
import TranslationInput from "./TranslationInput";
import TranslationOutput from "./TranslationOutput";

function TranslatorPage(){
    const [tranlatedText, setTranslatedText] = useState('');

    const handleInputChange = (text) => {
        //Logica da traducao
        setTranslatedText(text.split('').join(''));
    }

    return(
        <div>
            <div className="container">
                <TranslationInput onChange={handleInputChange} />
                <TranslationOutput text={tranlatedText} />
            </div>
        </div>
    )
}

export default TranslatorPage;