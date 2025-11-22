import { useState, useCallback, useEffect } from 'react';

interface QueryResult {
  isError: boolean;
  error?: unknown;
}

interface UseErrorToastReturn {
  errorMessage: string;
  showError: boolean;
  handleError: (message: string) => void;
  handleCloseError: () => void;
}

export const useErrorToast = (queries?: QueryResult[], dates?: Date[]): UseErrorToastReturn => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState(false);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setShowError(true);
  }, []);

  const handleCloseError = useCallback(() => {
    setShowError(false);
  }, []);

  // Automatically check for query errors
  useEffect(() => {
    if (!queries || !dates) return;

    queries.forEach((query, index) => {
      if (query.isError) {
        const date = dates[index].toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        });
        handleError(`Failed to load rates for ${date}`);
      }
    });
  }, [queries, dates, handleError]);

  return {
    errorMessage,
    showError,
    handleError,
    handleCloseError,
  };
};
