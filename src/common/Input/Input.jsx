import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const Custom_Input = ({name,type,pat,placeholder,handler,handlerError,defaultValue,custom}) => {
  return (
    <>
        <InputGroup>
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={name}
            pattern={pat}
            onChange={handler}
            onBlur={handlerError}
            value={defaultValue}
            className={custom}
            maxLength={50}
          />
        </InputGroup>
    </>
  );
};