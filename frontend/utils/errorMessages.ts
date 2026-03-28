interface ApiError {
  message: string;
  status?: number;
  isTimeout?: boolean;
  isOffline?: boolean;
  validationErrors?: Array<{ loc: string[]; msg: string; type: string }>;
}

interface MappedError {
  message: string;
  type: 'error' | 'warning' | 'info';
  fieldErrors?: Record<string, string>;
  affectedStep?: number;
}

const fieldToStepMap: Record<string, number> = {
  name: 1,
  email: 1,
  organization: 1,
  role: 1,
  phone: 1,
  city: 1,
  category: 2,
  title: 2,
  description: 2,
  urgency: 3,
  deadline: 3,
  budget: 3,
  helpType: 3,
  tags: 3,
};

export const mapApiError = (error: ApiError): MappedError => {
  if (error.isOffline) {
    return {
      message: 'Žiadne internetové pripojenie. Skontrolujte pripojenie a skúste znova.',
      type: 'error'
    };
  }
  
  if (error.isTimeout) {
    return {
      message: 'Požiadavka trvala príliš dlho. Skúste to znova.',
      type: 'warning'
    };
  }
  
  if (error.status === 422 && error.validationErrors) {
    const fieldErrors: Record<string, string> = {};
    let affectedStep: number | undefined;
    
    for (const validationError of error.validationErrors) {
      const field = validationError.loc[validationError.loc.length - 1];
      fieldErrors[field] = validationError.msg;
      
      if (!affectedStep && fieldToStepMap[field]) {
        affectedStep = fieldToStepMap[field];
      }
    }
    
    return {
      message: 'Prosím, opravte označené polia a skúste znova.',
      type: 'warning',
      fieldErrors,
      affectedStep,
    };
  }
  
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
  
  return {
    message: error.message || 'Niečo sa pokazilo. Skúste to znova.',
    type: 'error'
  };
};
