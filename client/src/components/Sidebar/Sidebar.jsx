import styles from "./Sidebar.module.css";

const Sidebar = ({
  handleOrderPokeByName,
  handleOrderPokeByAttack,
  handleTypeFilter,
  handleFilterOrigin,
  types,
}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.order}>
        <select onChange={handleOrderPokeByName}>
          <option value="All">ORDER BY NAME</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <select onChange={handleOrderPokeByAttack}>
          <option value="All">ORDER BY ATTACK</option>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <select onChange={(e) => handleTypeFilter(e)}>
          <option value="All">ALLTYPES</option>
          {types.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleFilterOrigin(e)}>
          <option value="All">ORDER BY ORIGIN</option>
          <option value="created">CREATED</option>
          <option value="api">API</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;