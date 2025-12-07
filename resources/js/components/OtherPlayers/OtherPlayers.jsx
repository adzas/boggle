import React from 'react';
import Player from '../Player/Player';
import './OtherPlayers.css';

function OtherPlayers({otherPlayersArray}) {

    return(
        <div className="otherPlayers">
            
            {otherPlayersArray.map((player, i) => {

                return <Player key={i} counter={i} player={player} />
            })}
            
        </div>
    );
}

export default OtherPlayers;