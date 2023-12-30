import styled, { css } from 'styled-components';
import avatar from 'assets/img/avatar.png';

export default function Avatar({ src, size }) {
    return (
        <AvatarFigure size={size}>
            <img src={src ?? avatar} alt='아바타이미지' />
        </AvatarFigure>
    );
}

const AvatarFigure = styled.figure`
    ${(props) => {
        switch (props.size) {
            case 'large':
                return css`
                    width: 70px;
                    height: 70px;
                `;
            default:
                return css`
                    width: 24px;
                    height: 24px;
                `;
        }
    }}
    border-radius: 50%;
    overflow: hidden;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;
