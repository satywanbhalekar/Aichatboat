// middleware/authenticate.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const keycloakIssuer = 'https://iam.cateina.com/realms/globalfintech';

const client = jwksClient({
  jwksUri: `${keycloakIssuer}/protocol/openid-connect/certs`
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
    client.getSigningKey(header.kid!, (err, key) => {
      if (err || !key) return callback(err || new Error('No key found'), undefined);
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    });
  }
  

  export const authenticateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing or invalid Authorization header" });
      return;
    }
  
    const token = authHeader.split(" ")[1];
  
    jwt.verify(token, getKey, { algorithms: ["RS256"], issuer: keycloakIssuer }, (err, decoded) => {
      if (err || !decoded) {
        res.status(403).json({ message: "Invalid token", error: err });
        return;
      }
  
     // decoded is the JWT payload
    const jwtPayload = decoded as jwt.JwtPayload;

    // ✅ Extract preferred_username
    const username = jwtPayload.preferred_username;

    // Attach to request
    (req as any).user = { ...jwtPayload, username };
      next(); // ✅ Always call next() or return
    });
  };
  