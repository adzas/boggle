import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dist/Room.css';
import Letters from './Letters/Letters.js';
import GenerateButton from './GenerateButton/GenerateButton.js';
import ReadyButton from './ReadyButton/ReadyButton.js';
import Timer from './Timer/Timer.js';
import Player from './Player/Player.js';
import OtherPlayers from './OtherPlayers/OtherPlayers.js';
import ModalLogin from './ModalLogin/ModalLogin.js';
import Menu from './Menu';
import CheckWordInput from './CheckWordInput';
import { isArray } from 'lodash';

function Room({roomId}) {
        
    const path = 'http://local.boggle.pl/';

    /**
     * Czas na runde
     */
    const timer = 15; // wartość domyślna odliczania
    const [counter, setCounter] = useState(counter); // zmienna licznika
    const [isStart, setIsStart] = useState(false);
    const [endRound, setEndRound] = useState(false);
    const [enteredWordToCheck, setEnteredWordToCheck] = useState('');
    const [statusCheckedWord, setStatusCheckedWord] = useState('');

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
      words: [],
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
    }, [roomId])

    useEffect(() => {
      if (enteredWordToCheck.length >= 3) {
        checkOneWord();
      }
    }, [enteredWordToCheck])


    useEffect(()=>{
      console.log('loginAuthorization - useEffect');
      getPlayers();
    }, [loginAuthorization])


    const checkWords = () => {
      axios.post(path + 'check-words', {
        params: {
          "room": roomId,
          "words": player.words
        }
      }).then(function(response) {
        setPlayerHandler(response.data);
      }).catch(function(error) {
        setError(error);
      })
    }

    const checkOneWord = () => {
      axios.get(path + `check-word/${enteredWordToCheck}`)
      .then(function(response) {
        setStatusCheckedWord(response.data);
      }).catch(function(error) {
        console.log(response.data);
      })
    }

    const generateLettersArray = (checkOldArray) => {
      
      setLoad(true);
      setIsStart(false);
      setPlayer({
        nick: player.nick, 
        room: player.room,
        words: [], 
        state: player.state
      });
      getPlayers();
      setTimeout(() => {
        setError(null)
        const adress = 'generate-letters';
        axios.get(path + adress, {
          params: {
            id: roomId,
            checkOldArray: checkOldArray
          }
        })
        .then(function (response) {
          if(response.data != null && isArray(response.data))
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
      words: [],
      state: date.state
    }

    if (date.words !== undefined) {
      if (date.words.length > 0) {
        object.words = date.words;
      }
    }

    return object;
  }


  const setPlayerHandler = (date) => {
    if (false !== date) {
      setPlayer(getPlayerObject(date));
    }
  }

  const login = (e) => {
    setErrorModal(null);
    const adress = 'login';
    axios.post(path + adress, true, { 
      params: {
        nick: e.target.value,
        room: roomId
      }
    })
    .then(function (response) {
      if(response.data.length == 0) 
      {
        setErrorModal('Taki gracz jest już zalogowany lub wpisany nick jest niedozwolony.')
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
        words: [...player.words, {
          word: event.target.value
        }],
        state: player.state
      });
      setJustWord('');
    }
    else
      setJustWord(event.target.value);
  }

  const storeCheckWord = (event) => {
    if (event == '###') {
      setEnteredWordToCheck('');
    } else {
      setEnteredWordToCheck(event.target.value);
    }
  }

  const sendWords = () => {
    if(player.words.length > 0) {
      axios.post(path + 'saveWords', true, { 
        params: {
          'words': player.words,
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

      <Menu />
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

      <CheckWordInput
        enteredWordToCheck={enteredWordToCheck}
        storeCheckWord={storeCheckWord}
        checkOneWord={checkOneWord}
        statusCheckedWord={statusCheckedWord}
      />

      {/* JEŚLI ZAŁADOWANO LITERY WYŚWIETLA TIMER I ROZPOCZYNA ODLICZANIE */}
      { load ? 
        <span className="loader">Loading...</span>
         : 
        <Timer value={counter} setIsStartHandle={setIsStart} />
      }

      <div className="playerContent">
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

      {/* USUWA WSZYSTKICH GRACZY Z POKOJU - RESET */}
      <button className="btn btn-default buttonRefresh" onClick={resetRoom} >ResetRoom</button>

    </div>
  );
}

export default Room;