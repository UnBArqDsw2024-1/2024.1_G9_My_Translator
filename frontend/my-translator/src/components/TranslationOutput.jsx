import React from "react";

function TranslationOutput({ text }){
    return (
        <textarea
        readOnly
        value={text}
        placeholder="Texto traduzido"
        />
    );
}

export default TranslationOutput