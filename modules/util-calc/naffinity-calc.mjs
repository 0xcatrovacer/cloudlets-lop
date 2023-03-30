const nAffinity = ({ TP, NP, TC, NC, TF, NF }) => {
    // No checks are performed to see if NP, NC, NF are 0
    const { w1, w2 } = process.env;
    const w3 = 1 - w1 - w2;
    let N = (w1 * TP) / NP + (w2 * TC) / NC + (w3 * TF) / NF;
    return Math.floor(N);
};

export default nAffinity;
