
function App() {
  return (
    React.createElement(Pomodoro, null));

}

class Pomodoro extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      counterLength: 600,
      sessionLength: 25,
      breakLength: 5,
      timeLeft: '25:00',
      minutes: 25,
      seconds: 0,
      timerStatus: '',
      timerType: 'Session' };


    this.timerControl = this.timerControl.bind(this);
    this.reset = this.reset.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.addZero = this.addZero.bind(this);
    this.breakStart = this.breakStart.bind(this);
    this.sessionStart = this.sessionStart.bind(this);
    this.breakCounter = this.breakCounter.bind(this);
  }

  breakDecrement() {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') {return;};
    const { breakLength } = this.state;
    let newBreakLength = breakLength - 1;
    if (breakLength > 1) {
      this.setState({
        breakLength: newBreakLength });

    }
  }

  breakIncrement() {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') {return;};
    const { breakLength } = this.state;
    let newBreakLength = breakLength + 1;
    if (breakLength < 60) {
      this.setState({
        breakLength: newBreakLength });

    }
  }

  sessionDecrement() {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') {return;};
    const { sessionLength, minutes } = this.state;
    let newSessionLength = sessionLength - 1;
    if (sessionLength > 1) {
      this.setState({
        sessionLength: newSessionLength,
        minutes: newSessionLength });

    }
  }

  sessionIncrement() {
    if (this.state.timerStatus == 'running' || this.state.timerStatus == 'paused') {return;};
    const { sessionLength, minutes } = this.state;
    let newSessionLength = sessionLength + 1;
    if (sessionLength < 60) {
      this.setState({
        sessionLength: newSessionLength,
        minutes: newSessionLength });

    }
  }

  timerControl() {
    if (this.state.timerStatus === 'running') {
      clearInterval(this.timer);
      clearInterval(this.breakTimer);
      this.setState({
        timerStatus: 'paused' });

      return;
    } else {
      this.setState({
        timerStatus: 'running' });

    }

    if (this.state.timerType === 'Session') {
      this.timer = setInterval(() => this.sessionStart(), 1000);
    } else if (this.state.timerType === 'Break') {

    }


  }

  sessionStart() {
    const { seconds, minutes } = this.state;

    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1 }));



    }
    if (seconds === 0) {
      let minutesDisplay = this.addZero(minutes);
      let secondsDisplay = '00';
      if (minutes === 0) {
        beep.play();
        clearInterval(this.timer);
        this.setState({
          timerStatus: '' });

        this.breakStart();
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59 }));

      }
    }
  }

  breakStart() {
    let minutes = this.state.breakLength;
    this.setState({
      timerType: 'Break',
      timerStatus: 'running',
      minutes: minutes });


    this.breakTimer = setInterval(() => this.breakCounter(), 1000);

  }

  breakCounter() {
    const { seconds, minutes } = this.state;

    if (seconds > 0) {
      this.setState(({ seconds }) => ({
        seconds: seconds - 1 }));


    }
    if (seconds === 0) {
      let minutesDisplay = this.addZero(minutes);
      let secondsDisplay = '00';
      if (minutes === 0) {
        beep.play();
        clearInterval(this.breakTimer);
        let sessionLength = this.state.sessionLength;
        this.setState({
          timerType: 'Session',
          seconds: 0,
          minutes: sessionLength,
          timerStatus: '' });


        this.timerControl();
      } else {
        this.setState(({ minutes }) => ({
          minutes: minutes - 1,
          seconds: 59 }));

      }
    }
  }

  reset() {
    clearInterval(this.timer);
    clearInterval(this.breakTimer);
    beep.load();
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      minutes: 25,
      seconds: 0,
      timerStatus: '',
      timerType: 'Session' });

  }

  addZero(value) {
    return ("0" + value).slice(-2);
  }

  render() {

    return (
      React.createElement("div", { class: "pomodoro__container" },

      React.createElement("h1", { class: "pomodoro__container__heading1" }, "Pomodoro Clock"),

      React.createElement("div", { class: "controls" },
      React.createElement("div", null,
      React.createElement("h2", { id: "break-label", class: "controls__header" }, "Break Length"),
      React.createElement("div", { class: "controls__inner" },
      React.createElement("div", null,
      React.createElement("button", { class: "button button--increment", id: "break-decrement", onClick: this.breakDecrement }, "-")),

      React.createElement("div", null,
      React.createElement("p", { id: "break-length", class: "controls__inner__length" }, this.state.breakLength)),

      React.createElement("div", null,
      React.createElement("button", { class: "button button--increment", id: "break-increment", onClick: this.breakIncrement }, "+")))),




      React.createElement("div", null,
      React.createElement("h2", { id: "session-label", class: "controls__header" }, "Session Length"),
      React.createElement("div", { class: "controls__inner" },
      React.createElement("div", null,
      React.createElement("button", { class: "button button--increment", id: "session-decrement", onClick: this.sessionDecrement }, "-")),

      React.createElement("div", null,
      React.createElement("p", { id: "session-length", class: "controls__inner__length" }, this.state.sessionLength)),

      React.createElement("div", null,
      React.createElement("button", { class: "button button--increment", id: "session-increment", onClick: this.sessionIncrement }, "+"))))),





      React.createElement("div", { class: "session__container" },
      React.createElement("h3", { id: "timer-label", class: "session__container__header" }, this.state.timerType),

      React.createElement("div", { id: "time-left", class: "session__container__timer" },

      this.state.minutes < 10 ? '0' + this.state.minutes : this.state.minutes, ":", this.state.seconds < 10 ? '0' + this.state.seconds : this.state.seconds),


      React.createElement("div", { class: "session__container__controls" },

      React.createElement("button", { class: "button button--start--stop", id: "start_stop", onClick: this.timerControl }, this.state.timerStatus === '' ? 'Start' : 'Pause', " "),

      React.createElement("button", { class: "button button--start--stop button--start--stop--start", id: "reset", onClick: this.reset }, "Reset"),

      React.createElement("audio", { ref: "beepSound", id: "beep", src: "https://bobmatyas.github.io/fcc-pomodoro-clock/sounds/beep.mp3" })))));




  }}




ReactDOM.render(React.createElement(App, null), document.getElementById('app'));