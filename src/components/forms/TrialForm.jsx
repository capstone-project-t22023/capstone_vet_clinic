import React, { useContext } from 'react';
import ProgramContext from '../../contexts/ProgramContext';


export default function TrialForm(props) {

    const {user, authenticated} = useContext(ProgramContext);

  return (
    <div>
        User info: {user.firstname}
        Authenticated: {JSON.stringify(authenticated)}
    </div>
  )
}
