import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../services/actions/registration'

export const RegisterPage = () => {
    const dispatch = useDispatch()

    function handleChange(e) {
        dispatch(registerUser())
    }

    return (
        <div>
            <textarea type="text" value={value} onChange={handleChange} />
            <button onClick={resetValue}>Очистить</button>
        </div>
    )
};