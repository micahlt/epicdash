<template>
  <div class="full">
    <h1>Settings</h1>
    <div class="settings-grid">
      <div class="options">
        <div class="option">
          <Switch @change="changeTheme($event)" :initial="currentTheme" />
          <p>Dark theme</p>
        </div>
        <div class="option">
          <Switch @change="cacheAssets($event)" :initial="assetsCached" />
          <p>Disable asset caching</p>
        </div>
        <div class="option">
          <Switch />
          <p>Prevent guest mode</p>
        </div>
      </div>
      <div class="login-parent">
        <div class="login" v-if="!loggedIn">
          <h2>Log In to Dash</h2>
          <input
            type="text"
            name="username"
            v-model="username"
            placeholder="Username"
            @keyup.enter="logIn"
          />
          <br />
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="Password"
            @keyup.enter="logIn"
          />
          <br />
          <Button text="Log In" @click="logIn" />
        </div>
        <Card
          v-else
          :header="signedInMessage"
          description="You're currently signed in."
          primaryOpt="Log Out"
          @clickPrimary="logOut"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
h1 {
  margin-bottom: 1rem;
}
.full {
  padding: 2rem;
}

.settings-grid {
  display: grid;
  grid-template-columns: auto 1fr;
}

@media only screen and (max-width: 675px) {
  .settings-grid {
    grid-template-columns: 1fr;
    grid-row-gap: 1rem;
  }
}

.options {
  width: max-content;
  padding-right: 1rem;
}
.option {
  display: grid;
  grid-template-columns: 4rem auto;
  align-items: center;
  margin-bottom: 1rem;
}

.login-parent {
  padding-left: 1rem;
}

.login {
  background: var(--bg-2);
  padding: 1rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: var(--shadow-1);
  transition: box-shadow 0.2s;
  max-width: 20rem;
}

.login:hover {
  box-shadow: var(--shadow-2);
}

.login input {
  border: 2px solid transparent;
  border-bottom: 2px solid var(--bg-1);
  font-size: 1rem;
  padding: 0.5rem;
  padding-top: 1.25rem;
  width: calc(100% - 1.5rem);
  background: var(--bg-2);
  color: var(--txt-1);
  font-family: inherit;
  outline: none;
  position: relative;
}

.login input::placeholder {
  color: var(--bg-1);
  position: absolute;
  transition: 0.2s;
  top: 1.25rem;
  left: 0.3rem;
}

.login input:focus-within {
  border-bottom: 2px solid var(--a-light);
  overflow: visible;
}

.login input:focus-within::placeholder {
  transition: 0.1s;
  top: 0rem;
  left: -0.3rem;
  transform: scale(0.7);
  color: var(--txt-1);
}

:deep(a) {
  margin: auto;
  margin-top: 1rem;
}
</style>
<script>
import Switch from "../components/Switch.vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
export default {
  name: "SettingsPage",
  components: {
    Switch,
    Button,
    Card,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    changeTheme(e) {
      if (!localStorage.getItem("theme")) {
        console.log("previously unset theme");
        if (matchMedia("prefers-color-scheme: dark")) {
          this.$emit("switchTheme", "light");
        } else {
          this.$emit("switchTheme", "dark");
        }
      } else {
        if (localStorage.getItem("theme") == "dark") {
          this.$emit("switchTheme", "light");
        } else {
          this.$emit("switchTheme", "dark");
        }
      }
    },
    cacheAssets(e) {
      if (!localStorage.getItem("disable-caching")) {
        localStorage.setItem("disable-caching", "true");
      } else {
        if (localStorage.getItem("disable-caching") == "true") {
          localStorage.setItem("disable-caching", "false");
        } else {
          localStorage.setItem("disable-caching", "true");
        }
      }
    },
    logIn() {
      fetch(`/api/login?username=${this.username}&password=${this.password}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("Please try again - error " + res.status);
          }
        })
        .then((data) => {
          window.localStorage.setItem("username", this.username);
          window.localStorage.setItem("token", data.token);
          window.location.reload();
        });
    },
    logOut() {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("token");
      window.location.reload();
    },
  },
  computed: {
    currentTheme() {
      if (window.localStorage.getItem("theme") == "dark") {
        return true;
      } else {
        return false;
      }
    },
    assetsCached() {
      if (window.localStorage.getItem("disable-caching") == "true") {
        return true;
      } else {
        return false;
      }
    },
    loggedIn() {
      if (
        window.localStorage.getItem("username") &&
        window.localStorage.getItem("token")
      ) {
        return true;
      } else {
        return false;
      }
    },
    signedInMessage() {
      return `Hello, ${window.localStorage.getItem("username")}`;
    },
  },
};
</script>

