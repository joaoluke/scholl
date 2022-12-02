export const formatPhone = (value: string): string => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1-$2");
    value = value.replace(/(\d{3})(\d)/, "$1-$2");
    value = value.replace(/(\d{4})(\d)$/, "$1-$2");
    return value;
  };
  