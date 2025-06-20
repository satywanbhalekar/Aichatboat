import express from "express";
import cors from 'cors';
import helmet from "helmet";
import chatbotRoutes from './routes/chatbotRoutes';
import onboardingRoutes from './routes/onboardingRoutes'; 
import socialAccountsRoutes from './routes/userSocialAccounts.routes';
import authRoutes from './routes/auth.routes'; // ADD THIS
import { authenticateToken } from './middlewares/authenticateToken';

const app = express();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
 
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Apply Helmet middleware
try {
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://js.stripe.com"],
          styleSrc: ["'self'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
        }
      },
      frameguard: { action: "deny" },
      xssFilter: true,
      noSniff: true,
      hidePoweredBy: true,
      referrerPolicy: { policy: "no-referrer" },
      hsts: {
        maxAge: 63072000,
        includeSubDomains: true,
        preload: true,
      },
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: true,
      crossOriginResourcePolicy: { policy: "same-origin" },
    }));

  //console.log(' Helmet applied successfully');
} catch (err) {
  console.error('Error applying Helmet:', err);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((req, res, next) => {
    res.status(500).json({ error: 'Failed to apply security headers' });
  });
}

// Handle preflight requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
// Simple logging middleware to log requests and responses data
app.use('/api/chatbot',authenticateToken, chatbotRoutes);
app.use('/api/onboard',onboardingRoutes);
app.use('/api/social-accounts', socialAccountsRoutes);
app.use('/api/auth', authRoutes);
//app.use("/api/v1/thoughtspot", authenticateJWT, thoughtspotRoutes);


export default app;
