export class InstagramOAuth {
    private static CLIENT_ID = process.env.INSTAGRAM_CLIENT_ID!;
    private static CLIENT_SECRET = process.env.INSTAGRAM_CLIENT_SECRET!;
    private static REDIRECT_URI = `${process.env.APP_URL}/auth/instagram/callback`;
  
    static getAuthUrl(): string {
      const params = new URLSearchParams({
        client_id: this.CLIENT_ID,
        redirect_uri: this.REDIRECT_URI,
        scope: 'user_profile,user_media',
        response_type: 'code'
      });
      return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
    }
  
    static async getAccessToken(code: string) {
      const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: this.REDIRECT_URI,
          code: code
        })
      });
      return await response.json();
    }
  
    static async getUserProfile(accessToken: string) {
      const response = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
      const data = await response.json();
      return {
        account_id: data.id,
        account_name: data.username
      };
    }
  }
  
  export class LinkedInOAuth {
    private static CLIENT_ID = process.env.LINKEDIN_CLIENT_ID!;
    private static CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET!;
    private static REDIRECT_URI = `${process.env.APP_URL}/auth/linkedin/callback`;
  
    static getAuthUrl(): string {
      const params = new URLSearchParams({
        response_type: 'code',
        client_id: this.CLIENT_ID,
        redirect_uri: this.REDIRECT_URI,
        scope: 'r_liteprofile r_emailaddress'
      });
      return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    }
  
    static async getAccessToken(code: string) {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: this.REDIRECT_URI,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET
        })
      });
      return await response.json();
    }
  
    static async getUserProfile(accessToken: string) {
      const response = await fetch('https://api.linkedin.com/v2/people/~', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      return {
        account_id: data.id,
        account_name: `${data.firstName?.localized?.en_US || ''} ${data.lastName?.localized?.en_US || ''}`.trim()
      };
    }
  }