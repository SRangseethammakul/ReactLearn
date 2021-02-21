import React from 'react'

const Sidebar = () => {
    const [fullName, setFullname] = React.useState('Act');
    const [isShow, setIsShow] = React.useState(true);
    const changName = () =>{
        // fullName = 'Suttipong';
        setFullname('Suttipong');
        setIsShow(!isShow);
    }
    return (
        <>
            <h3>Side Bar {fullName}</h3>
            {
                isShow ? <p>Hello</p> : <p>World</p>
            }
            <button onClick={changName}>changeName</button>
        </>
    )
}

export default Sidebar
