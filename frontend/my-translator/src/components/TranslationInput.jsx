import { useState } from "react";

function TranslationInput({ onChange }) {
    const [text, setText] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleChange = (e) => {
        setText(e.target.value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const timeout = setTimeout(() => {
            onChange(e.target.value);
        }, 500);

        setDebounceTimeout(timeout);
    };

    return (
        <textarea
            value={text}
            onChange={handleChange}
            placeholder="Digite o texto para tradução"
        />
    );
}

export default TranslationInput;
