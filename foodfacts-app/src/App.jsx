import { useState } from "react";
import SearchBar from "./components/SearchBar";
import FoodList from "./components/FoodList";

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //  ADD THIS (missing in your code)
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    try {
      //  ADD THIS (missing in your code)
      setHasSearched(true);

      setLoading(true);

      const res = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=true`
      );

      const data = await res.json();

      const filtered = data.products.filter(
        (p) => p.product_name && p.product_name.trim() !== ""
      );

      setResults(filtered);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>FoodFacts App</h1>

      <SearchBar onSearch={handleSearch} />

      {!hasSearched && <p>Search for food items</p>}

      {loading && <p>Loading...</p>}

      {hasSearched && !loading && results.length === 0 && (
        <p>No results found</p>
      )}

      {hasSearched && !loading && results.length > 0 && (
        <FoodList products={results} />
      )}
    </div>
  );
}

export default App;