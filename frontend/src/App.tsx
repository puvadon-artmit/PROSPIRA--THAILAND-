import Router from "./router";
import { ConsentProvider } from "./consent/ConsentProvider";
import { CookieBanner } from "./consent/CookieBanner";
import { ScriptGate } from "./consent/ScriptGate";


function App() {
  return (
    <ConsentProvider>
      <div>
        <Router />
      </div>
      <CookieBanner />
      <ScriptGate category="analytics">
       <script src="https://www.googletagmanager.com/gtag/js?id=YOUR-GTM-ID"></script>
      </ScriptGate>
    </ConsentProvider>
  );
}

export default App;
