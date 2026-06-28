// Service to interact with the local Node.js AI Evaluation Service
const AI_SERVICE_URL = process.env.REACT_APP_AI_SERVICE_URL || 'http://localhost:3001';

export const aiService = {
  triggerEvaluation: async (submissionId: number) => {
    try {
      const response = await fetch(`${AI_SERVICE_URL}/api/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ submission_id: submissionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to trigger evaluation');
      }

      return data;
    } catch (error: any) {
      console.error('Error triggering AI evaluation:', error);
      throw error;
    }
  }
};
