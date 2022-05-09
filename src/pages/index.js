import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import SEO from "components/seo";
import Layout from "components/layout";
import Banner from "sections/banner";

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="GRE Word Meaning"
          description="Hover to get the meaning of the word in your clipboard."
        />
        <Banner />
      </Layout>
    </ThemeProvider>
  );
}
