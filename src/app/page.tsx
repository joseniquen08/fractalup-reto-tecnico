"use client";

import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/client";
import { MainComponent } from "@/components/MainComponent";

export default function Home() {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <MainComponent />
    </ApolloProvider>
  )
}
