import styles from '../styles/_countrydetail.module.scss';
interface CountryDetailsProps {
  title: string;
  value: string | number | string[];
}

export default function CountryDetails({ title, value }: CountryDetailsProps) {
  return (
    <div className={styles.detail_item}>
      <span className={styles.title}>{title}: </span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}