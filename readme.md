# AuthArmor Javascript SDK

## 🏁 Installation

You can integrate the AuthArmor SDK into your website by installing and importing our NPM package:

```bash
# Via NPM
npm i -s autharmor-sdk

# Via Yarn
yarn add autharmor-sdk
```

You can also load the SDK via our CDN by placing this `script` tag in your app's `<head>`

```html
<script src="https://cdn.autharmor.com/scripts/autharmor-sdk.js"></script>
```

## 🧭 Usage

### 🚀 Initializing the SDK

In order to initialize the SDK, you'll have to create a new instance of the AuthArmor SDK with the url of your backend API specified in it.

```javascript
const SDK = new AuthArmorSDK("https://api.example.com/"); // specify your backend's url
```

### Generating a new invite

You can easily generate invites to your app by doing the following:

```javascript
// Initialize the SDK
const SDK = new AuthArmorSDK("https://api.example.com/");

// Generate a new invite
const invite = await SDK.invite.generateInvite({
  nickname: "", // Specify the invite's nickname
  referenceId: "" // Specify a reference ID for the invite
});

// You can now do either of the following to use an invite code:

// -- Display QR Code for user to scan using the AuthArmor app
invite.getQRCode(); // Returns a base64 representation of the QR Code image which can be used by supplying it to an <img> tag

// -- Open Invite link in a popup window
invite.useInviteLink();
```

### Confirming an invite

After generating an invite and having the user scan it, you'll need to confirm that the profile is fully setup in the user's device before sending authentication requests to his/her device.

```javascript
console.log("Confirming invite ID:", invite.auth_profile_id);
await SDK.invite.confirmInvite(invite.auth_profile_id);
console.log("Invite has been confirmed successfully!");
```

#### What happens when confirming an invite?

The SDK sends a request to your backend containing an ID of the profile (`auth_profile_id`) the user just imported to his/her phone. The backend then sends a test authentication message to the user's phone, if the user approved it, this means the profile was setup successfully. Otherwise, the user must have incorrectly setup the profile

## 💥 Events

There are several events emitted by the SDK which you can attach to and have your app react accordingly.

### Available Events

| Event Name         | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| inviteWindowOpened | Triggered as soon as the invite popup window is open                       |
| popupOverlayOpened | Triggered once the AuthArmor overlay for invite/auth shows                 |
| popupOverlayClosed | Triggered once the AuthArmor overlay for invite/auth is removed            |
| inviteWindowClosed | Triggered as soon as the invite popup window is closed                     |
| inviteAccepted     | Triggered once a user opens the invite popup and accepts it                |
| inviteCancelled    | Triggered once a user opens the invite popup and presses the cancel button |
| error              | Triggered once an error occurs while accepting/declining an invite         |

### Attaching an event listener

Attaching an event listener is pretty simple, all you'll have to do is call the `on` function with the event you wish to attach a function to followed by a callback function:

```javascript
SDK.on("<event_name>", () => {
  // Do something...
});
```
