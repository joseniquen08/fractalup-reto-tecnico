import { getClient } from "@/lib/client";
import { TypedDocumentNode, gql } from "@apollo/client";
import Image from "next/image";

interface ICountry {
  countries: {
    name: string;
    code: string;
    continent: {
      name: string;
    }
    image: string;
    flag: string;
  }[]
}

const query: TypedDocumentNode<ICountry> = gql`
  query {
    countries {
      name
      code
      continent {
        name
      }
    }
  }
`;

export async function CountriesContent() {
  const { data } = await getClient().query({ query });
  const dataCountries = data.countries.slice(0, 3);
  const countries = await Promise.all(dataCountries.map(async country => {
    const dataRes = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${encodeURIComponent(`${country.name} landscape`)}&per_page=3`,
    );
    const res = await dataRes.json();
    return {
      ...country,
      image: res.hits ? res.hits[0]?.webformatURL : "",
      flag: `https://flagsapi.com/${country.code}/flat/48.png`
    }
  }));

  return (
    <div className="pb-6 px-6 grid grid-cols-3 gap-4">
      {countries.map(country => (
        <section
          key={country.code}
          className="border rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="h-32 w-full relative z-0">
            <Image
              alt={country.name}
              src={country.image}
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="px-3 py-3.5 flex gap-2">
            <div className="h-8 w-12 relative z-0 flex-none">
              <Image
                alt={country.code}
                src={country.flag}
                fill={true}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col overflow-hidden">
              <p className="font-bold text-lg leading-5 truncate">{country.name}</p>
              <p className="leading-5 text-stone-500">{country.continent.name}</p>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
