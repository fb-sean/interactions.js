const Colors = require("../structures/Colors.js");

class Utils {
    constructor() {
        super();
    }

    /**
	 * Resolve a color by the input
	 *
	 * @param {string} color The input to resolve the color
	 */
    resolveColor(color) {
        if (typeof color === 'string') {
            if (color === 'Random') return Math.floor(Math.random() * (0xffffff + 1));
            color = Colors[color] ?? parseInt(color.replace('#', ''), 16);
          } else if (Array.isArray(color)) {
            color = (color[0] << 16) + (color[1] << 8) + color[2];
          }
        
          if (color < 0 || color > 0xffffff) color = 0xffffff;
          else if (Number.isNaN(color)) color = 0xffffff;
        
          return color;
    }

    /**
	 * Check if the input is a url
	 *
	 * @param {string} url The string to check
     * @param {string} attachment boolean if it can be a attachment
	 */
    checkURL(url, attachment = false) {
        if (typeof url != String) {
            return false;
        }
    
        if (attachment) {
            if (!url.startsWith("https") && !url.startsWith("http") && !url.startsWith("attachment")) {
                return false;
            }
        } else {
            if (!url.startsWith("https") && !url.startsWith("http")) {
                return false;
            }
        }
    }


}

module.exports = Utils;

