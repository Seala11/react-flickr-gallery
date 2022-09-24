import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './index.module.scss';

interface INotFoundProps {
  navigate: boolean;
}

class NotFound extends React.Component {
  state = { navigate: false };

  constructor(props: INotFoundProps) {
    super(props);
    this.navigateHome = this.navigateHome.bind(this);
  }

  navigateHome() {
    this.setState({ navigate: true });
  }

  render() {
    return (
      <main className={styles.wrapper}>
        {this.state.navigate && <Navigate to="/" replace={true} />}
        <h1>404</h1>
        <p>Oops! The page you are looking for cannot be found.</p>
        <button className={styles.button} onClick={this.navigateHome}>
          Back Home
        </button>
      </main>
    );
  }
}

export default NotFound;
