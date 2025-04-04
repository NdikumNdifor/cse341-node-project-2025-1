const registrationModel = require('../models/accountModels')
const bcrypt = require('bcrypt')

const registerAccount = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
      
        if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: "All fields must be filled" });
        }
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        // Store user in DB
        const account = await registrationModel.addUserAccount({
        email,
        password: hashedPassword, // Ensure the field name matches in `addUserAccount`
        firstName,
        lastName,
        });
      
        if (account.err) {
            return res.status(400).json({ error: account.err });
          }
          res.status(201).json({ message: "Account created successfully", account });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
};
      
module.exports = {registerAccount}

// Why Validate in Both Places?
// ✅ Controller-Level Validation (Early Rejection)

// The controller (registerAccount) handles request validation before making a database call.

// This prevents unnecessary interactions with the database if the request is invalid.

// ✅ Model-Level Validation (Data Integrity)

// The model (addUserAccount) ensures that invalid data never gets stored in the database, even if the controller fails to validate.

// This acts as a final safeguard for data consistency.

// What Happens If We Remove Controller Validation?
// If we only validate inside addUserAccount:

// The controller will still attempt to create a database record with incomplete data.

// The function call reaches the database logic (accountModel.create(...)).

// The model validation will reject the request only after interacting with the database, which is unnecessary overhead.


// const MyOwnFunction = async (req, res) =>{
//     const registrationData = req.body
//     const email = registrationData.email
//     const password = registrationData.password
//     let hashedPassword
//     const firstName = registrationData.firstName
//     const lastName = registrationData.lastName
//     try {
//       // regular password and cost (salt is generated automatically)
//       hashedPassword = bcrypt.hashSync(password, 10)
//       const account = await registrationModel.addUserAccount({email, password: hashedPassword, firstName, lastName})
//       res.setHeader("Content-Type", "application/json")
//       res.status(201).json({message: "You succesfully created an account", account}) 
//     }catch (error){
//       //Missing validation for required field: If a required field is missing, the function will try to hash undefined, causing an error
//       // if (!email || !password || !firstName || !lastName) {
//       // return res.status(400).json({ message: "All fields must be filled." });
//       res.status(400).json({message: "Something went wrong.", error: error.message})// Note: Block should always return the actual message (error.message)
//     }  
//   }
