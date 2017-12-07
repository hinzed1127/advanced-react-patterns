import React, { Component } from 'react';
import './App.css';

class Toggle extends Component {
  static defaultProps = {onToggle: () => {}};
  state = {on: false};

  toggle = () => {
    return this.setState(
      ({on}) => ({on: !on}),
      () => {this.props.onToggle(this.state.on)}
    );
  };

  render() {
    const {on} = this.state;

    return (
      <Switch on={on} onClick={this.toggle} />
    );
  } 
}

function Switch({on, onClick}) {
  return (
    <div className='toggle-container'>
      <label className="switch">
        <input type="checkbox" checked={on} onChange={onClick}/>
        <span className="slider round" />
      </label>
    </div>
  );
}

class App extends Component {
  render() {
    return <Toggle onToggle={on => console.log(on)}/>;
  }
}

export default App;
