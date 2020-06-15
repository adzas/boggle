import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Room.css';
import Letters from './Letters/Letters.js';
import GenerateButton from './GenerateButton/GenerateButton.js';
import ReadyButton from './ReadyButton/ReadyButton.js';
import Timer from './Timer/Timer.js';
import Player from './Player/Player.js';
import OtherPlayers from './OtherPlayers/OtherPlayers.js';
import ModalLogin from './ModalLogin/ModalLogin.js';


function Room() {
        
    const path = 'http://127.0.0.1/boggle/public/';
    const counter = 60;
    const [loginAuthorization, setLoginAuthorization] = useState(false);
    const [load, setLoad] = useState(false);
    const [timer, setTimer] = useState(counter);
    const [player, setPlayer] = useState({nick: null, arrayWords: [], state: 0});
    const [otherPlayers, setOtherPlayers] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [error, setError] = useState(null);
    const [errorModal, setErrorModal] = useState(null);
    const [readyPlayer, setReadyPlayer] = useState(false);
    const [justWord, setJustWord] = useState('');
    const [endRound, setEndRound] = useState(false);
  
    const [lettersArray, setLettersArray] = useState(
      [
        '..', '..', '..', '..',
        '..', '..', '..', '..',
        '..', '..', '..', '..',
        '..', '..', '..', '..',
      ]
    );

    useEffect(() => {

        setTimeout(() => {
          if(timer != 0 && isStart)
            setTimer(timer-1);
          else
          {
            setTimer(counter)
            setEndRound(true);
          }
        }, 1000);
    
    }, [isStart, timer]);


    useEffect(()=>{
      if(endRound===true){
        sendWords();
        getPlayers();
        setEndRound(false);
      }
    }, [endRound]);


    const generateLettersArray = (checkOldArray) => {
      
      setLoad(true);
      setIsStart(false);
      setPlayer({
        nick: player.nick, 
        arrayWords: [], 
        state: player.state
      });
      getPlayers();
      setTimeout(() => {
        setError(null)
        const adress = 'generate';
        axios.get(path + adress, {
          params: {
            id: 1, 
            checkOldArray: checkOldArray
          }
        })
        .then(function (response) {
          if(response.data != null)
          {
            setLettersArray(response.data);
            setIsStart(true);
            setLoad(false);
            
            if(!checkOldArray)
            setTimer(counter);
          }
          else
          {
            setLoad(false);
            setError('Serwer nie daje sensownych odpowiedzi, spróbuj później.');
          }
        })
        .catch(function (error) {
          setLoad(false);
          setError('Chwilowo nie można wygenerować nowych liter, spróbuj później.');
        })
        .then(function () {
        });
      }, 2000);
    }
  

  const checkLogin = () => {
    const adress = 'checkLogin?room=1';
    axios.get(path + adress)
    .then(function (response) {
      if(response.data.length != 0)
      {
        setPlayerHandler(response.data);
        setLoginAuthorization(true);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      
    });
  }


  const getplayerObject = (date) => {
    const object = {
      nick: date.nick, 
      arrayWords: date.arrayWords.split(','),
      state: date.state
    }
    return object;
  }


  const setPlayerHandler = (date) => {
    setPlayer(getplayerObject(date));
  }

  const login = (e) => {
    
    //axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
        //axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    }

    var datePost = {
      nick: e.target.value
    };

    const adress = `login?nick=${e.target.value}`;
    //axios.post(path + adress, true, { params: datePost }
    axios.get(path + adress
    ).then(function (response) {
      if(response.data.length == 0) 
      {
        setErrorModal('Taki gracz jest już zalogowany')
      }
      else
      {
        setPlayerHandler(response.data);
        setLoginAuthorization(true);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

  }


  const getPlayers = () => {
    console.log('pobiera graczy');
    const adress = 'getPlayers?room=1';
    axios.get(path + adress)
    .then(function (response) {
      console.log(response.data.length);
      if(response.data.length != 0)
      {
        setOtherPlayersHandler(response.data);
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      
    });
  }



  const setOtherPlayersHandler = (date) => {
    var players = [];
    date.map((p, i) => {
      players[i] = getplayerObject(p);
    });
    setOtherPlayers(players);
  }

  
  const saveWords = (event) => {
    
    if(event.keyCode === 13 && !!event.target.value)
    {
      setPlayer({
        nick: player.nick, 
        arrayWords: [...player.arrayWords, event.target.value], 
        state: player.state
      });
      setJustWord('');
    }
    else
    {
      console.log('wartosc: ',event.target.value);
      setJustWord(event.target.value);
    }
  }
  
  const handleInputChange = (event) => {
    setJustWord(event.target.value);
  }


  const sendWords = () => {

    const sendWords = {
      'words': player.arrayWords
    };

    console.log('wysyła słowa:', player.arrayWords);
      
    const adress = 'saveWords';
    axios.post(path + adress, true, { params: sendWords })
    .then(function (response) {
      setPlayerHandler(response.data);
      console.log('ustawia gracza: ', response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }

  /**
   * sprawdza czy zostałeś już zalogowany w tej sesji
   */
   useEffect(()=>{
     
     if(loginAuthorization)
     {
        getPlayers();
        
        //testwordsArray = JSON.parse(player.wordsArray);
        //console.log('wordsArray', testwordsArray)
     }
     else
     {
        checkLogin();
     }

   }, [loginAuthorization])

   const readyButtonClick = () => {
    setOldArrayLetters();
    setReadyPlayer(true);
   }

   const setOldArrayLetters = () => {
      const checkOldArray = true;
      generateLettersArray(checkOldArray);
   }

   return (
    <div className="App">
      {loginAuthorization ? '' : <ModalLogin login={login} error={errorModal} />}
      { readyPlayer ?
          <GenerateButton gen={generateLettersArray} check={setOldArrayLetters} start={isStart} />
           :
          <ReadyButton onclick={readyButtonClick} />
      }
      <Letters letters={lettersArray} isStart={isStart} />
      {error!=null ? <span className="center errorAlert">{error}</span> : ''}
      { load ? 
        <span className="loader">Loading...</span>
         : 
        <Timer value={timer} setIsStartHandle={setIsStart} />
      }
      {player.nick == null ? 
       ''
        : 
       <Player 
        player={player} 
        counter="null"
        saveWords={saveWords} 
        justWord={justWord} 
        handleInputChange={handleInputChange} />
      }
      {<OtherPlayers otherPlayersArray={otherPlayers} />}
    </div>
  );
}

export default Room;