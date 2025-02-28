export const formatCurrency = (value: number) => {
    return `R$${value.toLocaleString()}`;
  };
  
  export const formatPercentage = (value: number) => {
    return `${value}%`;
  };