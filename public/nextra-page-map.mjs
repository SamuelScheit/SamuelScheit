export const pageMap = [{
  name: "blog",
  route: "/blog",
  children: [{
    name: "2023",
    route: "/blog/2023",
    children: [{
      name: "react-native-rust",
      route: "/blog/2023/react-native-rust",
      frontMatter: {
        "title": "Using Rust in react-native with jsi-rs",
        "date": "2023/07/05",
        "author": "Samuel Scheit",
        "description": "Exploring different approaches of embedding the libsignal Rust library in react-native apps",
        "tags": "react-native, rust"
      }
    }]
  }, {
    name: "2024",
    route: "/blog/2024",
    children: [{
      name: "react-native-skia-list",
      route: "/blog/2024/react-native-skia-list",
      frontMatter: {
        "title": "Implementing the fastest list renderer for React Native using Skia",
        "date": "2024/10/25",
        "author": "Samuel Scheit",
        "description": "Discover how react-native-skia-list can drastically improve your list performance in React Native.",
        "tags": "react-native, skia"
      }
    }]
  }]
}];