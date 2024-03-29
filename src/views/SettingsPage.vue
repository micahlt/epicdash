<template>
  <div class="full">
    <h1>Settings</h1>
    <div class="settings-grid">
      <div class="options">
        <div class="admin" v-if="loggedIn && isAdmin">
          <div class="page-editor">
            <div class="editor-header">
              <Select
                title="Edit page"
                :options="sites"
                @change="selectPage($event)"
              />
              <Button text="New Page" @click="newSite" type="outline" />
              <a
                @click.prevent="deleteSite"
                href="#"
                title="Delete site"
                v-if="selectedPage.title != ''"
                ><span class="material-icons-outlined delete-icon">
                  delete
                </span></a
              >
            </div>
            <input
              v-if="selectedPage.title.length > 1"
              type="text"
              name="title"
              v-model="selectedPage.title"
              placeholder="Title"
              @keyup="hasEdited = true"
            />
            <input
              v-if="selectedPage.title.length > 1"
              type="text"
              name="url"
              v-model="selectedPage.url"
              placeholder="URL"
              @keyup="hasEdited = true"
            />
            <div class="labels" v-if="selectedPage.title.length > 1">
              <Chip
                :icon="selectedLabel == 'll' ? 'check_circle' : 'circle'"
                text="Loyalty Lane"
                :selected="selectedLabel == 'll'"
                @click="selectLabel('ll')"
              />
              <Chip
                text="Non-Food"
                :icon="selectedLabel == 'nf' ? 'check_circle' : 'circle'"
                :selected="selectedLabel == 'nf'"
                @click="selectLabel('nf')"
              />
            </div>
            <Button
              v-if="hasEdited"
              text="Save"
              @click="saveChanges"
              class="save"
            />
          </div>
        </div>
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
          <Button text="Log In" @click="logIn" class="login-btn" />
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
<script>
import { watch } from "vue";
import Switch from "../components/Switch.vue";
import Button from "../components/Button.vue";
import Card from "../components/Card.vue";
import Chip from "../components/Chip.vue";
import Select from "../components/Select.vue";
export default {
  name: "SettingsPage",
  components: {
    Switch,
    Button,
    Card,
    Chip,
    Select,
  },
  data() {
    return {
      username: "",
      password: "",
      sites: [],
      selectedPage: {
        title: "",
      },
      selectedLabel: "",
      hasEdited: false,
    };
  },
  mounted() {
    if (Boolean(localStorage.getItem("admin"))) {
      this.getSites();
    }
  },
  methods: {
    selectLabel(opt) {
      if (this.selectedLabel != opt) {
        this.selectedLabel = opt;
      } else {
        this.selectedLabel = "all";
      }
      this.hasEdited = true;
    },
    selectPage(e) {
      this.selectedPage = e;
      if (this.selectedPage.labels.length > 1) {
        this.selectLabel(this.selectedPage.labels[1]);
      } else {
        this.selectLabel("");
      }
      this.hasEdited = false;
    },
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
      if (!localStorage.getItem("nocache")) {
        localStorage.setItem("nocache", "true");
      } else {
        if (localStorage.getItem("nocache") == "true") {
          localStorage.setItem("nocache", "false");
        } else {
          localStorage.setItem("nocache", "true");
        }
      }
    },
    logIn() {
      fetch(
        `${this.$api}/api/login?username=${encodeURIComponent(
          this.username
        )}&password=${encodeURIComponent(this.password)}`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            alert("Please try again - error " + res.status);
          }
        })
        .then((data) => {
          window.localStorage.setItem("username", this.username);
          window.localStorage.setItem("admin", data.isAdmin);
          window.localStorage.setItem("token", data.token);
          window.location.reload();
        });
    },
    logOut() {
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("admin");
      window.localStorage.removeItem("token");
      window.location.reload();
    },
    async getSites() {
      console.log("getting sites");
      let sites = await fetch(
        `${this.$api}/api/sites?username=${encodeURIComponent(
          window.localStorage.getItem("username")
        )}&token=${window.localStorage.getItem("token")}`
      );
      sites = await sites.json();
      this.sites = sites.all;
    },
    newSite() {
      const site = {
        title: "New Site",
        new: true,
        labels: ["all"],
      };
      this.sites.push(site);
      this.selectedPage = site;
      this.hasEdited = true;
    },
    async saveChanges() {
      let labels = ["all"],
        labelsCsv = "";
      if (this.selectedLabel.length > 0) {
        labels.push(this.selectedLabel);
      }
      labels.forEach((label) => {
        labelsCsv += label + ",";
      });
      if (this.selectedPage.new) {
        let req = await fetch(
          `${this.$api}/api/add?username=${encodeURIComponent(
            window.localStorage.getItem("username")
          )}&token=${encodeURIComponent(
            window.localStorage.getItem("token")
          )}&title=${encodeURIComponent(
            this.selectedPage.title
          )}&url=${encodeURIComponent(
            this.selectedPage.url
          )}&labels=${encodeURIComponent(labelsCsv)}`
        );
        if (await req.ok) {
          this.$modal.title = "Success";
          this.$modal.description =
            "Created new site " + this.selectedPage.title;
          this.$modal.options.primary = "Okay";
          this.$modal.open = true;
        } else {
          this.$modal.title = "Error";
          this.$modal.description = "There was an error, code " + req.status;
          this.$modal.options.primary = "Okay";
          this.$modal.open = true;
        }
        watch(
          () => this.$modal,
          () => {
            window.location.reload();
          },
          {
            deep: true,
          }
        );
      } else {
        let req = await fetch(
          `${this.$api}/api/update?username=${encodeURIComponent(
            window.localStorage.getItem("username")
          )}&token=${encodeURIComponent(
            window.localStorage.getItem("token")
          )}&id=${this.selectedPage.id}&title=${encodeURIComponent(
            this.selectedPage.title
          )}&url=${encodeURIComponent(
            this.selectedPage.url
          )}&labels=${encodeURIComponent(labelsCsv)}`
        );
        if (await req.ok) {
          this.$modal.title = "Success";
          this.$modal.description = "Successfully edited site!";
          this.$modal.options.primary = "Okay";
          this.$modal.open = true;
        } else {
          this.$modal.title = "Error";
          this.$modal.description = "There was an error, code " + req.status;
          this.$modal.options.primary = "Okay";
          this.$modal.open = true;
        }
        watch(
          () => this.$modal,
          () => {
            window.location.reload();
          },
          {
            deep: true,
          }
        );
      }
    },
    async deleteSite() {
      this.$modal.title = "Warning";
      this.$modal.description = "This entry will be permanently deleted.";
      this.$modal.options.primary = "Okay";
      this.$modal.options.secondary = "Cancel";
      this.$modal.open = true;
      let watcher = watch(
        () => this.$modal,
        async (newVal) => {
          if (newVal.response == 1) {
            let req = await fetch(
              `${this.$api}/api/delete?username=${encodeURIComponent(
                window.localStorage.getItem("username")
              )}&token=${encodeURIComponent(
                window.localStorage.getItem("token")
              )}&id=${this.selectedPage.id}`
            );
            if (await req.ok) {
              this.$modal.title = "Success";
              this.$modal.description = "Successfully deleted site.";
              this.$modal.options.primary = "Okay";
              this.$modal.open = true;
            } else {
              this.$modal.title = "Error";
              this.$modal.description =
                "There was an error, code " + req.status;
              this.$modal.options.primary = "Okay";
              this.$modal.open = true;
            }
            watch(
              () => this.$modal,
              () => {
                window.location.reload();
              },
              {
                deep: true,
              }
            );
          }
          this.$modal.response = 0;
          watcher();
        },
        {
          deep: true,
        }
      );
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
    isAdmin() {
      if (window.localStorage.getItem("admin") == "true") {
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

.login,
.page-editor {
  background: var(--bg-2);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-1);
  transition: box-shadow 0.2s;
}

.login {
  max-width: 20rem;
}

.login-btn {
  margin: auto;
  margin-top: 1rem;
}

.login:hover,
.page-editor:hover {
  box-shadow: var(--shadow-2);
}

input[type="text"],
input[type="password"] {
  border: 2px solid transparent;
  border-bottom: 2px solid var(--bg-1);
  width: calc(100% - 1.5rem);
  font-size: 1rem;
  padding: 0.5rem;
  padding-top: 1.25rem;
  background: transparent;
  color: var(--txt-1);
  font-family: inherit;
  outline: none;
  position: relative;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: var(--txt-2);
  position: absolute;
  transition: 0.2s;
  top: 1.25rem;
  left: 0.3rem;
}

input[type="text"]:focus-within,
input[type="password"]:focus-within {
  border-bottom: 2px solid var(--a-light);
  overflow: visible;
}

input[type="text"]:focus-within::placeholder,
input[type="password"]:focus-within::placeholder {
  transition: 0.1s;
  top: 0rem;
  left: -0.3rem;
  transform: scale(0.7);
  color: var(--txt-1);
}

.labels {
  padding-top: 0.5rem;
}

:deep(.chip) {
  margin-right: 0.25rem;
}

.login > a.primary {
  margin: auto;
  margin-top: 1rem;
}

.login-parent .card {
  max-width: clamp(200px, 25rem, 67vw);
}

.page-editor {
  min-width: 20rem;
}

.page-editor input:first-of-type {
  margin-top: 0.5rem;
}

.admin {
  margin-bottom: 1rem;
}

.editor-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  width: max-content;
  grid-column-gap: 0.7rem;
  column-gap: 0.7rem;
}

.editor-header :deep(a.primary) {
  justify-self: center;
}

.delete-icon {
  transform: translateY(0.5rem);
  color: var(--a-light);
}

.save {
  margin-top: 1rem;
}
</style>