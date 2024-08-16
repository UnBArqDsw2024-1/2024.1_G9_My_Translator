import React, { useState, useEffect } from "react";
import axios from "axios";

function TranslationOutput({ text, selectedSourceLanguage, selectedTargetLanguage, languagesSource, languagesTarget, translatedText, setTranslatedText }) {

    const handleApiTranslation = async () => {
        try {
            const data = {
                text: text,
                source_language: languagesSource[selectedSourceLanguage],
                target_language: languagesTarget[selectedTargetLanguage]
            }
            console.log('data', data)
            const response = await axios.post('http://localhost:8000/api/translate/text', data, {
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
        if (
            ![null, undefined, ''].includes(text) &&
            ![null, undefined, ''].includes(selectedSourceLanguage) &&
            ![null, undefined, ''].includes(selectedTargetLanguage)
        ) {
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
