import Image from "next/image";
import { ICountry } from "./MainComponent";
import { LoadingIcon } from "./icons/LoadingIcon";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface Props {
  loading: boolean;
  countries: ICountry['countries'];
}

export function CountriesContent({ loading, countries }: Props) {

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center pt-6 px-6">
        <LoadingIcon color="fill-blue-500" width="w-10" height="h-10" />
      </div>
    );
  }

  const onValueChange = (value: string) => {
    console.log("🚀 ~ file: CountriesContent.tsx:22 ~ onValueChange ~ value:", value);
  }

  return (
    <ToggleGroup type="single" onValueChange={onValueChange} className="pb-6 px-6 grid grid-cols-3 grid-flow-row gap-4">
      {countries.length > 0 ?
        countries?.map(country => (
          <ToggleGroupItem
            key={country.code}
            value={country.code}
            className="border rounded-3xl shadow-lg overflow-hidden px-0 h-auto flex flex-col data-[state=on]:bg-blue-500 data-[state=on]:text-white group"
          >
            <div className="h-32 bg-white w-full relative z-0">
              <Image
                alt={country.name}
                src={country.image}
                fill={true}
                className="object-cover"
              />
            </div>
            <div className="px-3 w-full py-3.5 flex items-start gap-2">
              <div className="h-8 w-12 relative z-0 flex-none">
                <Image
                  alt={country.code}
                  src={country.flag}
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <p className="font-bold text-sky-500 group-data-[state=on]:text-white text-lg leading-5 truncate">{country.name}</p>
                <p className="leading-5 text-stone-500 group-data-[state=on]:text-white">{country.continent.name}</p>
              </div>
            </div>
          </ToggleGroupItem>
        )) : (
          <section className="col-span-3 flex justify-center">
            <p className="font-medium text-stone-600">No se han encontrado resultados</p>
          </section>
        )}
    </ToggleGroup>
  );
}
