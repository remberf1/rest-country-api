import CountryFlag from "@/app/components/CountryFlag";
import BackButton from "@/app/components/BackButton";
import CountryDetails from "@/app/components/CountryDetails";
import BorderCountry from "@/app/components/BorderCountry";
import data from "@/app/data.json";
import styles from "@/app/styles/_detail.module.scss";

export default function DetailView() {
  // NOTE: You are manually pulling data[0] (Afghanistan) for the flag
  // but hardcoding "Colombia" text below. 
  // For this layout fix, I will keep your hardcoded values so the structure works.
  
  return (
    <div className={styles.container}>
      {/* Back button row */}
      <div className="">
        <BackButton />
      </div>

      {/* Main Content Grid: Stacks on mobile, 2 columns on Desktop */}
      <div className={styles.detail_container}>
          {/* Left Col: Flag */}
            <div className={styles.detail_flag}>
                <CountryFlag flag={data[0].flags.svg} />
            </div>
        

        {/* Right Col: Details */}
        <div className={styles.detail_info}>
          <h1 className={`${styles.title}`}>{data[0].name}</h1>

          {/* Data Columns */}
          <div className={`${styles.details_grid} `}>
            
            {/* List 1 */}
            <div>
              <CountryDetails title="Native Name" value="Colombia" />
              <CountryDetails title="Population" value="50,882,884" />
              <CountryDetails title="Region" value="Americas" />
              <CountryDetails title="Sub Region" value="South America" />
              <CountryDetails title="Capital" value="Bogotá" />
            </div>

            {/* List 2 */}
            <div>
              <CountryDetails title="Top Level Domain" value=".co" />
              <CountryDetails title="Currencies" value="Peso" />
              <CountryDetails title="Languages" value="Spanish" />
            </div>
          </div>
        {/* Border Countries Section */}
          <div className={styles.border_countries}>
            <span className={styles.border_title}>Border Countries:</span>
            <div>
              <BorderCountry name="Brazil" />
              <BorderCountry name="Venezuela" />
              <BorderCountry name="Peru" />
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}