import { useTheme } from 'next-themes';
import { useCallback } from 'react';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const onChange = useCallback(
    (e) => {
      setTheme(e.currentTarget.value);
    },
    [setTheme]
  );
  return (
    <select value={theme} onChange={onChange} className={styles.select}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
      <option value="sunset">Sunset</option>
      <option value="forest">Forest</option>
      <option value="twilight">Twilight</option>
      <option value="midnight">Midnight</option>
      <option value="coffee">Сoffee</option>
      <option value="bordeaux">Bordeaux</option>
      <option value="ash">Ash</option>
      <option value="ash-light">Ash-light</option>
    </select>
  );
};

export default ThemeSwitcher;
