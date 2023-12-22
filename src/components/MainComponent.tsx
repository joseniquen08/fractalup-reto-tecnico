import { useEffect, useState } from "react";
import { CountriesContent } from "./CountriesContent";
import { Header } from "./Header";
import { useDebounce } from "react-use";
import { TypedDocumentNode, gql, useQuery } from "@apollo/client";

export interface ICountry {
  countries: {
    name: string;
    code: string;
    capital: string;
    languages: {
      name: string;
    }[];
    currencies: string[];
    subdivisions: {
      name: string;
    }[];
    continent: {
      name: string;
    }
    image: string;
    flag: string;
  }[]
}

const query: TypedDocumentNode<ICountry> = gql`
  query Countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      name
      code
      capital
      languages {
        name
      }
      currencies
      subdivisions {
        name
      }
      continent {
        name
      }
    }
  }
`;

export function MainComponent() {
  const { data, loading, error, refetch } = useQuery(query, {
    variables: {
      filter: {
        name: {
          regex: ""
        },
        continent: {
          in: ["NA", "SA", "EU", "AS", "AF", "OC"],
        }
      }
    }
  });
  const [countries, setCountries] = useState<ICountry['countries']>([]);
  const [continents, setContinents] = useState<string[]>([]);
  const [letters, setLetters] = useState<string>("");

  useEffect(() => {
    const getImages = async () => {
      if(!loading && !error && data?.countries) {
        const dataCountries = data?.countries;
        const countriesRes = await Promise.all(dataCountries.map(async country => {
          const dataRes = await fetch(
            `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=${encodeURIComponent(`${country.name} landscape`)}&per_page=3`,
          );
          const res = await dataRes.json();
          return {
            ...country,
            image: res.hits ? res.hits[0]?.webformatURL : "",
            flag: `https://flagsapi.com/${country.code}/flat/48.png`
          }
        }));
        setCountries(countriesRes);
      }
    }

    getImages();
  }, [data, loading, error]);

  useDebounce(() => {
    feching();
  }, 500, [letters, continents]);

  const feching = async () => {
    const words = letters.trim().split(" ");
    const value = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    refetch({
      filter: {
        name: {
          regex: value,
        },
        continent: {
          in: formatContinents(),
        }
      }
    })
  }

  const formatContinents = (): string[] => {
    let formattedContinents = ["NA", "SA", "EU", "AS", "AF", "OC"];
    if (continents.length == 0) {
      return formattedContinents;
    }
    if (continents.includes("AM")) {
      formattedContinents = [...continents.filter(code => code != "AM"), "SA", "NA"];
    } else {
      formattedContinents = continents;
    }
    return formattedContinents;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Header setLetters={setLetters} continents={continents} setContinents={setContinents} />
      <CountriesContent loading={loading} countries={countries} />
    </div>
  );
}
