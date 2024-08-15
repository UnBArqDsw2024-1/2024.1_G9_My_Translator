import React from "react";

function TranslationOutput({ text }){
    return (
        <textarea
        className="translated-box"
        readOnly
        value={text}
        placeholder="Texto traduzido"
        />
    );
}

export default TranslationOutput