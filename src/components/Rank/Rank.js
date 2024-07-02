import React from "react";

const Rank = ({ user }) => {
    return (
        <div>
            <div className='f3'>
                {`${user.name}, your total entries are`}
            </div>
            <div className='f1'>
                {user.entries}
            </div>
        </div>
    );
}

export default Rank;