import React, { Component } from 'react';
import axios from 'axios';

const server = 'https://kanji-api.herokuapp.com/api/v1/kanji/random';

const App = () => {
  return <Counter />
}

const CORRECT_IMAGE_PATH = `${process.env.PUBLIC_URL}/circle.png`;
const MISS_IMAGE_PATH = `${process.env.PUBLIC_URL}/batsu.png`;

const Dialog = ({ isCorrect, onNext, onBack} ) => {
  return (
    <div className="dialogWrapper">
      <div className="dialogHeader">
        {isCorrect ? '正解！' : '残念'}
      </div>
      <div className="dialogContent">
        <img className="image" src={isCorrect ? CORRECT_IMAGE_PATH: MISS_IMAGE_PATH} alt='result'/>
        {!isCorrect && <button　className="backButton"　onClick={onBack}>
          {"やり直す"}
        </button>}
        <button　className="nextButton"　onClick={onNext}>
          {"次の問題へ"}
        </button>
      </div>
    </div>
  );
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
    this.handleOnNext = this.handleOnNext.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
  }

  handleChange(event) { this.setState({value: event.target.value});  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.answer);
    console.log(this.state.value);
    if ( this.state.answer === this.state.value ) {
      this.setState({isCorrect: true})
    } else {
      this.setState({isCorrect: false})
    }
    this.setState({isAnswered: true});
  }

  handleOnNext(event) {
    event.preventDefault()
    this.setState({isAnswered: false})
    this.getData();
  }

  handleOnBack(event) {
    event.preventDefault()
    this.setState({
      isAnswered: false,
      value: ""
    })
  }

  getData(event) {
      axios.get(server)
      .then((res) => {
        this.setState({
          value: "",
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
        <button onClick={this.handleSubmit} type="submit" class="button">
            送信する
        </button>
        </div>
        {this.state.isAnswered && <Dialog isCorrect={this.state.isCorrect} onBack={this.handleOnBack} onNext={this.handleOnNext}/> }
      </div>
    );
  }
}
export default App;
