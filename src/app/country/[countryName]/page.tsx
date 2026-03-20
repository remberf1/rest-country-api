'use client';
import { use } from 'react';
import CountryFlag from "@/app/components/CountryFlag";
import BackButton from "@/app/components/BackButton";
import CountryDetails from "@/app/components/CountryDetails";
import BorderCountry from "@/app/components/BorderCountry";
import data from "@/app/data.json";
import styles from "@/app/styles/_detail.module.scss";

interface PageProps {
  // This MUST match the folder name [countryName]
  params: Promise<{ countryName: string }>;
}

export default function DetailView({ params }: PageProps) {
  // 1. Resolve the params object
  const resolvedParams = use(params);
  
  // 2. Access 'countryName' specifically. 
  // We use the optional chaining (?.) and a fallback empty string ('') 
  // to ensure .toLowerCase() NEVER runs on undefined.
  const countryId = resolvedParams?.countryName || "";

  // 3. Find by alpha3Code
  const country = data.find(
    (c) => c.alpha3Code?.toLowerCase() === countryId.toLowerCase()
  );

  // 4. Handle "Not Found" state
  if (!country) {
    return (
      <div className={styles.container}>
        <BackButton />
        <h2 style={{ marginTop: '2rem' }}>
  Country code {"\""}{countryId}{"\""} not found
</h2>
      </div>
    );
  }

  const languages = country.languages?.map((l) => l.name).join(", ") || "N/A";
  const currencies = country.currencies?.map((c) => c.name).join(", ") || "N/A";

  return (
    <div className={styles.container}>
      <div className={styles.backButtonRow}>
        <BackButton />
      </div>

      <div className={styles.detail_container}>
        <div className={styles.detail_flag}>
          <CountryFlag flag={country.flags.svg} />
        </div>

        <div className={styles.detail_info}>
          <h1 className={styles.title}>{country.name}</h1>

          <div className={styles.details_grid}>
            <div>
              <CountryDetails title="Native Name" value={country.nativeName} />
              <CountryDetails title="Population" value={country.population.toLocaleString()} />
              <CountryDetails title="Region" value={country.region} />
              <CountryDetails title="Sub Region" value={country.subregion || "N/A"} />
              <CountryDetails title="Capital" value={country.capital || "N/A"} />
            </div>

            <div>
              <CountryDetails title="Top Level Domain" value={country.topLevelDomain?.[0] || "N/A"} />
              <CountryDetails title="Currencies" value={currencies} />
              <CountryDetails title="Languages" value={languages} />
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className={styles.border_countries}>
              <span className={styles.border_title}>Border Countries:</span>
              <div className={styles.border_list}>
                {country.borders.map((borderCode) => {
                  const borderCountry = data.find(c => c.alpha3Code === borderCode);
                  return (
                    <BorderCountry 
                      key={borderCode} 
                      code={borderCode} 
                      name={borderCountry ? borderCountry.name : borderCode} 
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}