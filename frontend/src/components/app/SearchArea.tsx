import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { useRef } from "react";

interface SearchAreaProps {
  setSearchTerm: (term: string) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ setSearchTerm }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const searchTerm = searchInputRef.current?.value || "";
    setSearchTerm(searchTerm.trim());

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  return (
    <div className="flex mx-auto flex-col gap-4 items-center max-w-2xl">
      <h1 className="text-3xl font-bold mb-4">Search for Any Movie</h1>
      <div className="flex w-full max-w-xl items-center space-x-2">
        <Input
          type="text"
          name="search"
          className="h-auto md: md:text-lg p-3"
          placeholder="Movie Name"
          ref={searchInputRef}
        />
        <Button
          variant="default"
          className="py-3 px-4 font-bold text-base h-auto md:text-lg"
          type="button"
          onClick={handleSearch}
        >
          Let's Find <SearchIcon />{" "}
        </Button>
      </div>
    </div>
  );
};

export default SearchArea;
