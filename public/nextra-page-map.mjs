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
  }]
}];