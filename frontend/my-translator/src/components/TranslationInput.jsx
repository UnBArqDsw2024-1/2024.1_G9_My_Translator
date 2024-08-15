import { useState } from "react"

function TranslationInput({onChange}){
    const [text, setText] =useState('');

    const handleChange = (e) => {
        setText(e.target.value);
        onChange(e.target.value);
    };
 
    return (
        <textarea
            className="to-translate-box"
            value={text}
            onChange={handleChange}
            placeholder="Digite o texto para tradução"
            />
    );
}

export default TranslationInput