import { lazy } from "react";
import ErrorBoundary from "../ErrorBoundary";

const Menu = lazy(() => import("../pages/Menu"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const Receipt = lazy(() => import("../pages/Receipt"));

function PageRenderer({ page }) {
  if (page === "menu") {
    return (
      <ErrorBoundary>
        <Menu />
      </ErrorBoundary>
    );
  }

  if (page === "cart") {
    return (
      <ErrorBoundary>
        <Cart />
      </ErrorBoundary>
    );
  }

  if (page === "checkout") {
    return <Checkout />;
  }

  return <Receipt />;
}

export default PageRenderer;