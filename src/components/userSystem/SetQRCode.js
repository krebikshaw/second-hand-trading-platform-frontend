import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/userHooks/useUser';
import { COLOR, FONT, DISTANCE, EFFECT } from '../../constants/style';

const SetAvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PreviewAvatar = styled.img`
  box-shadow: ${EFFECT.shadowInput};
  height: 150px;
  width: 150px;
  border-radius: 15px;
  object-fit: cover;
`;

const RightSide = styled.div`
  padding: ${DISTANCE.md};
  min-width: max-content;
`;

const Description = styled.p`
  color: ${COLOR.text_2};
  font-size: ${FONT.xs};
  margin-bottom: ${DISTANCE.md};
`;

const Label = styled.label`
  border: solid 1px transparent;
  border-radius: 8px;
  padding: ${(props) => (props.$size === 'lg' ? '10px 90px' : '10px 20px')};
  background-color: ${COLOR.btn_primary};
  color: ${COLOR.white};
  margin: ${DISTANCE.md} 0;
  min-width: max-content;
  width: 200px;
  &:hover {
    transform: scale(1.05);
  }
`;

const InputFile = styled.input`
  display: none;
`;

export default function SetQRCode({ setSocialMediaId }) {
  const { user, handleUploadQRCode } = useUser();
  const [qrCodeUrl, setQrCodeUrl] = useState('https://i.imgur.com/uqZxFCm.png');

  const handleChangeFile = (e) => {
    const uploadEvent = e.target.files[0];
    const file = e.target.files.item(0);
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
      setQrCodeUrl(e.target.result);
      handleUploadQRCode(uploadEvent).then((result) =>
        setSocialMediaId(result)
      );
    });
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (user.socialmedia_id) setQrCodeUrl(user.socialmedia_id);
  }, [user]);

  return (
    <SetAvatarContainer>
      <PreviewAvatar src={qrCodeUrl} alt='圖片載入失敗' />
      <RightSide>
        <Description>
          從電腦中選取圖檔<br></br>上傳 QR-Code
        </Description>
        <Label>
          <InputFile type='file' onChange={handleChangeFile} />
          上傳檔案
        </Label>
      </RightSide>
    </SetAvatarContainer>
  );
}