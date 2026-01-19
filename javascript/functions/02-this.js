//https://web.dev/learn/javascript/functions/this

const user = {
  name: "Tyler",
  age: 27,
  languages: ["Javascript", "Ruby", "Python"],
  greet() {
    const hello = `Hello my name is ${this.name}`;

    const langs = this.languages.reduce(function (str, lang, i) {
      if (i === this.languages.length - 1) {
        console.log("INSIDE IF", str, lang);
        return `${str} and ${lang}`;
      }
      console.log("OUTSIDE IF", str, lang);

      return `${str} ${lang},`;
    }.bind(this), "");

    console.log(hello + langs);
  },
};
user.greet()