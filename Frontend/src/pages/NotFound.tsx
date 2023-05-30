import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Strona, której szukasz, nie istnieje.</p>
      <Link to="/" className={styles.link}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
