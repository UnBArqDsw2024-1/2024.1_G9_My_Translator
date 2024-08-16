import { useState } from "react";

function TranslationInput({ onChange, localText, setLocalText}) {
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const handleChange = (e) => {
        setLocalText(e.target.value);

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
            value={localText}
            onChange={handleChange}
            placeholder="Digite o texto para tradução"
        />
    );
}

export default TranslationInput;
