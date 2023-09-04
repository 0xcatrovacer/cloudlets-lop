export const CPU_LOAD_RESET_TIME = parseInt(
    process.env.CPU_LOAD_RESET_TIME ?? '-1'
);
export const CPU_LOAD_RESET_VALUE = parseInt(
    process.env.CPU_LOAD_RESET_VALUE ?? '0'
);
export const DISK_USAGE_RESET_TIME = parseInt(
    process.env.DISK_USAGE_RESET_TIME ?? '-1'
);
export const DISK_USAGE_RESET_VALUE = parseInt(
    process.env.DISK_USAGE_RESET_VALUE ?? '0'
);
