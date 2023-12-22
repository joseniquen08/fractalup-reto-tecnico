import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search } from 'lucide-react';
import { Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from 'react';

interface Props {
  setLetters: Dispatch<SetStateAction<string>>;
  continents: string[];
  setContinents: Dispatch<SetStateAction<string[]>>;
}

export function Header({ setLetters, continents, setContinents }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = (event: any) => {
    event.preventDefault();
    inputRef.current?.focus();
    setOpen(true);
  }

  const handleOpenCapture = (event: any) => {
    event.preventDefault();
    setOpen(true);
  }

  const onInteractOutside = (event: any) => {
    event.preventDefault();
    setOpen(false);
  }

  const onCloseAutoFocus = (event: any) => {
    event.preventDefault();
    inputRef.current?.focus();
  }

  const onValueChange = (value: string[]) => {
    setContinents(value);
  }

  const searchCountry = async (event: KeyboardEvent<HTMLInputElement>) => {
    setOpen(false);
    const letters = event.currentTarget.value;
    setLetters(letters);
  }

  return (
    <header className="py-4 px-2 sm:px-6 sticky z-50 top-0 bg-white">
      <div className="border rounded-full h-14 relative">
        <Label
          className="absolute top-1.5 left-6 text-md"
        >
          País
        </Label>
        <Input
          placeholder="Escribe el país que deseas ver"
          className="border-0 border-b border-transparent rounded-none focus:border-stone-400 focus-visible:ring-0 py-0 px-0 h-auto shadow-none text-xs absolute bottom-1.5 left-6 max-w-56"
          ref={inputRef}
          onClick={handleOpen}
          onClickCapture={handleOpenCapture}
          onKeyUp={searchCountry}
        />
        <Button className="rounded-full hidden xs:flex absolute right-3 top-2.5 bg-sky-500 hover:bg-sky-600">
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </div>
      <DropdownMenu open={open} modal={false} >
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-0 p-0 border-0"></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" onInteractOutside={onInteractOutside} onCloseAutoFocus={onCloseAutoFocus} className="-translate-y-2 rounded-3xl py-2 xs:py-3">
          <div className="flex flex-col space-y-1.5 2xs:flex-row 2xs:justify-between px-2 2xs:px-3">
            <DropdownMenuLabel className="text-sm xs:text-md font-medium py-0">Filtrar por continentes</DropdownMenuLabel>
            <Button variant="link" onClick={() => setContinents([])} className="text-sm xs:text-md h-auto py-0">Limpiar</Button>
          </div>
          <ToggleGroup value={continents} onValueChange={onValueChange} type="multiple" className="grid 2xs:grid-cols-2 sm:grid-cols-3 gap-x-4 px-5 py-3 text-stone-600">
            <div>
              <ToggleGroupItem value="EU" className="flex flex-col gap-1.5 items-start border-2 border-transparent rounded-xl overflow-hidden px-0 h-auto data-[state=on]:border-blue-500 data-[state=on]:ring data-[state=on]:ring-blue-500/50">
                <div className="h-24 w-36 bg-red-700"></div>
              </ToggleGroupItem>
              <p className="text-base font-normal">Europa</p>
            </div>
            <div>
              <ToggleGroupItem value="AM" className="flex flex-col gap-1.5 items-start border-2 border-transparent rounded-xl overflow-hidden px-0 h-auto data-[state=on]:border-blue-500 data-[state=on]:ring data-[state=on]:ring-blue-500/50">
                <div className="h-24 w-36 bg-red-700"></div>
              </ToggleGroupItem>
              <p className="text-base font-normal">América</p>
            </div>
            <div>
              <ToggleGroupItem value="AS" className="flex flex-col gap-1.5 items-start border-2 border-transparent rounded-xl overflow-hidden px-0 h-auto data-[state=on]:border-blue-500 data-[state=on]:ring data-[state=on]:ring-blue-500/50">
                <div className="h-24 w-36 bg-red-700"></div>
              </ToggleGroupItem>
              <p className="text-base font-normal">Asia</p>
            </div>
            <div>
              <ToggleGroupItem value="OC" className="flex flex-col gap-1.5 items-start border-2 border-transparent rounded-xl overflow-hidden px-0 h-auto data-[state=on]:border-blue-500 data-[state=on]:ring data-[state=on]:ring-blue-500/50">
                <div className="h-24 w-36 bg-red-700"></div>
              </ToggleGroupItem>
              <p className="text-base font-normal">Oceanía</p>
            </div>
            <div>
              <ToggleGroupItem value="AF" className="flex flex-col gap-1.5 items-start border-2 border-transparent rounded-xl overflow-hidden px-0 h-auto data-[state=on]:border-blue-500 data-[state=on]:ring data-[state=on]:ring-blue-500/50">
                <div className="h-24 w-36 bg-red-700"></div>
              </ToggleGroupItem>
              <p className="text-base font-normal">África</p>
            </div>
          </ToggleGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
