import { Cart, Products } from "./Products.tsx";
import { Box, CssBaseline } from "@mui/material";
import SearchAppBar from "./SearchAppBar.tsx";
import { Categories } from "./Categories.tsx";
import { useCallback, useState, useDeferredValue } from "react";

function App() {
  const [cart, setCart] = useState<Cart>();
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");
  const deferredFilter = useDeferredValue(currentFilter);
  const deferredCategory = useDeferredValue(currentCategory);

  //console.log(cart);
  //console.log(currentCategory);
  //console.log(currentFilter);

  const onCartChange = useCallback(function onCartChange(cart: Cart) {
    setCart(cart);
  }, []);

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
          <Products
            onCartChange={onCartChange}
            filter={deferredFilter}
            category={deferredCategory}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
