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
    const { statusText } = error?.response;
    switch (statusText) {
      case "Unauthorized":
        logout();
        navigateToLogin();
        break;
      case "Unprocessable Entity":
        refetch();
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
            .map(({ product }) => product.name)
            .join(",\n ")}`,
          [
            {
              label: "remove this items",
              action: () => {
                details.forEach(({ productId, available }) => {
                  cartDispatch({
                    type: "UPDATE",
                    payload: { id: productId, quantity: available },
                  });
                });
              },
            },
          ],
          "error"
        );
        break;
      case "Internal Server Error":
        alert("Server error");
        break;
      default:
        showNotification(
          `An error occurred ${
            error?.response?.data?.message || error.message || ""
          }`,
          [],
          "error"
        );
        break;
    }
  };

  return { handleError };
};

export default useHandleErrors;
