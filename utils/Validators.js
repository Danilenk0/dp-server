import { body } from "express-validator";
import EmployeeModel from "../models/EmployeeModel.js";

const employeeValidator = [
  body("firstName")
    .isString()
    .withMessage("Имя не может быть числом")
    .notEmpty()
    .withMessage("Имя не может быть пустым")
    .isLength({ min: 2, max: 20 })
    .withMessage("Имя должно быть от 2 до 20 символов"),

  body("lastName")
    .isString()
    .withMessage("Фамилия не может быть числом")
    .notEmpty()
    .withMessage("Фамилия не может быть пустой")
    .isLength({ min: 2, max: 20 })
    .withMessage("Фамилия должна быть от 2 до 20 символов"),

  body("surname")
    .isString()
    .withMessage("Отчество не может быть числом")
    .notEmpty()
    .withMessage("Отчество не может быть пустым")
    .isLength({ min: 2, max: 20 })
    .withMessage("Отчество должно быть от 2 до 20 символов"),
  body("address")
    .isString()
    .withMessage("Адрес не может быть числом")
    .notEmpty()
    .withMessage("Адрес не может быть пустым")
    .isLength({ min: 5, max: 30 })
    .withMessage("Адрес не может быть короче 5 и длиннее 20 символов"),
  body("email")
    .isEmail()
    .withMessage("Введите корректную электронную почту")
    .notEmpty()
    .withMessage("Электронная почта не может быть пустой")
    .custom(async (value) => {
      const employee = await EmployeeModel.findOne({ email: value });
      if (employee) {
        throw new Error("Этот email уже существует");
      }
    }),
  body("phone")
    .notEmpty()
    .withMessage("Номер телефона не может быть пустым")
    .custom(async (value) => {
      const employee = await EmployeeModel.findOne({ phone: value });
      if (employee) {
        throw new Error("Этот номер телефона уже существует");
      }
    }),
  body("position_id")
    .notEmpty()
    .withMessage("Поле должность не может быть пустым"),
  body("department_id")
    .notEmpty()
    .withMessage("Поле отдел не может быть пустым"),
];

const workedtimeValidator = [
  body("time").isNumeric().withMessage("Время работы не может быть строкой").custom((value) => {
    if (parseFloat(value) > 8) {
      throw new Error("Время работы не может быть больше 8 часов");
    }
    return true;
  }).notEmpty().withMessage('Время работы не может быть пустым')
]

const noshowValidator = [
  body("type").isString().withMessage("Тип неявки должен быть строкой"),
];




export { employeeValidator, workedtimeValidator, noshowValidator };
