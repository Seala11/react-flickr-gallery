import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <h1>Form</h1>
        <form>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" />
        </form>
      </div>
    );
  }
}

export default Form;
