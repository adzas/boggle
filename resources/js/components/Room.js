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

    /**
     * Czas na runde
     */
    const timer = 60; // wartość domyślna odliczania
    const [counter, setCounter] = useState(counter); // zmienna licznika
    const [isStart, setIsStart] = useState(false);
    const [endRound, setEndRound] = useState(false);

    /**
     * Logowanie
     */
    const [loginAuthorization, setLoginAuthorization] = useState(false);
    const [load, setLoad] = useState(false);

    /**
     * Ty i pozostali gracze
     */
    const [player, setPlayer] = useState({
      nick: null, 
      room: 0, 
      arrayWords: [], 
      stateWords: [], 
      state: 0
    });
    const [otherPlayers, setOtherPlayers] = useState([]);
    const [readyPlayer, setReadyPlayer] = useState(false);
    
    /**
     * słowa i litery
     */
    const [justWord, setJustWord] = useState(''); // aktualnie wpisywane słowo
    const [lettersArray, setLettersArray] = useState(
      [
        'A', 'B', 'K', 'I',
        'B', 'C', 'E', 'H',
        'A', 'D', 'E', 'R',
        'F', 'G', 'A', 'C',
      ]
    ); // domyslna tablica liter
    
    /**
     * Obsługa błędów
     */
    const [error, setError] = useState(null);
    const [errorModal, setErrorModal] = useState(null);


    const checkIfWordCanBeMaked = (word) => {

      const characters = word.split('');
      for (let i = 0; i < word.length; i++) {
        var char = characters[i];
        //console.log('char: ' + char);
      }
    }

    useEffect(() => {
        checkIfWordCanBeMaked('ABCD');

        setTimeout(() => {
          if(counter != 0 && isStart)
            setCounter(counter-1);
          else
          {
            setCounter(timer)
            setEndRound(true);
          }
        }, 1000);
    
    }, [isStart, counter]);


    useEffect(()=>{
      if(endRound===true){
        console.log('endRound - useEffect');
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
      //getPlayers(); // nie trzeba bo przy sprawdzaniu zalogowanego gracza zmienia się stan loginAuthoryzation
    }, [roomId])


    useEffect(()=>{
      console.log('loginAuthorization - useEffect');
      getPlayers();
    }, [loginAuthorization])


    const checkWords = () => {
      
      axios.get(path + 'checkDictionary', {
        params: {
          "room": roomId,
          "words": player.arrayWords
        }
      }).then(function(response) {
        setPlayerHandler(response.data);
      }).catch(function(error) {
        setError(error);
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
            setCounter(timer);
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
    setError(null);
    const adress = `resetRoom?room=${roomId}`;
    axios.get(path + adress)
      .then(function(response) {
        checkLogin();
      })
      .catch(function(error) {
        setError(error);
      })
  }

  const checkLogin = () => {
    setError(null);
    const adress = `checkLogin?room=${roomId}`;
    axios.get(path + adress)
    .then(function (response) {
      if(response.data.length == 0)
      {
        setLoginAuthorization(false);
      }
      else
      {
        setPlayerHandler(response.data);
        setLoginAuthorization(true);
      }
    })
    .catch(function (error) {
      // handle error
      setError(error);
    });
  }


  const getPlayerObject = (date) => {
    
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
    setPlayer(getPlayerObject(date));
  }

  const login = (e) => {
    
    //axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    let token = document.head.querySelector('meta[name="csrf-token"]');
    
    if (token) {
      //axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
    } else {
      /* CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token */
      setError('Zablokowano połączenie - brak tokenu bezpieczeństwa');
    }
    
    setErrorModal(null);
    const adress = `login?nick=${e.target.value}&room=${roomId}`;
    axios.post(path + adress, true, { 
      params: {
        nick: e.target.value,
        room: roomId
      }
    })
    .then(function (response) {
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
      setError(error);
    });

  }


  const getPlayers = () => {
    if(loginAuthorization) {
      const adress = `getPlayers?room=${roomId}`;
      axios.get(path + adress)
      .then(function (response) {
        if(response.data.length == 0)
        {
          setOtherPlayers([]);
        }
        else
        {
          setOtherPlayersHandler(response.data);
        }
      })
      .catch(function (error) {
        // handle error
        setError(error);
      });
    }
  }


  const setOtherPlayersHandler = (date) => {
    const players = [];
    date.map((p, i) => {
      players[i] = getPlayerObject(p);
    });
    setOtherPlayers(players);
  }


  const saveWords = (event) => {
    
    if(event.keyCode === 13 && !!event.target.value) {
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
      setJustWord(event.target.value);
  }


  const sendWords = () => {
    if(player.arrayWords.length > 0) {
      axios.post(path + 'saveWords', true, { 
        params: {
          'words': player.arrayWords,
          'room' : roomId
        }
      })
      .then(function (response) {
        setPlayerHandler(response.data);
      })
      .catch(function (error) {
        setError(error);
      })
    }
  }

   const readyButtonClick = () => {
    generateLettersArray(true); // get old Letters Array
    setReadyPlayer(true);
   }

   return (
    <div className="roomContent">

      {/* MODAL LOGOWANIA (JEŚLI UŻYTKOWNIK NIE JEST ZALOGOWANY) */}
      {loginAuthorization ? '' : <ModalLogin login={login} error={errorModal} />}

      {/* JEŚLI GRACZ JEST WCISNĄŁ PRZYCISK GOTOWOŚCI WYŚWIRTLANY JEST GenerateButton */}
      { readyPlayer ?
          <GenerateButton gen={generateLettersArray} start={isStart} />
           :
          <ReadyButton onclick={readyButtonClick} />
      }

      {/* WYŚWIELTA 16 LITER */}
      <Letters letters={lettersArray} isStart={isStart} />

      {/* WYŚWIETLA BŁĘDY POŁĄCZEŃ */}
      {error!=null ? <span className="center errorAlert">{error}</span> : ''}

      {/* USUWA WSZYSTKICH GRACZY Z POKOJU - RESET */}
      <button className="buttonRefresh" onClick={resetRoom} >ResetRoom</button>

      {/* JEŚLI ZAŁADOWANO LITERY WYŚWIETLA TIMER I ROZPOCZYNA ODLICZANIE */}
      { load ? 
        <span className="loader">Loading...</span>
         : 
        <Timer value={counter} setIsStartHandle={setIsStart} />
      }

      {/* JEŚLI ZALOGOWANY WYŚWETLA PANEL GRACZA */}
      {loginAuthorization ? 
       <Player 
          player={player} 
          itsYou="true"
          saveWords={saveWords} 
          checkWords={checkWords} 
          justWord={justWord} 
          isStart={isStart}
          checkPlayers={getPlayers}
          setJustWord={setJustWord}
        />
        : 
          ''
      }

      {/* WYŚWIETLA INNYCH UŻYTKOWNIKÓW Z POKOJU (JEŚLI SĄ) */}
      {<OtherPlayers otherPlayersArray={otherPlayers} />}

    </div>
  );
}

export default Room;