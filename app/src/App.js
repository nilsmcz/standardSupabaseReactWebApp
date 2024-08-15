import Register from './screens/register/Register';
import { I18nextProvider } from "react-i18next";
import i18next from "./i18n/i18n.config"

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <Register />
    </I18nextProvider>
  );
}

export default App;
