const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    
    // Validación adicional: email debe contener @ y un dominio válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(412).json({
        success: false,
        message: 'Email must be valid with @ symbol and domain',
        data: { email: ['Email format is invalid. Must include @ and a domain (e.g., user@example.com)'] }
      });
    }
    
    next();
  });
};

module.exports = { saveContact };
