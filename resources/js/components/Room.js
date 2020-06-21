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


function Room({roomId}) {
        
    const path = 'http://127.0.0.1/boggle/public/';
    const counter = 60;
    const [loginAuthorization, setLoginAuthorization] = useState(false);
    const [load, setLoad] = useState(false);
    const [timer, setTimer] = useState(counter);
    const [player, setPlayer] = useState({nick: null, room: 0, arrayWords: [], stateWords: [], state: 0});
    const [otherPlayers, setOtherPlayers] = useState([]);
    const [isStart, setIsStart] = useState(false);
    const [error, setError] = useState(null);
    const [errorModal, setErrorModal] = useState(null);
    const [readyPlayer, setReadyPlayer] = useState(false);
    const [justWord, setJustWord] = useState('');
    const [endRound, setEndRound] = useState(false);
  
    const [lettersArray, setLettersArray] = useState(
      [
        'A', 'B', '?', '?',
        '?', 'C', '?', '?',
        'A', 'D', 'E', '?',
        '?', '?', '?', '?',
      ]
    );


    const checkIfWordCanBeMaked = (word) => {

      /* for (let i = 0; i < word.length; i++) {
        var element = word.chartAt(i);
        console.log('e: ' + element);
      } */
    }

    useEffect(() => {

        checkIfWordCanBeMaked('ABCD');

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


    /**
     * sprawdza czy zostałeś już zalogowany w tej sesji
     */
    useEffect(()=>{
      checkLogin();
      getPlayers();
    }, [roomId])


    useEffect(()=>{
        getPlayers();
    }, [loginAuthorization])

    window.onbeforeunload = (e) => {
      console.log(e);
      getPlayers();
    }


    const checkWords = () => {
      
      axios.get(path + 'checkDictionary', {
        params: {
          "room": roomId,
          "words": player.arrayWords
        }
      }).then(function(response) {
        setPlayerHandler(response.data);
      }).catch(function(error) {
        console.log(error);
      })
    }

    const generateLettersArray = (checkOldArray) => {
      
      setLoad(true);
      setIsStart(false);
      setPlayer({
        nick: player.nick, 
        room: player.room,
        arrayWords: [], 
        stateWords: [], 
        state: player.state
      });
      getPlayers();
      setTimeout(() => {
        setError(null)
        const adress = 'generateLettersArray';
        axios.get(path + adress, {
          params: {
            id: roomId, 
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
  

  const resetRoom = () => {
    const adress = `resetRoom?room=${roomId}`;
    axios.get(path + adress)
      .then(function(response) {
        console.log('resetRoom: ' + response.data);
        checkLogin();
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  const checkLogin = () => {
    const adress = `checkLogin?room=${roomId}`;
    axios.get(path + adress)
    .then(function (response) {
      if(response.data.length != 0)
      {
        setPlayerHandler(response.data);
        setLoginAuthorization(true);
      }
      else
      {
        setLoginAuthorization(false);
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
      room: date.room,
      arrayWords: date.arrayWords.split(','),
      stateWords: date.stateWords.split(','),
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
      nick: e.target.value,
      room: roomId
    };

    const adress = `login?nick=${e.target.value}&room=${roomId}`;
    axios.post(path + adress, true, { params: datePost }
    //axios.get(path + adress
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
    if(loginAuthorization)
    {
      const adress = `getPlayers?room=${roomId}`;
      axios.get(path + adress)
      .then(function (response) {
        console.log(response.data.length);
        if(response.data.length != 0)
        {
          setOtherPlayersHandler(response.data);
        }
        else
        {
          setOtherPlayersHandler([]);
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        
      });
    }
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
        room: player.room,
        arrayWords: [...player.arrayWords, event.target.value], 
        stateWords: [], 
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
      'words': player.arrayWords,
      'room' : roomId
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

   const readyButtonClick = () => {
    setOldArrayLetters();
    setReadyPlayer(true);
   }

   const setOldArrayLetters = () => {
      const checkOldArray = true;
      generateLettersArray(checkOldArray);
   }

   return (
    <div className="roomContent">
      {loginAuthorization ? '' : <ModalLogin login={login} error={errorModal} />}
      { readyPlayer ?
          <GenerateButton gen={generateLettersArray} check={setOldArrayLetters} start={isStart} />
           :
          <ReadyButton onclick={readyButtonClick} />
      }
      <Letters letters={lettersArray} isStart={isStart} />
      {error!=null ? <span className="center errorAlert">{error}</span> : ''}
      <button className="buttonRefresh" onClick={resetRoom} >ResetRoom</button>
      { load ? 
        <span className="loader">Loading...</span>
         : 
        <Timer value={timer} setIsStartHandle={setIsStart} />
      }
      {loginAuthorization ? 
       <Player 
        player={player} 
        counter="null"
        saveWords={saveWords} 
        checkWords={checkWords} 
        justWord={justWord} 
        isStart={isStart}
        checkPlayers={getPlayers}
        handleInputChange={handleInputChange} />
        : 
        ''
      }
      {<OtherPlayers otherPlayersArray={otherPlayers} />}
    </div>
  );
}

export default Room;