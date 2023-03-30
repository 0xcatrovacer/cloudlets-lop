const nAffinity = ({ TP, NP, TC, NC, TF, NF, w1, w2, w3 }) => {
    // No checks are performed to see if NP, NC, NF are 0
    let N = (w1 * TP) / NP + (w2 * TC) / NC + (w3 * TF) / NF;
    return Math.floor(N);
};

export default nAffinity;
