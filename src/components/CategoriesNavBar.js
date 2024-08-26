import React from "react";
import { NavLink } from 'react-router-dom';

const CategoriesNavBar = () => {
    return(
        <ul className="categries-navbar">
             <li>
                <NavLink to={'all-products'} >all products</NavLink>
            </li>
            <li>
                <NavLink to={'clothes'}>clothes</NavLink>
            </li>
            <li>
                <NavLink to={'electronics'}>electronics</NavLink>
            </li>
            <li>
                <NavLink to={'furniture'}>furniture</NavLink>
            </li>
            <li>
                <NavLink to={'shoes'}>shoes</NavLink>
            </li>
            <li>
                <NavLink to={'miscellaneous'}>miscellaneous</NavLink>
            </li>
        </ul>
    )
}

export default CategoriesNavBar;