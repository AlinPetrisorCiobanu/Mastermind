export const validate = (type, value) => {
  switch (type) {
    case "name":
      if (value.length < 2) {
        return "!el nombre es demasiado corto";
      } else {
        return "";
      }
    case "last_name":
      if (value.length < 4) {
        return "!el/los apellido/s demasiado corto/s";
      } else {
        return "";
      }
    case "nickname":
      if (value.length < 4) {
        return "!minimo 4 caracteres";
      } else {
        return "";
      }
    case "email":
      if (value.length < 8) {
        return "!campo email vacio!";
      } else {
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/g.test(value)
        ) {
          return "!formato incorecto!";
        } else {
          return "";
        }
      }
    case "password":
      if (value.length < 1) {
        return "!campo contraseña vacío!";
      } else {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+\\|[\]{};:'",.<>/?]).{6,15}$/;
        if (!passwordRegex.test(value)) {
          return "La contraseña debe tener entre 6 y 15 caracteres y contener al menos una letra mayúscula y un carácter especial.";
        } else {
          return "";
        }
      }
  }
};
