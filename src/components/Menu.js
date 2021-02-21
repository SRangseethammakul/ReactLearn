import React from 'react'
import useHover from '../hooks/useHover'
const Menu = () => {
    const [hover, attrs] = useHover()
    return (
        <div>
            <h1>Menu</h1>
            {
                hover ? <h3>Main Menu</h3> : null
            }
            <img {...attrs} src="./logo192.png" />
        </div>
    )
}

export default Menu
