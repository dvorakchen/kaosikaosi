# kaosikaosi

## Email provider

The Email provider at `~/kaosikaosi/Business/Email/TencentSendEmail.cs` I used Tencent Email.

Your should build your own Email provider.

## appsettings.json

```json
"ConnectionStrings": {
  "DefaultConnection": "<Database connection string>"
},
"Front": {
  "Domain": "<frontend domain, used for allow CORS>"
}
```