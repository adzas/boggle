import React, { useState, useEffect } from 'react';
import './Room.css';
import axios from 'axios';
import Letters from './Letters/Letters.js';
import GenerateButton from './GenerateButton/GenerateButton.js';
import Timer from './Timer/Timer.js';
import Player from './Player/Player.js';
//import ModalLogin from './components/ModalLogin/';


function Room() {
        
    const path = '/boggle/';
    const [timer, setTimer] = useState(180);
    const [player, setPlayer] = useState({nick: null, arrayWords: [], state: 0});
    const [isStart, setIsStart] = useState(false);

    const [lettersArray, setLettersArray] = useState(
        [
            '+', '+', '+', '+',
            '+', '+', '+', '+',
            '+', '+', '+', '+',
            '+', '+', '+', '+',
        ]
    );

    useEffect(() => {

        if(isStart) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        }

    }, [isStart, timer]);


    const generateLettersArray = () => {

        const adress = 'public/generateLettersArray/1';
        //axios.get(`http://boggle.andrzejnogala.pl/${adress}`)
        //axios.get(`http://127.0.1.1/boggle/${adress}`)
        axios.get(path + adress)
        .then(function (response) {
        setLettersArray(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        setTimer(180);
        setIsStart(true);
        });
    }

    const checkLogin = () => {
        const adress = 'public/checkLogin?room=1';
        //axios.get(`http://boggle.andrzejnogala.pl/${adress}`)
        //axios.get(`http://127.0.1.1/boggle/${adress}`)
        axios.get(path + adress)
        .then(function (response) {
        //console.log(response);
        setPlayer(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        
        });
    }

    const login = (e) => {
        var datePost = {
        nick: e.target.value
        };
        const adress = 'public/login';
        //axios.get(`http://boggle.andrzejnogala.pl/${adress}`)
        axios.post(`http://127.0.1.1/boggle/${adress}`, datePost)
        .then(function (response) {
            //console.log(response);
            setPlayer(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    /**
     * sprawdza czy zostałeś już zalogowany w tej sesji
     */
    //checkLogin();

    return (
        <div className="App">
            {/* <ModalLogin login={login} /> */}
            <GenerateButton onclick={generateLettersArray} />
            <Letters letters={lettersArray} isStart={isStart} />
            <Timer value={timer} setIsStartHandle={setIsStart} />
            {/* <Player player={player} /> */}
            {/* <OtherPlayer key={i} name={name} valueInput="" /> */}
        </div>
    );
}

export default Room;