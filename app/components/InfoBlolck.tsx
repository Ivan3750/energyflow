import styles from "./InfoBlock.module.css"

export default function InfoBlock() {
  return (
    <section className={styles.infoBlock}>
      
      <div className={styles.left}>
        <img src="./InfoBlock.png" alt="Sports girl" className={styles.image} />
      </div>

      
      <div className={styles.right}>
        <h2>
          <span className={styles.icon}><img src="./iconInfoBlock.png" alt="" /></span> 110 min
        </h2>
        <p className={styles.subtitle}>Daily norm of sports</p>
        <p className={styles.text}>
          The World Health Organization recommends at least 150 minutes of
          moderate-intensity aerobic physical activity throughout the week for
          adults aged 18–64. However, what happens if we adjust that number to
          110 minutes every day?
        </p>
      </div>
    </section>
  )
}
