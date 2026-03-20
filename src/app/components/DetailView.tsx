'use client';
import { use } from 'react';
import CountryFlag from "@/app/components/CountryFlag";
import BackButton from "@/app/components/BackButton";
import CountryDetails from "@/app/components/CountryDetails";
import BorderCountry from "@/app/components/BorderCountry";
import data from "@/app/data.json";
import styles from "@/app/styles/_detail.module.scss";

interface PageProps {
  params: Promise<{ countryName: string }>;
}

export default function DetailView({ params }: PageProps) {
  // 1. Unwrap the params to get the ID from the URL
  const resolvedParams = use(params);
  const countryId = resolvedParams?.countryName || "";

  // 2. Find the specific country using alpha3Code (the safest way)
  const country = data.find(
    (c) => c.alpha3Code?.toLowerCase() === countryId?.toLowerCase()
  );

  // 3. Handle the "Not Found" state
  if (!country) {
    return (
      <div className={styles.container}>
        <BackButton />
        <p style={{ marginTop: '2rem' }}>Country not found: {countryId}</p>
      </div>
    );
  }

  // 4. Extract arrays into readable strings
  const currencies = country.currencies?.map(curr => curr.name).join(', ') || 'N/A';
  const languages = country.languages?.map(lang => lang.name).join(', ') || 'N/A';

  return (
    <div className={styles.container}>
      <div className={styles.backButtonRow}>
        <BackButton />
      </div>

      <div className={styles.detail_container}>
        {/* Left Col: Flag */}
        <div className={styles.detail_flag}>
          <CountryFlag flag={country.flags.svg} />
        </div>

        {/* Right Col: Details */}
        <div className={styles.detail_info}>
          <h1 className={styles.title}>{country.name}</h1>

          <div className={styles.details_grid}>
            {/* List 1 */}
            <div>
              <CountryDetails title="Native Name" value={country.nativeName} />
              <CountryDetails title="Population" value={country.population.toLocaleString()} />
              <CountryDetails title="Region" value={country.region} />
              <CountryDetails title="Sub Region" value={country.subregion || 'N/A'} />
              <CountryDetails title="Capital" value={country.capital || 'N/A'} />
            </div>

            {/* List 2 */}
            <div>
              <CountryDetails title="Top Level Domain" value={country.topLevelDomain?.[0] || 'N/A'} />
              <CountryDetails title="Currencies" value={currencies} />
              <CountryDetails title="Languages" value={languages} />
            </div>
          </div>

          {/* Border Countries Section */}
          {country.borders && country.borders.length > 0 && (
            <div className={styles.border_countries}>
              <span className={styles.border_title}>Border Countries:</span>
              <div className={styles.border_list}>
                {country.borders.map((borderCode) => {
                  // Look up the full name of the border country using its code
                  const borderData = data.find(c => c.alpha3Code === borderCode);
                  return (
                    <BorderCountry 
                      key={borderCode} 
                      code={borderCode} 
                      name={borderData ? borderData.name : borderCode} 
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