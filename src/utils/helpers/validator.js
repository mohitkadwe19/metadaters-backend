var validator = require("validator");

module.exports = function validators(array) {
  let validationArray = [];
  array.forEach(field => {
    switch (field.type) {
      case "string":
        if (field.value === null || field.value === undefined || field.value === "") {
          validationArray.push({ fieldName: field.fieldName, message: `Please enter ${field.fieldName} ` });
          break;
        }
        if (field.maxLength !== null && field.maxLength !== undefined) {
          if (field.value.length > field.maxLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is greater than ${field.maxLength} characters.` });
          }
        }
        if (field.minLength !== null && field.minLength !== undefined) {
          if (field.value.length < field.minLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is lesser than ${field.minLength} characters.` });
          }
        }
        if (field.acceptOnly !== undefined) {
          if (!field.acceptOnly.includes(field.value)) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is invalid.` });
          }
        }
        break;

      case "email":
        if (field.value === null || field.value === undefined || field.value === "") {
          validationArray.push({ fieldName: field.fieldName, message: `Please enter ${field.fieldName} ` });
          break;
        }
        if (typeof field.value !== "string") {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is not of character type.` });
        }
        if (field.maxLength !== null && field.maxLength !== undefined) {
          if (field.value.length > field.maxLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is greater than ${field.maxLength} characters.` });
          }
        }
        if (field.minLength !== null && field.minLength !== undefined) {
          if (field.value.length < field.minLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is lesser than ${field.minLength} characters.` });
          }
        }
        if (!validator.isEmail(field.value)) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} format is invalid.` });
        }
        break;

      case "number":
        let totalDigitsInNumber = 0;
        let numberCopy = field.value;
        while (numberCopy > 0) {
          numberCopy = Math.floor(numberCopy / 10);
          totalDigitsInNumber++;
        }

        if (typeof field.value !== "number") {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is not of number type .` });
        }
        if (field.maxLength !== null && field.maxLength !== undefined) {
          if (totalDigitsInNumber > field.maxLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is greater than ${field.maxLength} characters.` });
          }
        }
        if (field.minLength !== null && field.minLength !== undefined) {
          if (totalDigitsInNumber < field.minLength) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is lesser than ${field.minLength} characters.` });
          }
        }
        if (field.maxRange !== null && field.maxRange !== undefined) {
          if (field.value > field.maxRange) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} should be lesser than ${field.maxRange}.` });
          }
        }
        if (field.minRange !== null && field.minRange !== undefined) {
          if (field.value < field.minRange) {
            validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} should be greater than ${field.minRange}.` });
          }
        }
        break;

      case "array":
        if (field.value.length < 1) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is empty.` });
        }
        break;
      case "object":
        if (Object.values(field.value).length === 0) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is Required.` });
        }
        break;
      case "boolean":
        if (typeof field.value !== "boolean" && field.value !== null && field.value !== undefined) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} should be a boolean.` });
        }
        break;
      case "mobile":
        if (field.value === null || field.value === undefined || field.value === "") {
          validationArray.push({ fieldName: field.fieldName, message: `Please enter ${field.fieldName} ` });
          break;
        }
        if (!validator.isMobilePhone(field.value)) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is invalid.` });
          break;
        }
        break;
      case "date":
        if (field.value === null || field.value === undefined || field.value === "") {
          validationArray.push({ fieldName: field.fieldName, message: `Please enter ${field.fieldName} ` });
          break;
        }
        if (!validator.isDate(field.value)) {
          validationArray.push({ fieldName: field.fieldName, message: `${field.fieldName} is invalid.` });
          break;
        }
        break;
    };
  });
  return validationArray;
}