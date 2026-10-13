import styles from './AnimatedFooterArtwork.module.css';

export function AnimatedFooterArtwork() {
  return (
    <div className={styles.artwork} aria-hidden="true">
      {/* The SVG animates isolated hand/tool groups and handles reduced motion internally. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/dynamic-handyman-animated-footer.svg"
        alt=""
        width="2171"
        height="724"
        loading="lazy"
        decoding="async"
        className={styles.image}
      />
    </div>
  );
}
