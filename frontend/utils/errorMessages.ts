interface ApiError {
  message: string;
  status?: number;
  isTimeout?: boolean;
  isOffline?: boolean;
}

interface MappedError {
  message: string;
  type: 'error' | 'warning' | 'info';
}

export const mapApiError = (error: ApiError): MappedError => {
  // Offline
  if (error.isOffline) {
    return {
      message: 'Žiadne internetové pripojenie. Skontrolujte pripojenie a skúste znova.',
      type: 'error'
    };
  }
  
  // Timeout
  if (error.isTimeout) {
    return {
      message: 'Požiadavka trvala príliš dlho. Skúste to znova.',
      type: 'warning'
    };
  }
  
  // HTTP status codes
  if (error.status) {
    if (error.status >= 400 && error.status < 500) {
      return {
        message: error.message || 'Neplatná požiadavka. Skontrolujte údaje.',
        type: 'warning'
      };
    }
    if (error.status >= 500) {
      return {
        message: 'Chyba servera. Skúste to neskôr.',
        type: 'error'
      };
    }
  }
  
  // Generic fallback
  return {
    message: error.message || 'Niečo sa pokazilo. Skúste to znova.',
    type: 'error'
  };
};
