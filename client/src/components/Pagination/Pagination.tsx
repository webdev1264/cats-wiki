import style from "./pagination.module.scss";

type PaginationProps = {
  totalElements: number;
  elementsPerPage: number;
  currentPage: number;
  onClick: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalElements,
  elementsPerPage,
  currentPage,
  onClick,
}) => {
  const pages = Math.ceil(totalElements / elementsPerPage);
  const listOfPages = [...Array(pages)];
  return (
    <ul className={style.wrapper}>
      {listOfPages.map((_, index) => {
        const page = index + 1;
        const itemClassName =
          currentPage === page
            ? `${style.active} ${style.pageNumber}`
            : style.pageNumber;

        if (
          page === 1 ||
          page === pages ||
          (currentPage <= 3 && page <= 4) ||
          (currentPage >= pages - 2 && page >= pages - 3) ||
          currentPage === page ||
          page === currentPage + 1 ||
          page === currentPage - 1
        ) {
          return (
            <li
              key={index}
              className={itemClassName}
              onClick={() => onClick(page)}
            >
              {index + 1}
            </li>
          );
        }
        if ((currentPage >= 4 && page === 2) || page === pages - 1) {
          return (
            <li key={index} className={style.dots}>
              ...
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Pagination;
