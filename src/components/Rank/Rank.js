import React from "react";

const Rank = ({ user }) => {
    return (
        <div>
            <div className='f3'>
                {`${user.name}, your currently have ${user.entries} entries`}
            </div>
            <div className='f1'>
                {'#5'}
            </div>
        </div>
    );
}

export default Rank;