import styles from './Model.module.css';

const Model = ({ model }) => {
  return <div className={styles.model}>{model}</div>;
};

export default Model;
