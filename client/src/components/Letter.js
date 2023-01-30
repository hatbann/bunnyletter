import React from 'react';
import { useState } from 'react';

const Letter = (data) => {
  const [imgUrl, setImgURL] = useState(data.imgUrl);
  const [letterContext, setLetterContext] = useState(data.letterContext);
  const [receiverId, setReceiverId] = useState(data.receiverId);
  const [senderId, setSenderId] = useState(data.senderId);

  return (
    <div>
      <span>From. {senderId}</span>
      <p>{letterContext}</p>
      <span>To. {receiverId}</span>
    </div>
  );
};

export default Letter;
