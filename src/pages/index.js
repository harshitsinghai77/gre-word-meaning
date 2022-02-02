import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Banner from "sections/banner";
import ExcitingFeatures from "sections/exciting-features";
import WorkHard from "sections/work-hard";
import HappyCustomer from "sections/happy-customer";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Startup hosting provider landing"
          description="Collection of free top of the line startup landing templates built using react/ next js. Free to download, simply edit and deploy! Updated weekly!"
        />
        <Banner />
        {/* <ExcitingFeatures /> */}
        {/* <WorkHard /> */}
        {/* <HappyCustomer /> */}
      </Layout>
    </ThemeProvider>
  );
}
