import logo from './logo.svg';
import './App.css';
import UserFullName from './components/UserInformation/FullName/UserFullName';
import UserSection from './components/UserInformation/Section/UserSection';
import UserInfo from './components/UserInformation/Info/UserInfo';
import { useState } from 'react';

function App() {

  const [UserInformation, setUserInformation] = useState({
    firstname: 'Jocas Arabella',
    middlename: 'Santos',
    lastname: 'Cruz',
    description: 'Hands On 1'
  });

  const [isMoving, setIsMoving] = useState(true)

  function UpdateName() {
    UserInformation.firstname = 'Cas'
    setUserInformation({ ...UserInformation});
  }

  function MoveAnimation(){
    setIsMoving(!isMoving);
  }

  return (
    <div className="App">
      <UserFullName
        firstname={UserInformation.firstname}
        middlename={UserInformation.middlename}
        lastname={UserInformation.lastname}
      />
      <UserSection/>
      <UserInfo/>

      <div className="animation">
        <div className="moon"></div>
        <div className="sun"></div>
      </div>

      <button type='button' onClick={UpdateName}>
        Update Name
      </button>
      <button type='button' onClick={() => setIsMoving(!isMoving)}>Move moon</button>

    </div>
  );
}

export default App;
