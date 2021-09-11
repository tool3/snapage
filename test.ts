import snap, {SnapResult} from './snapage';

(async () => {
    const screenshots: SnapResult = await snap('https://google.com', {persist: false});
    console.log(screenshots);
})();