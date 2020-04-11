import Http from "axios";
import config from "./config";
import images from "./assets/images.json";

Http.defaults.baseURL = config.apiURL;

class AuthArmorInstance {
	constructor(options = {}) {
		const defaultFunction = () => {};
		this.clientID = options.clientID;
		this.userReferenceID = options.userReferenceID;
		this.onAuthenticating = options.onAuthenticating || defaultFunction;
		this.onAuthenticated = options.onAuthenticated || defaultFunction;
    this.onButtonClick = options.onButtonClick || defaultFunction;
    this.inviteCode = "";
    this.signature = "";
    this.init = this.init.bind(this);
	}

	init() {
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
          background-color: #2b313c;
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
          <p class="auth-message">Authenticating with AuthArmor...</p>
        </div>
      </div>
    `;

		window.openedWindow = () => {
			this.onAuthenticating();
			document.querySelector(".popup-overlay").classList.remove("hidden");
    };
    
    window.AUTHARMOR_acceptRequest = (data) => {
      this.onInviteAccepted(data);
      if (data) {
        document.querySelector(".auth-message").classList.add("autharmor--success");
        document.querySelector(".auth-message").textContent = data.message;
      }
      setTimeout(() => {
        document.querySelector(".popup-overlay").classList.add("hidden");
      }, 500);
    };

    window.AUTHARMOR_cancelRequest = (data) => {
			this.onInviteCancelled(data);
      if (data) {
        document.querySelector(".auth-message").classList.add("autharmor--danger");
        document.querySelector(".auth-message").textContent = data.message;
      }
      setTimeout(() => {
        document.querySelector(".popup-overlay").classList.add("hidden");
      }, 500);
    };

    window.AUTHARMOR_error = (data) => {
			this.onError(data);
      if (data) {
        document.querySelector(".auth-message").classList.add("autharmor--danger");
        document.querySelector(".auth-message").textContent = data.message;
      }
      setTimeout(() => {
        document.querySelector(".popup-overlay").classList.add("hidden");
      }, 500);
    };

		window.closedWindow = () => {
			document.querySelector(".popup-overlay").classList.add("hidden");
		};
	}

	setUserReferenceID(id) {
		this.userReferenceID = id;
	}

	setOnInviteAccepted(callback) {
		this.onInviteAccepted = callback;
  }
  
  setOnInviteCancelled(callback) {
		this.onInviteCancelled = callback;
  }
  
  setOnError(callback) {
		this.onError = callback;
	}
  
  setInviteCode(id) {
    this.inviteCode = id;
  }

  setSignature(signature) {
    this.signature = signature;
  }

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

	authenticate() {
    this.onAuthenticating();
    document.querySelector(".popup-overlay").classList.remove("hidden");
		this.popupWindow(
			`https://localhost:44327/?i=${this.inviteCode}&aa_sig=${this.signature}`,
			"Link your account with AuthArmor",
			600,
			400
		);
	}
}

window.AuthArmor = AuthArmorInstance;

export default AuthArmorInstance