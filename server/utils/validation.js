// Minimal Validation Library in JavaScript

const createValidation = (fn, errorMsg, type) => data => {
  const result = fn(data);
  return {
    cata: branch =>
      result ? branch.right(result, type) : branch.left(errorMsg, type),
    type
  };
};

const call = ({ value, left = e => e, right = a => a }) =>
  value.cata({ left, right });

const validateFormValues = (values, left, right) =>
  Object.keys(values).map(key => {
    const value = values[key];
    return {
      [key]: Array.isArray(value)
        ? value.map(value => call({ value, left, right }))
        : call({ value, left, right })
    };
  });

const createUserName = createValidation(
  a => a && a.length > 5,
  "Minimum of 6 characters required"
);
const createEmail = createValidation(
  a => a && a.length > 6,
  "Minimum of 7 characters required"
);
const createPhone = createValidation(
  a => a && a.length > 7,
  "Minimum of 8 characters required"
);

const hasDigit = createValidation(
  a => /\d/.test(a),
  "Should contain at least one digit"
);

const isValidString = a => typeof a === "string" && a.trim().length > 0;

const formValues = {
  email: createEmail("foo@"),
  phone: createPhone("987654321"),
  userName: [createUserName("UserA"), hasDigit("1User A")]
};

// const errors = validateFormValues(formValues, undefined, a => null);

// console.log(JSON.stringify(errors, null, 4));

module.exports = {
  validateFormValues,
  isValidString
};
