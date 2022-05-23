import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "../../../../setup/translations/i18next";
import { render, screen, waitFor } from "@testing-library/react";
import { AppRoutes } from "../../../routes/AppRoutes";
import { ErrorsPage } from "../../../routes/ErrorRoutes";
import { Provider } from 'react-redux'
import store from "../../../../setup/redux/store";

const ReduxProvider = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
)

describe("page 404", () => {
  const { createMemoryHistory } = require("history");
  test("error 404 page", async () => {
    const history = createMemoryHistory();
    history.push("/error/404");
    render(
      <ReduxProvider reduxStore={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <I18nextProvider i18n={i18next}>
            <AppRoutes
              location={history.location}
              navigator={history}
            >
            </AppRoutes>
          </I18nextProvider>
        </Suspense>
      </ReduxProvider>
    );
    expect(history.location.pathname).toBe("/test/404");
    const error = await waitFor(() => screen.findByTestId("error404"));
    expect(error).toBeInTheDocument();
  });
});
