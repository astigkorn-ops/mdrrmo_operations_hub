import React from "react";
import AuthenticationWrapper from "./components/ui/AuthenticationWrapper";
import { SupabaseProvider } from "./components/ui/SupabaseProvider";
import Routes from "./Routes";

function App() {
  return (
    <SupabaseProvider>
      <AuthenticationWrapper>
        <Routes />
      </AuthenticationWrapper>
    </SupabaseProvider>
  );
}

export default App;
