import { useState } from "react";
import "./App.css";
import SearchArea from "./components/app/SearchArea";
import SearchResults from "./components/app/SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SearchArea setSearchTerm={setSearchTerm} />
      <SearchResults searchTerm={searchTerm} />
    </>
  );
}

export default App;
