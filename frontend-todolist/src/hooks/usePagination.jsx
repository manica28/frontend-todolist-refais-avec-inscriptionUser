import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Hook pour gérer la pagination avec l'URL
 * @param {number} totalItems - nombre total d'éléments
 * @param {number} itemsPerPage - nombre d'éléments par page
 */
export const usePagination = (totalItems, itemsPerPage) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Page initiale depuis l'URL ou 1 par défaut
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Mise à jour de l'URL quand la page change
  useEffect(() => {
    if (currentPage === 1) {
      searchParams.delete("page");
    } else {
      searchParams.set("page", currentPage);
    }
    setSearchParams(searchParams);
  }, [currentPage, setSearchParams, searchParams]);

  // Fonctions pour naviguer
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    goToPage,
    nextPage,
    prevPage,
  };
};
