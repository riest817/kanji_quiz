import React, { Component } from 'react';
import axios from 'axios';

const server = 'https://kanji-api.herokuapp.com/api/v1/kanji/random';

const App = () => {
  return <Counter />
}

class Counter extends Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      kanji : "",
      value  : '',
      answer : ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
    this.getData();
  }

  handleChange(event) { this.setState({value: event.target.value});  }

  handleSubmit(event) {
    //this.setState({value: event.target.value});
    console.log(this.state.answer);
    console.log(this.state.value);
    if ( this.state.answer === this.state.value ) {
      alert("正解です！！");
    } else {
      alert("間違いです。もう一度回答してみてください！");
    } 
    event.preventDefault();
  }

  getData(event) {
      axios.get(server)
      .then((res) => {
        this.setState({
          status: true,
          //result: res.data,
          kanji : res.data.kanji,
          answer : res.data.yomi
        });
        console.log(this.state);
      })
      .catch((e) => {
        console.error(e);
        this.setState({
          status: false,
          result: e,
        });
      });
  }

  render()
  {
    //const result = (this.state.status) ? (<div>{this.state.result}</div>) : (<div>Not Yet</div>);
    return (
      <div class="main">
        <h1>漢字ドリル</h1>
        <div class="question">
          {this.state.kanji}
          <label>
            <h5>読み:
            <input type="text" value={this.state.value} onChange={this.handleChange} /></h5>        
          </label>
        </div>
        <div class="answer">
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="送信する" class="button"/>
          </form>
        </div>
      </div>
    );
  }
}
export default App;
