// Ordre de les seccions de la calculadora. Cada categoria és en un fitxer de data/categories/.
// L'identificador de cada categoria ha de tenir un color --c-<id> a css/styles.css.

import terrestrial from "./categories/terrestrial.js";
import cosmic from "./categories/cosmic.js";
import radon from "./categories/radon.js";
import internal from "./categories/internal.js";
import medical from "./categories/medical.js";
import travel from "./categories/travel.js";
import other from "./categories/other.js";

export const CATEGORIES = [terrestrial, cosmic, radon, internal, medical, travel, other];
