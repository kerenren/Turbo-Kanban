import React, { useState } from "react"
import { FaArrowCircleUp } from 'react-icons/fa';
import styles from "../styles/BackToTop.module.css"


const BackToTop = () => {
    const [showScroll, setShowScroll] = useState(false)

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 80) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 80) {
            setShowScroll(false)
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('scroll', checkScrollTop)

    return (
        <div className={styles.hvrIconUp}>
        <FaArrowCircleUp className={`${styles.scrollTop} ${styles.hvrIcon}` }onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} />
        </div>
    )
}


export default BackToTop
