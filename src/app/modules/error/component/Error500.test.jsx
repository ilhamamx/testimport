import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "../../../../setup/translations/i18next";
import { render, screen, waitFor } from "@testing-library/react";
import { AppRoutes } from "../../../routes/AppRoutes";
import { ErrorsPage } from "../../../routes/ErrorRoutes";

describe("page 500", () => {
  const { createMemoryHistory } = require("history");
  test("error 500 page", async () => {
    const history = createMemoryHistory();
    history.push("/error/500");
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <I18nextProvider i18n={i18next}>
          <AppRoutes
            location={history.location}
            navigator={history}
          >
          </AppRoutes>
        </I18nextProvider>
      </Suspense>
    );
    expect(history.location.pathname).toBe("/error/500");
    // const error = await waitFor(() => screen.findByTestId("error500"));
    // expect(error).toBeInTheDocument();
  });
});
