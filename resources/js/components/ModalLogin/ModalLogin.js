import React, {useState} from 'react';
import './ModalLogin.css';

function ModalLogin({login, error}) {

    const [nick, setNick] = useState('');
    const setPlayerNick = (e) => {
        setNick(e.target.value);
    }
    
    return(
        <div className="modalLogin" >
            <div className="backgroundModal">

            </div>
            <div className="backgroundModalLogin">
                <div className="modalContent">
                    <div className="modalHeader">

                        <h2>Wejdź do pokoju</h2>
                        {!!error ? <span className="centerModal errorAlert">{error}</span> : ''}
                        <div className="LoginRow">
                            <label htmlFor="nick">Nick:</label>
                            <input id="nick" placeholder="Nick" onKeyUp={(e)=>{ setPlayerNick(e) }}/>
                        </div>
                        <div className="LoginRow">
                            <button 
                                className="loginButton"
                                onClick={login}
                                value={nick}
                            >
                                Zatwierdź
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalLogin;