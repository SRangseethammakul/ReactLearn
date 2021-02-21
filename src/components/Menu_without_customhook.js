import React from 'react'

const Menu = () => {
    const [hover, setHover] = React.useState(false);
    const mouseOver = () => {
        setHover(true);
    }
    const mouseOut = () => {
        setHover(false);
    }
    return (
        <div>
            <h1>Menu</h1>
            {
                hover ? <h3>Main Menu</h3> : null
            }
            <img onMouseOver={mouseOver} onMouseOut={mouseOut} src="./logo192.png" />
        </div>
    )
}

export default Menu
