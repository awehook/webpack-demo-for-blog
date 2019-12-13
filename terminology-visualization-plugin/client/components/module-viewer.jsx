import React, { Component } from "react";
import { store } from "../store";
import JSONTree from "react-json-tree";
import { type } from "os";
// import { Component } from "preact";

const getItemString = (type, data, itemType, itemString) => {
  console.log(type, data, itemType, itemString);
  return (
    <span>
      {itemType} {itemString}
    </span>
  );
};

export default class ModuleViewer extends Component {
  render() {
    const modules = this.props.modules;
    const data = Object.create(null);
    for (let module of modules) {
      data[module.name] = module;
    }
    const jsonTreeProp = {
      data,
      getItemString
    };
    return (
      <div>
        modules
        <JSONTree {...jsonTreeProp} />
      </div>
    );
  }
}
