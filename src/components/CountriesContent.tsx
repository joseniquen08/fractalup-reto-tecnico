import Image from "next/image";
import { ICountry } from "./MainComponent";
import { LoadingIcon } from "./icons/LoadingIcon";
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  loading: boolean;
  countries: ICountry['countries'];
}

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export function CountriesContent({ loading, countries }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<ArrayElement<ICountry['countries']>>();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center pt-6 px-6">
        <LoadingIcon color="fill-blue-500" width="w-10" height="h-10" />
      </div>
    );
  }

  const onValueChange = (value: string) => {
    setValue(value);
    setData(value != "" ? JSON.parse(value) : "");
    if (value != "") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setValue("");
  }

  return (
    <>
      <ToggleGroup value={value} type="single" onValueChange={onValueChange} className="pb-6 px-2 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {countries.length > 0 ?
          countries?.map(country => (
            <ToggleGroupItem
              key={country.code}
              value={JSON.stringify(country)}
              className="border rounded-3xl shadow-lg overflow-hidden px-0 h-auto flex flex-col data-[state=on]:bg-sky-500 data-[state=on]:text-white group"
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
      <Sheet open={open} modal={false}>
        <SheetTrigger asChild>
          <Button variant="outline" className="h-0 p-0 border-0"></Button>
        </SheetTrigger>
        <SheetContent>
          <Button variant="ghost" onClick={handleClose} className="absolute right-3 h-6 w-6 px-0 py-0 top-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <SheetHeader className="px-5">
            {
              data && (
                <div className="flex flex-col">
                  <div className="h-48 bg-white w-full relative z-0 rounded-lg overflow-hidden">
                    <Image
                      alt={data.name}
                      src={data.image}
                      fill={true}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full py-3.5 flex items-start gap-2">
                    <div className="h-9 w-14 relative z-0 flex-none">
                      <Image
                        alt={data.code}
                        src={data.flag}
                        fill={true}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start overflow-hidden">
                      <p className="font-bold text-sky-500 text-lg leading-5 truncate">{data.name}</p>
                      <p className="leading-5 text-stone-500">{data.continent.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-stone-500">
                    <p><span className="font-medium text-sky-500">Capital:</span> {data.capital}</p>
                    <p><span className="font-medium text-sky-500">Language:</span> {data.languages.length > 0 && data.languages[0].name}</p>
                    <p><span className="font-medium text-sky-500">Currency:</span> {data.currencies.join(", ")}</p>
                    <p><span className="font-medium text-sky-500">Region</span></p>
                    <ScrollArea className="w-full h-40 border px-3 py-2">
                      <ul>
                        {data.subdivisions.length > 0 && data.subdivisions.map(subdivision => (
                          <li key={subdivision.name}>{subdivision.name}</li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </div>
              )
            }
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
