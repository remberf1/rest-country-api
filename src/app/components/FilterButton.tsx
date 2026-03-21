import { ChevronDown } from "lucide-react";
import styles from "../styles/_filterbutton.module.scss";
import { useState, useRef, useEffect } from "react";

interface FilterButtonProps {
  onFilterChange?: (region: string) => void;
  initialRegion?: string;
}

export default function FilterButton({ 
  onFilterChange, 
  initialRegion = "" 
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const regions = [
    "Africa",
    "Americas", 
    "Asia",
    "Europe",
    "Oceania"
  ];

  const handleSelect = (region: string) => {
    setSelectedRegion(region);
    onFilterChange?.(region);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <div className={styles.selectWrapper}>
        <button
          className={styles.filterButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedRegion || "Filter by Region"}</span>
          <ChevronDown className={`${styles.chevronIcon} ${isOpen ? styles.rotated : ""}`} size={20} />
        </button>

        {isOpen && (
          <ul className={styles.dropdownMenu} role="listbox">
            {regions.map((region) => (
              <li
                key={region}
                role="option"
                aria-selected={selectedRegion === region}
                className={`${styles.dropdownItem} ${selectedRegion === region ? styles.selected : ""}`}
                onClick={() => handleSelect(region)}
              >
                {region}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}