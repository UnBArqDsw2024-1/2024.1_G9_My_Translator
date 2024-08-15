import React from "react";

function DictionaryOutput({ text }){
    return (
        <textarea
        className="dictionary-box"
        readOnly
        value={text}
        placeholder="Dicionario"
        />
    );
}

export default DictionaryOutput