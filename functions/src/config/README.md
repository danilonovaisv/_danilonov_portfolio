# Firebase Admin Configuration

## Service Account Setup

To use Firebase Admin SDK, you need to download your service account JSON file from the Firebase Console and place it in the project root directory.

### Steps to download the service account file:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (portfolio-danilo-novais)
3. Navigate to Project Settings (gear icon)
4. Go to the Service Accounts tab
5. Click "Generate New Private Key" 
6. Save the JSON file to your project root as `portfolio-danilo-novais-firebase-adminsdk-fbsvc-2bc940e508.json`

### Security Considerations

⚠️ **Important**: Keep the service account file secure and never commit it to version control.

Add the following line to your `.gitignore` file:

```
# Firebase service account
*.json
!package*.json
```

Or be more specific:

```
# Firebase service account
portfolio-danilo-novais-firebase-adminsdk-*.json
```

### Using the Service Account

Once you've placed the service account file in your project root, the configuration in [admin-config.ts](./admin-config.ts) will load it automatically.

For production deployments, it's recommended to use environment variables instead of storing the file directly in your project.