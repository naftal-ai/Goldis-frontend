import useNotification from "./useNotification";
import useProducts from "./useProducts";
import useCart from "./useCart";
import useAuth from "./useAuth";

const useHandleErrors = () => {
  const { refetch, getProductById } = useProducts();
  const { dispatch: cartDispatch } = useCart();
  const { showNotification } = useNotification();
  const { logout, navigateToLogin } = useAuth();

  const handleError = (error) => {
    const { statusText } = error.response;
    switch (statusText) {
      case "Unauthorized":
        logout();
        navigateToLogin();
        break;
      case "Unprocessable Entity":
        const { details } = error.response.data;
        console.log(details);
        const products = details.map(({ productId, available, requested }) => ({
          product: getProductById(productId),
          available,
          requested,
        }));
        console.log(products);
        showNotification(
          `the following products are unavailable in the requested quantity: ${products
            .map(({product}) => product.name)
            .join(", ")} 
          press remove to remove them from the cart, or update to update the quantity`,
          [
            {
              label: "remove",
              action: () => {products.forEach(({product}) => {
                cartDispatch({ type: "REMOVE", payload: product._id });
            })}},

            {
              label: "update",
              action: () => {
                products.forEach(({ product, available }) => {
                  cartDispatch({
                    type: "UPDATE",
                    payload: {
                      id: product._id,
                      quantity: available,
                    },
                  });
                });
              },
            }], "error"
            
          
        );
        refetch();
        break;
      case "Internal Server Error":
        alert("Server error");
        break;
      default:
        alert("Unhandled error");
        break;
    }
  };

  return { handleError };
};

export default useHandleErrors;
