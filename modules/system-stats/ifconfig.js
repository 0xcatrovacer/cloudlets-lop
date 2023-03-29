import { exec } from 'child_process';

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

const bandwidthUsage = (timeInterval, fn) => {
    let rx = null,
        tx = null;
    setInterval(() => {
        const adapter = process.env.ADAPTER;
        if (rx == null || tx == null) {
            getBandWidth(adapter, (err, stderr, bw) => {
                if (err || stderr) console.error(err, stderr);
                else {
                    rx = bw.rx;
                    tx = bw.tx;
                }
            });
        } else {
            getBandWidth(adapter, (err, stderr, bw) => {
                if (err || stderr) console.error(err, stderr);
                else {
                    let bandwidth = (bw.rx + bw.tx - rx - tx) / 100;
                    rx = bw.rx;
                    tx = bw.tx;
                    fn(bandwidth);
                }
            });
        }
    }, timeInterval);
};

export { bandwidthUsage };
