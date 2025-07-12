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
        "title": "Implementing the fastest list renderer for React Native",
        "date": "2024/10/25",
        "author": "Samuel Scheit",
        "description": "Discover how react-native-skia-list can drastically improve your React Native list performance.",
        "tags": "react-native, skia"
      }
    }]
  }, {
    name: "2025",
    route: "/blog/2025",
    children: [{
      name: "bundestagswahl",
      route: "/blog/2025/bundestagswahl",
      frontMatter: {
        "title": "Fehlende Stimmen bei der Bundestagswahl 2025?",
        "date": "2025/02/26",
        "author": "Samuel Scheit",
        "description": "Eine Datenanalyse der Stimmen von allen 299 Wahlkreisen in Deutschland zur Bundestagswahl 2025",
        "tags": "bundestagswahl 2025, datascience",
        "language": "de"
      }
    }]
  }]
}];