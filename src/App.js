import React, { Component } from 'react';
import Icon from './correct.gif';

const App = () => {
  return <Counter />
}

class Counter extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      kanji : "日本",
      value  : '',
      answer : 'にほん'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({value: event.target.value});  }

  handleSubmit(event) {
    //this.setState({value: event.target.value});
    console.log(this.state.answer);
    console.log(this.state.value);
    if ( this.state.answer === this.state.value ) {
      alert("正解です！！");
      const IconComponent = () =>{
        return <img src={Icon}  alt="アイコン" />
      }
      //export default IconComponent
    } else {
      alert("間違いです。もう一度回答してみてください！");
    } 
    event.preventDefault();
  }

  render()
  {
    return (
      <div class="main">
        <h1>漢字ドリル</h1>
        <div class="question">
          漢字：{this.state.kanji}
        </div>
        <div class="answer">
          <form onSubmit={this.handleSubmit}>
            <label>
              読み: 
              <textarea value={this.state.value} onChange={this.handleChange} />        
            </label>
            <input type="submit" value="送信する" class="button"/>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
