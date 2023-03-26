import { useState, useEffect } from 'react';

export default function UserName() {
  const [myUsername, setMyUsername] = useState('Selena');
  // Get User's name
  const UserName = `${myUsername.charAt(0).toUpperCase()}${myUsername.slice(1)}'s`;

  return(
    <span>{UserName}</span>
  )
}
