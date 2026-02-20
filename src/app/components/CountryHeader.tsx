interface CountryHeaderProps {
  name: string;
}

export default function CountryHeader({ name }: CountryHeaderProps) {
    return (
        <p className="text-3xl font-bold">{name}</p>
    );
}