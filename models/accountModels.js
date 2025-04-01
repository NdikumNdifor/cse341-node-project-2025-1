const {AccountModel} = require('./movieSchema-model')

const addUserAccount = async ({email, password, firstName, lastName}) => {
  try{
    // const {email, password, firstName, lastName} = addAccountData
    if(!email || !password || !firstName || !lastName){
        throw new Error("All the fields must be filled")
    }
    const result = await AccountModel.create({email, password, firstName, lastName})
    return result
  }catch(err){
    return {err: err.message}
  }
}

module.exports = {addUserAccount}