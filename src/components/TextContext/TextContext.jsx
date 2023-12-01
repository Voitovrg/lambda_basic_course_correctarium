import React, { createContext, useContext, useState } from 'react';

const TextContext = createContext(undefined);

export const useText = () => {
    return useContext(TextContext);
};

export const TextProvider = ({ children }) => {
    const [text, setText] = useState('');

    const setTextValue = (newText) => {
        setText(newText);
    };

    return (
        <TextContext.Provider value={{ text, setTextValue }}>
            {children}
        </TextContext.Provider>
    );
};