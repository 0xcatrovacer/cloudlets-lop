import { exec } from 'child_process';
import { ADAPTER, BANDWIDTH, THRESHOLD0_BANDWIDTH, THRESHOLD1_BANDWIDTH } from './constants.mjs';

const getBandWidth = (adapter, fn) => {
    exec('ifconfig', (err, stdout, stderr) => {
        if (err || stderr) {
            fn(err, stderr, null);
        } else {
            const arr = stdout.split('\n');
            let ip = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].includes(adapter)) {
                    for (let j = i + 1; j < arr.length && arr[j] != ''; j++)
                        ip.push(arr[j].trim());
                    break;
                }
            }
            let rx, tx;
            ip.forEach(value => {
                if (value.includes('RX packets')) {
                    rx = parseInt(value.split(' ')[5]);
                }
                if (value.includes('TX packets')) {
                    tx = parseInt(value.split(' ')[5]);
                }
            });
            fn(null, null, { rx, tx });
        }
    });
};

const monitorBandwidthUsage = (timeInterval, fn) => {
    let rx = null,
        tx = null;
    setInterval(() => {
        if (rx == null || tx == null) {
            getBandWidth(ADAPTER, (err, stderr, bw) => {
                if (err || stderr) console.error(err, stderr);
                else {
                    rx = bw.rx;
                    tx = bw.tx;
                }
            });
        } else {
            getBandWidth(ADAPTER, (err, stderr, bw) => {
                if (err || stderr) console.error(err, stderr);
                else {
                    let band = (bw.rx + bw.tx - rx - tx) / 100;
                    rx = bw.rx;
                    tx = bw.tx;
                    let normalised_bw = band / BANDWIDTH;
                    let string =
                        normalised_bw <= THRESHOLD0_BANDWIDTH
                            ? 'LOW'
                            : normalised_bw > THRESHOLD1_BANDWIDTH
                            ? 'HIG'
                            : 'MID';
                    fn(string);
                }
            });
        }
    }, timeInterval);
};

export { monitorBandwidthUsage };
