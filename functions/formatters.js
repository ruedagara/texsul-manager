const numeral = require("numeral");

export const formatNumberToCurrency = number => numeral(number).format("($ 0.00 A)");
export const formatDate = () => {};

export default { formatNumberToCurrency, formatDate };
