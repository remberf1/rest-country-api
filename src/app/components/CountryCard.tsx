'use client';
import Link from 'next/link';
import styles from '../styles/_countrycard.module.scss';
import Image from 'next/image';

interface CountryCardProps {
  country: {
    name: string;
    population: number;
    region: string;
    capital: string;
    flag: string;
  };
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${encodeURIComponent(country.name)}`} className={styles.cardLink}>
      <div className={styles.card}>
        <Image src={country.flag} width={500} height={360} alt={`Flag of ${country.name}`} className={styles.flag} />
        <div className={styles.content}>
          <h3>{country.name}</h3>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital}</p>
        </div>
      </div>
    </Link>
  );
}