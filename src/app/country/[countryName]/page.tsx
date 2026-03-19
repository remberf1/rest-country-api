// app/country/[countryName]/page.tsx
import CountryFlag from "@/app/components/CountryFlag";
import BackButton from "@/app/components/BackButton";
import CountryDetails from "@/app/components/CountryDetails";
import BorderCountry from "@/app/components/BorderCountry";
import data from "@/app/data.json";
import styles from "@/app/styles/_detail.module.scss";
import { notFound } from 'next/navigation';

interface DetailViewProps {
  params: {
    countryName: string;
  };
}

export default function DetailView({ params }: DetailViewProps) {
  // Log what we're looking for
  console.log("URL params:", params);
  console.log("Raw countryName from URL:", params.countryName);
  
  // Decode the URL parameter
  const countryName = decodeURIComponent(params.countryName);
  console.log("Decoded countryName:", countryName);
  
  // Log first few countries from data to see format
  console.log("First country in data:", data[0]?.name);
  console.log("Data sample:", data.slice(0, 3).map(c => c.name));
  
  // Try different matching strategies
  const country = data.find(c => {
    // Try exact match first
    if (c.name === countryName) {
      console.log("Exact match found:", c.name);
      return true;
    }
    // Try case-insensitive
    if (c.name.toLowerCase() === countryName.toLowerCase()) {
      console.log("Case-insensitive match found:", c.name);
      return true;
    }
    return false;
  });

  console.log("Found country:", country);

  // If country not found, show 404
  if (!country) {
    console.log("Country not found!");
    return (
      <div className={styles.container}>
        <BackButton />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h1>Country Not Found</h1>
          <p>Could not find country: {countryName}</p>
          <p>Available countries: {data.slice(0, 5).map(c => c.name).join(', ')}...</p>
        </div>
      </div>
    );
  }

  // Format data...
  const formattedPopulation = country.population?.toLocaleString() || "N/A";
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => c.name).join(", ")
    : "N/A";
  const languages = country.languages 
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div className={styles.container}>
      <div className="">
        <BackButton />
      </div>

      <div className={styles.detail_container}>
        <div className={styles.detail_flag}>
          <CountryFlag flag={country.flags?.svg || country.flags?.png} />
        </div>

        <div className={styles.detail_info}>
          <h1 className={styles.title}>{country.name}</h1>

          <div className={styles.details_grid}>
            <div>
              <CountryDetails title="Native Name" value={country.nativeName || "N/A"} />
              <CountryDetails title="Population" value={formattedPopulation} />
              <CountryDetails title="Region" value={country.region || "N/A"} />
              <CountryDetails title="Sub Region" value={country.subregion || "N/A"} />
              <CountryDetails title="Capital" value={country.capital?.[0] || "N/A"} />
            </div>

            <div>
              <CountryDetails title="Top Level Domain" value={country.tld?.[0] || "N/A"} />
              <CountryDetails title="Currencies" value={currencies} />
              <CountryDetails title="Languages" value={languages} />
            </div>
          </div>
          
          <div className={styles.border_countries}>
            <span className={styles.border_title}>Border Countries:</span>
            <div>
              {country.borders && country.borders.length > 0 ? (
                country.borders.map((borderCode: string) => {
                  const borderCountry = data.find(c => c.alpha3Code === borderCode);
                  return (
                    <BorderCountry 
                      key={borderCode} 
                      name={borderCountry?.name || borderCode} 
                    />
                  );
                })
              ) : (
                <span>No border countries</span>
              )}
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}