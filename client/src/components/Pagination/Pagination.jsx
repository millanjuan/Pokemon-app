import styles from "./Pagination.module.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
  
    return (
      <div className={styles.paginationControls}>
        <button
          disabled={isFirstPage}
          className={styles.paginationButton}
          onClick={() => onPageChange(1)}
        >
          FIRST
        </button>
        <button
          disabled={isFirstPage}
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          PREV
        </button>
        {currentPage > 1 && (
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        )}
        <button className={styles.activePage}>{currentPage}</button>
        {currentPage < totalPages && (
          <button
            className={styles.paginationButton}
            onClick={() => onPageChange(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          disabled={isLastPage}
          className={styles.paginationButton}
          onClick={() => onPageChange(currentPage + 1)}
        >
          NEXT
        </button>
        <button
          disabled={isLastPage}
          className={styles.paginationButton}
          onClick={() => onPageChange(totalPages)}
        >
          LAST
        </button>
      </div>
    );
  };
  
  export default Pagination;