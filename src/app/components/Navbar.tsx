'use client';
import {Moon} from "lucide-react";
import styles from "../styles/_navbar.module.scss"
import { useState, useEffect} from "react";
function Navbar(){
    console.log("Navbar rendered"); // 👈 ADD THIS
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
        } else {
           root.classList.remove('dark');
        }
    },[darkMode]);
    return(
        <div className={styles.navbar} >
            Where in the world?
        <div className={styles.darkmode_container}>
            <button className={styles.button} onClick={() => setDarkMode(prev => !prev)
            }>
            <Moon />
            Dark mode
            </button>
        </div>
        </div>
    )
}
export default Navbar