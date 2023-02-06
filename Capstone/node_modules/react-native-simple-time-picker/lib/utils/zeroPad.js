"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zeroPad = void 0;
const zeroPad = (num) => {
    if (num >= 0 && num <= 9) {
        return `0${num}`;
    }
    return num.toString();
};
exports.zeroPad = zeroPad;
//# sourceMappingURL=zeroPad.js.map