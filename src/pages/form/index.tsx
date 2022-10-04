import React from 'react';
import COUNTRIES from 'shared/data/countries';

type FormPropsType = {
  handleSubmit: () => void;
  firstName: React.RefObject<HTMLInputElement>;
  lastName: React.RefObject<HTMLInputElement>;
};

class Form extends React.Component {
  constructor(props: FormPropsType) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.firstName = React.createRef();
    // this.lastName = React.createRef();
    // this.zipcode = React.createRef();
    // this.birthday = React.createRef();
    // this.country = React.createRef();
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Form</h1>
        <form onSubmit={this.handleSubmit} data-testid="react-form">
          <label htmlFor="firstName" data-testid="firstName">
            First Name
          </label>
          <input id="firstName" type="text" />

          <label htmlFor="lastName" data-testid="lastName">
            Last Name
          </label>
          <input id="lastName" type="text" />

          <label htmlFor="zipcode" data-testid="zipcode">
            Zipcode
          </label>
          <input id="zipcode" type="text" />

          <label htmlFor="birthday" data-testid="birthday">
            Birthday
          </label>
          <input id="birthday" type="date" />

          <label htmlFor="country" data-testid="country">
            Country
          </label>
          <select id="country" value="" onChange={(e) => console.log(e.target.value)}>
            <option key="default" value="" disabled={true}>
              Please select your country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <button type="submit" data-testid="submit-button" disabled={true}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
