import React from 'react'
import {logo} from '../styles/style'
import useHover from '../hooks/useHover'
const Logo = () => {
    const [hover, attrs] = useHover()
    const logoImage = {
        url : './logo192.png'
    };
    return (
        <div>
            {/* <img src="" /> */}
            {
                hover ? <h3>Hello</h3> : null
            }
            <img style={logo} {...attrs} src={logoImage.url} width="100" />
        </div>
    )
}

export default Logo
