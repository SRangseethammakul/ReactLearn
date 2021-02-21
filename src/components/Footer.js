import React from 'react'
import PropTypes from 'prop-types';
const Footer = ({title, site, postcode, isOpen}) => {
    // const {title, site, postcode} = props;
    return (
        <div>
            <h2 style={style.title}>{title} &copy; {new Date().getFullYear()}</h2>
            <p>{site} {postcode} {isOpen.toString()}</p>
            <h2 style={{color:'green', fontSize:16}}>FROM Footer</h2>
        </div>
    )
}
const style = {
    title : {
        color : 'red'
    }
}
Footer.propTypes = {
    title: PropTypes.string,
    site: PropTypes.string,
    postcode: PropTypes.number,
    isOpen: PropTypes.bool
};
export default Footer
