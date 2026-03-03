import  {Search} from "lucide-react"
import styles from "../styles/_searchbutton.module.scss"
import { useState } from "react";
 interface SearchButtonProps {
        onSearch?: (query: string) => void;
        initialValue?: string;
    }
export default function FilterButton({onSearch, initialValue}: SearchButtonProps) {
    const [query, setQuery] = useState(initialValue || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(query.trim()){
            onSearch?.(query);

        }
    };
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter"){
            handleSubmit(e);
        }
    };
   
    return(
        <form className={styles.container}>
                <Search size={18} className={styles.searchIcon}/>
            <input type="search"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={handleKeyDown}
             placeholder="Search for a country..."
            aria-label="Search for a country"
            className={styles.searchInput}
             />
        </form>
    )
}