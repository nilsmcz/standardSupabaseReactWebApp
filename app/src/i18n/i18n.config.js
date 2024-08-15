import i18next from "i18next";
import { de } from "./translations"

const resources = {
    de: {
        translation: de,
    }
};

i18next.init({
    resources,
    // lng: "de",
    fallbackLng: "de",  // Fallback-Sprache
    debug: false, //console.log aktivieren
    interpolation: {
        escapeValue: false,     // React benötigt dies nicht
    },
});

export default i18next