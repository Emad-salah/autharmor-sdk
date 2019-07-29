import images from "./assets/images.json";

export default class AuthArmor {
  constructor(options = {}) {
    this.clientID = options.clientID;
    this.userReferenceID = options.userReferenceID;
    this.onAuthenticating = options.onAuthenticating;
    this.onAuthenticated = options.onAuthenticated;
  }

  init = () => {
    document.body.innerHTML += `
      <style>
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(53, 57, 64, 0.98);
          z-index: 100;
          opacity: 1;
          visibility: visible;
          transition: all .2s ease;
        }
        
        .popup-overlay-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0px 20px 50px rgba(0, 0, 0, 0.15);
        }
        
        .popup-overlay img {
          height: 110px;
          margin-bottom: 40px;
          margin-top: 40px;
        }
        
        .popup-overlay p {
          margin: 0;
          font-weight: bold;
          color: white;
          font-size: 18px;
          padding: 14px 80px;
          background-color: rgb(0, 128, 128);
        }

        .hidden {
          opacity: 0;
          visibility: hidden;
        }
      </style>
      <div class="popup-overlay hidden">
        <div class="popup-overlay-content">
          <img src="${images.logo}" alt="AuthArmor Icon" />
          <p>Authenticating with AuthArmor...</p>
        </div>
      </div>
    `;

    window.openedWindow = () => {
      this.onAuthenticating();
      document.querySelector(".popup-overlay").classList.remove("hidden");
    };

    window.closedWindow = () => {
      document.querySelector(".popup-overlay").classList.add("hidden");
    };
  };

  setUserReferenceID = id => {
    this.userReferenceID = id;
  };

  popupWindow(url, title, w, h) {
    var y = window.outerHeight / 2 + window.screenY - h / 2;
    var x = window.outerWidth / 2 + window.screenX - w / 2;
    return window.open(
      url,
      title,
      `toolbar=no, 
      location=no, 
      directories=no, 
      status=no, 
      menubar=no, 
      scrollbars=no, 
      resizable=no, 
      copyhistory=no, 
      width=${w}, 
      height=${h}, 
      top=${y}, 
      left=${x}`
    );
  }

  authenticate = () => {
    this.popupWindow(
      `/popup.html?clientID=${this.clientID}&userReferenceID=${
        this.userReferenceID
      }`,
      "AuthArmor Login",
      600,
      400
    );
  };
}
