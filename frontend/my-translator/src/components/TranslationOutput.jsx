import React, { useState, useEffect } from "react";
import axios from "axios";

function TranslationOutput({ text }) {
    const [translatedText, setTranslatedText] = useState("");

    const handleApiTranslation = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/translate/text', {
                text: text
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            setTranslatedText(response.data.text);
        } catch (error) {
            console.error("Erro na tradução:", error);
        }
    };

    useEffect(() => {
        if (text) {
            handleApiTranslation();
        }
    }, [text]);

    return (
        <textarea
            readOnly
            value={translatedText}
            placeholder="Texto traduzido"
        />
    );
}

export default TranslationOutput;
