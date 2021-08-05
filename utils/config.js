function generateId() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `snap_${result}`;
}

function getConfig(config, localPath) {
  const options = {
    name: generateId(),
    path: `${localPath}/snaps`,
    viewports: [{ width: 1920, height: 1080 }, 'iPad Pro', 'iPhone X'],
    puppeteerOptions: {args: ['--no-sandbox', '--disable-setuid-sandbox']},
    style: {},
    script: false,
    fullPage: false,
    scroll: false,
    persist: true,
  };

  if (config) {
    const userConfig = Object.keys(config).reduce((acc, key) => {
      if (typeof options[key] === 'object' && !Array.isArray(options[key])) {
        acc[key] = Object.assign(options[key], config[key])
      } else {
        options[key] = config[key]
      }
        
      return acc;
    }, {});

    return Object.assign(options, userConfig);
  }

  return options;
}

module.exports = getConfig;
