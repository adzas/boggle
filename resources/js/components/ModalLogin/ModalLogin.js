import React, {useState} from 'react';
import './ModalLogin.css';

function ModalLogin({login}) {

    const [nick, setNick] = useState('');
    const setPlayerNick = (e) => {
        setNick(e.target.value);
    }
    
    return(
        <div class="modalLogin" >
            <div className="backgroundModal">

            </div>
            <div className="backgroundModalLogin">
                <div className="modalContent">
                    <div className="modalHeader">

                        <h2>Zaloguj się</h2>
                        <div className="LoginRow">
                            <label for="nick">Nick:</label>
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