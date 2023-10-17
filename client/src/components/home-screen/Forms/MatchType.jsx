

import React from 'react';


function MatchType(props) {
    let handleSubmit = () => {
        if ('type' === 'join') {
            props.history.push('/join');
        }
        else if ('type' === 'create') {
            props.history.push('/create');
        }
    }
    return (
        <div className="start-game-form-buttons">
            <button className="join-button" type="submit" onSubmit={handleSubmit(this, 'join')}>
                Join
            </button>
            <br />
            <button className="create-button" type='submit' onSubmit={handleSubmit(this, 'create')}>
                Create
            </button>
        </div>
    );
}

export default MatchType;