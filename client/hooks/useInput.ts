import React, { useState } from 'react';

export type UseInputReturnType = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export const useInput = (initialValue: string): UseInputReturnType => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    return {
        value, onChange
    };
};