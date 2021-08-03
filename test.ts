import snap from './snapage';

(async () => {
    const screenshots: Buffer[] = await snap('https://google.com', {persist: false});
    console.log(screenshots);
})();