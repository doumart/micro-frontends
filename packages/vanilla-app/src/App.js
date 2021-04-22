import "./index.css";
import logo from "./assets/logo.png";
const reactApp = async () => {
  return await import("react_app/root");
}

const svelteApp = async () => {
  return await import("svelte_app/root");
}

const vueApp = async () => {
  return await import("vue_app/root");
}

const mounted = {
  reactApp: false,
  svelteApp: false,
  vueApp: false,
}

const loaded = {
  reactApp: false,
  svelteApp: false,
  vueApp: false,
}

const init = async (app, name) => {
  if (mounted[name]) return;
  const { mount } = await app();
  const container = document.createElement("div");
  container.setAttribute("id", name);
  document.body.appendChild(container);
  mount(container);
  mounted[app.name] = true;
}

const Button = ({ name, onClick, className, disabled }) => {
  const button = document.createElement("button");
  button.textContent = name;
  button.type = "button";
  button.className = className;
  button.onclick = onClick;

  return button
}

const Title = ({ text }) => {
  const div = document.createElement("div")
  div.textContent = text;
  div.className = "framework-name";
  return div;
}

const Logo = () => {
  const img = document.createElement("img")
  img.src = logo;
  img.className = "logo";
  return img;
}

const TitleContainer = ({ children }) => {
  const div = document.createElement("div")
  children.forEach((child) => {
    div.appendChild(child)
  })
  div.className = "row";
  return div;
}

const App = () => {
  window.addEventListener("loaded", ({ detail }) => {
    loaded[detail] = true;

    [...document.getElementsByClassName(`${detail}-button`)].forEach((b) => {
      b.setAttribute("disabled", "disabled")
    })
  })

  const title = Title({ text: "Vanilla js" });

  const logo = Logo();

  const loadReactAppButton = Button({
    name: "Load React App",
    className: "reactApp-button",
    onClick: () => {
      init(reactApp, "reactApp");
    }
  });

  const loadVueAppButton = Button({
    name: "Load Vue App",
    className: "vueApp-button",
    onClick: () => {
      init(vueApp, "vueApp");
    }
  });

  const loadSvelteAppButton = Button({
    name: "Load Svelte App",
    className: "svelteApp-button",
    onClick: () => {
      init(svelteApp, "svelteApp");
    }
  });

  const titleContainer = TitleContainer({
    children: [
      logo, title
    ]
  })

  const rootElem = document.createElement("div");

  rootElem.appendChild(titleContainer);
  rootElem.appendChild(loadReactAppButton);
  rootElem.appendChild(loadVueAppButton);
  rootElem.appendChild(loadSvelteAppButton);

  return rootElem;
}

export default App;
