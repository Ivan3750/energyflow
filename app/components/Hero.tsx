import styles from "./Hero.module.css"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <img src="/hero.png" alt="Fitness girl" className={styles.heroImage} />

        <div className={styles.hashtags}>
          <span>#Sport</span>
          <span>#Healthy</span>
          <span>#Workout</span>
          <span>#Diet</span>
        </div>
      </div>

      <div className={styles.right}>
        <h1>
          Get <em>Body</em> in shape, Stay healthy
        </h1>
        <p>
          Transform your physique and embrace a healthier lifestyle with our comprehensive fitness and nutrition support.
        </p>
      </div>
    </section>
  )
}
