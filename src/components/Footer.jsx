import React from 'react';
import styled from 'styled-components';

function Footer() {
    return (
        <StyledDiv>
            <StCopyright>ⓒ 2023. D:Live. All rights reserved.</StCopyright>
        </StyledDiv>
    );
}

export default Footer;

const StyledDiv = styled.div`
    background-color: #5eb470;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 620px;
    width: 100%;
`;

const StCopyright = styled.p`
    font-weight: 500;
    font-size: 13px;
    color: #fff;
`;
