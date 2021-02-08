import snap from './snapify';

(async () => {
    const screenshots: Buffer[] = await snap('https://google.com', {persist: false});
    console.log(screenshots);
})();