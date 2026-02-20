import Image from "next/image";

export default function CountryFlag({ flag }: { flag: string }) {
  return (
      <Image src={flag} alt="flag" width={500} height={360} />
  );
}