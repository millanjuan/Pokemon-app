import styles from "./Sidebar.module.css";

const Sidebar = ({
  handleOrderPoke,
  handleTypeFilter,
  handleFilterOrigin,
  types,
}) => {
  return (
    <div className={styles.sidebar}>
            <div className={styles.order}>
              <h2>Order By</h2>
                <select onChange={(e) => handleOrderPoke(e)}>
                    <option value="name-All">None</option>
                    <option value="name-asc">Name Asc</option>
                    <option value="name-desc">Name Desc</option>
                    <option value="attack-asc">Attack Asc</option>
                    <option value="attack-desc">Attack Desc</option>
                </select>
                <h2>Filter By Type</h2>
        <select onChange={(e) => handleTypeFilter(e)}>
          <option value="All">All Types</option>
          {types.map((type) => (
            <option value={type.toLowerCase()} key={type}>
              {type}
            </option>
          ))}
        </select>
        <h2>Filter By Origin</h2>
        <select onChange={(e) => handleFilterOrigin(e)}>
          <option value="All">All Origins</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;