import styles from '../styles/_bordercountry.module.scss';
interface CountryBorderProps {
  name: string;
}

export default function BorderCountry({ name }: CountryBorderProps) {
  return (
    <div className={styles.grid}>
      <p className={styles.name}>{name}</p>
    </div>
  );
}