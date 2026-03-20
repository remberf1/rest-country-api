'use client';
import Link from 'next/link';
import styles from '../styles/_countrycard.module.scss';
import Image from 'next/image';

interface CountryCardProps {
  country: {
    name: string;
    population: number;
    region: string;
    capital?: string;
    flag: string;
    alpha3Code: string; // Add this so we can link by code
  };
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    /* Change the href to use alpha3Code */
    <Link 
      href={`/country/${country.alpha3Code.toLowerCase()}`} 
      className={styles.cardLink}
    >
      <article className={styles.card}>
        <div className={styles.flagWrapper}>
          <Image 
            src={country.flag} 
            alt={`Flag of ${country.name}`} 
            fill 
            sizes="264px"
            className={styles.flag}
            priority={false}
          />
        </div>
        <div className={styles.content}>
          <h3>{country.name}</h3>
          <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Capital:</strong> {country.capital || 'N/A'}</p>
        </div>
      </article>
    </Link>
  );
}