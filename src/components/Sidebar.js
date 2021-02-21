import React from 'react'

const Sidebar = () => {
    const [fullName, setFullname] = React.useState('Act');
    const [isShow, setIsShow] = React.useState(true);
    const changName = () =>{
        // fullName = 'Suttipong';
        setFullname('Suttipong');
        setIsShow(!isShow);
    }
    React.useEffect(() => {
        console.log("use effect");
    });
    React.useEffect(() => {
        console.log("use effect one time");
    }, []);
    React.useEffect(() => {
        console.log(`sidebar useEffect => ${fullName}`);
    }, [fullName]);
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
