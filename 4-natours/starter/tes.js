const path = require('path');
const plugin = require('@parcel/plugin');

const namer = new plugin.Namer({
  name({ bundle }) {
    const origName = path.basename(bundle.getMainEntry().filePath);

    if (['files', 'to', 'rename'].includes(origName)) {
      return 'bundle';
    }

    // Continue to next Namer
    return null;
  },
});

module.exports = namer;
