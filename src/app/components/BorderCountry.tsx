import Link from 'next/link';
import styles from '../styles/_bordercountry.module.scss';

interface CountryBorderProps {
  name: string;
  code: string; // Add this to allow passing the alpha3Code
}

export default function BorderCountry({ name, code }: CountryBorderProps) {
  return (
    <div className={styles.grid}>
    <Link href={`/country/${code.toLowerCase()}`} className={styles.link}>
      <div className={styles.card}>
        <p className={styles.name}>{name}</p>
      </div>
    </Link>
    </div>
  );
}