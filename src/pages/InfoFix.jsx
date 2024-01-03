import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../shared/firebase';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { FaUserCircle } from 'react-icons/fa';
import swal from 'sweetalert';

const InfoFix = () => {
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const handleProfilePictureChange = () => {
        const fileInput = document.getElementById('profilePictureInput');
        fileInput && fileInput.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            try {
                const avatarRef = storage.ref().child(`avatars/${auth.currentUser.uid}/${file.name}`);
                await avatarRef.put(file);
                const avatarUrl = await avatarRef.getDownloadURL();

                const userDoc = doc(db, 'users', userData.id);
                await updateDoc(userDoc, { avatar: avatarUrl });

                setUserData({ ...userData, avatar: avatarUrl });
                setProfileImage(avatarUrl);

                swal('Good Job!', 'Profile picture has been updated!', 'success');
            } catch (error) {
                console.error('Error updating profile picture:', error);
            }
        }
    };

    const handleNicknameEdit = () => {
        setNickname(userData.nickname);
        setIsEditing(true);
    };

    const handleNicknameSave = async () => {
        try {
            const userDoc = doc(db, 'users', userData.id);
            await updateDoc(userDoc, { nickname: nickname });
            setUserData({ ...userData, nickname: nickname });
            setIsEditing(false);
            swal('변경 완료', '닉네임이 변경되었습니다', 'success');
        } catch (error) {
            console.error('Error updating nickname:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                const userId = new URLSearchParams(window.location.search).get('userId');
                const userQuery = query(collection(db, 'users'), where('userId', '==', userId));
                const userSnapshot = await getDocs(userQuery);

                if (user) {
                    const userQuery = query(collection(db, 'users'), where('userId', '==', user.uid));
                    const userSnapshot = await getDocs(userQuery);

                    if (userSnapshot.docs.length > 0) {
                        const userData = {
                            id: userSnapshot.docs[0].id,
                            ...userSnapshot.docs[0].data(),
                        };
                        setUserData(userData);
                        setProfileImage(userData.avatar);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, []);

    return (
        <Stcontainer>
            {userData && (
                <>
                    <StlogCard>
                        <StlogWrapper>
                            {!isEditing && (
                                <FaUserCircle className='user' size='80' fill='#dddddd' imageUrl={profileImage} />
                            )}
                            {isEditing ? (
                                <input
                                    type='text'
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    maxLength={10}
                                    minLength={2}
                                />
                            ) : (
                                <Stdiv>{userData.nickname}</Stdiv>
                            )}

                            {isEditing ? (
                                <>
                                    <Button
                                        type='button'
                                        text='저장하기'
                                        onClick={handleNicknameSave}
                                        width={`320px`}
                                    />
                                    <Button
                                        type='button'
                                        text='취소하기'
                                        onClick={() => setIsEditing(false)}
                                        width={`320px`}
                                    />
                                </>
                            ) : (
                                <>
                                    <Button
                                        type='button'
                                        text='닉네임 변경'
                                        onClick={handleNicknameEdit}
                                        width={`320px`}
                                    />

                                    <input
                                        type='file'
                                        id='profilePictureInput'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Button
                                        type='button'
                                        text='프로필 이미지 변경'
                                        onClick={handleProfilePictureChange}
                                        width={`320px`}
                                    />
                                </>
                            )}
                        </StlogWrapper>
                    </StlogCard>
                </>
            )}
        </Stcontainer>
    );
};

export default InfoFix;

const Stdiv = styled.div`
    align-items: center;
    justify-content: center;
    margin: 2px 5px;
    font-size: 10px;
`;

const Stcontainer = styled.div`
    width: 100%;
    max-width: 620px;
    margin: 40px 0;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StlogCard = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

const StlogWrapper = styled.div`
    margin: 40px 0;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #5eb470;
    border-radius: 5px;
    border: 1px solid #5eb470;
    width: 100%;
    gap: 2rem;
    overflow: hidden;

    & ${Stdiv} {
        font-size: 25px;
    }

    & input {
        border: ${(props) => (props.isEditing ? '1px solid red' : '1px solid #5eb470')};
        width: 100%;
        max-width: 320px;
        height: 48px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 16px;
        &:focus {
            outline: 1px solid #5eb470;
        }
    }
`;
