import React from "react";
import mermaid from "mermaid";



type MyProps = {
    chart:string
}

export default class Mermaid extends React.Component<MyProps> {

  componentDidMount() {
    mermaid.contentLoaded();
  }

  render() {
    return <div className="mermaid">{this.props.chart}</div>;
  }
}

mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    fontFamily: "Montserrat"
});
