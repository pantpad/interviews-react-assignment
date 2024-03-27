import { useState, useDeferredValue } from "react";

import { useAppSelector } from "./store/hooks.ts";

import { Box, CssBaseline } from "@mui/material";

import { Products } from "./Products.tsx";
import SearchAppBar from "./SearchAppBar.tsx";
import { Categories } from "./Categories.tsx";

function App() {
  const cart = useAppSelector((state) => state.cart.value);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const deferredFilter = useDeferredValue(currentFilter);
  const deferredCategory = useDeferredValue(currentCategory);

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <CssBaseline />
      <SearchAppBar
        quantity={cart?.totalItems || 0}
        price={cart?.totalPrice || 0}
        setFilter={setCurrentFilter}
        filter={currentFilter}
      />
      <Box flex={1} display="flex" flexDirection="row">
        <Categories
          onCategoryChange={setCurrentCategory}
          category={currentCategory}
        />
        <Box flex={1}>
          <Products filter={deferredFilter} category={deferredCategory} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
