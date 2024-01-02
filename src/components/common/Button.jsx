// Global Button
import React from 'react';
import styled from 'styled-components';

const Button = ({ text, onClick, width, type }) => {
    return (
        <StButton onClick={onClick} width={width} type={type}>
            {text}
        </StButton>
    );
};

export default Button;

const StButton = styled.button`
    width: ${(props) => (props.width ? props.width : '100%')};
    height: 48px;
    font-size: 16px;
    color: #5eb470;
    border-radius: 8px;
    border: 1px solid #5eb470;
    margin-top: 40px;
    cursor: pointer;
    transition: background 200ms;
    &:hover {
        color: #fff;
        background: #5eb470;
    }
`;
