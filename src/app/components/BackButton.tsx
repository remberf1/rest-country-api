import { ArrowLeft } from "lucide-react"
import styles from "../styles/_backbutton.module.scss"
function BackButton(){
    return(
<div className={styles.container}>
    <button className={styles.button}>
    <div>
<ArrowLeft />
    </div>
    <p>Back</p>
    </button>
</div>
    )
}

export default BackButton