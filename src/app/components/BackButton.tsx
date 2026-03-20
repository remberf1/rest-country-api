import { ArrowLeft } from "lucide-react"
import Link from 'next/link';
import styles from "../styles/_backbutton.module.scss"
function BackButton(){
    return(
        <Link href={`/`} className={styles.link}>
<div className={styles.container}>
    <button className={styles.button}>
    <div>
<ArrowLeft />
    </div>
    <p>Back</p>
    </button>
</div>
        </Link>
    )
}

export default BackButton