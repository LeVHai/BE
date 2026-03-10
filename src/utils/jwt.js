import jwt from 'jsonwebtoken'
//Tao chuoi jwt
export const signToken = ({payload,privateKey,options})=>{
    return new Promise((resolve, reject) => {
        jwt.sign(payload, privateKey, options, (err, token) => {
          if (err) {
            throw reject(err)
          }
          resolve(token)
        })
      })
}
//decode jwt lay thong tin
export const verifyToken = ({token, secretOrPublicKey})=>{
  return new Promise((resolve, reject) => {
      jwt.verify(token, secretOrPublicKey,  (err, decoded) => {
        if (err) {
          throw reject(err)
        }
        resolve(decoded)
      })
    })
}
