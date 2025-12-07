export const validateDate = (inputDate: string, item: any, dateState: any, onChange: Function) => {
    const minDate =
      !item.id.includes("start") &&
      Object.prototype.hasOwnProperty.call(
        dateState.date,
        `${item.id.split("end")[0]}start_date`
      )
        ? dateState.date[`${item.id.split("end")[0]}start_date`]
        : undefined;
    const maxDate =
      !item.id.includes("end") &&
      Object.prototype.hasOwnProperty.call(
        dateState.date,
        `${item.id.split("start")[0]}end_date`
      )
        ? dateState.date[`${item.id.split("start")[0]}end_date`]
        : undefined;
  
  
    if (minDate && inputDate < minDate) {
      onChange(item.id || item.title, minDate); 
      return;
    }
    if (maxDate && inputDate > maxDate) {
      onChange(item.id || item.title, maxDate); 
      return;
    }
  };