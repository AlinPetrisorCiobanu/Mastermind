
export const Custom_Button = ({ name, clickHandler, data, clase }) => {
  return (
    <>
      <button className={clase} onClick={() => clickHandler(...data)}>{name}</button>
    </>
  );
};
