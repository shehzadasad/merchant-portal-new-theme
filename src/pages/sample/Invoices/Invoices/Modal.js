import styles from './Modal.module.css';

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? `${styles.modal} ${styles.displayBlock}` : `${styles.modal} ${styles.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        {children}
      </section>
    </div>
  );
};