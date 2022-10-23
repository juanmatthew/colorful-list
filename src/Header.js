import React from "react";

const Header = () => (
    <header>
        <h1 className= "header_title">To-Do List</h1>
        <h2>Together we can create lists and then complete them</h2>
         <h3><em>or else our anxiety is gonna come steal our lunch money.</em></h3>
        <aside>
            <button> Add New Note!</button>
            <input className="" type="" placeholder="Type here to shuffle through your notes!"/>
        </aside>
    </header>
);

export default Header;