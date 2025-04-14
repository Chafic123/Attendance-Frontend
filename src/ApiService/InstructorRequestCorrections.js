// ApiService/InstructorRequestCorrections.js
import BASE_URL from "./BaseURL";
export const getInstructorRequests = async () => {
    try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

      const response = await fetch(`${BASE_URL}/instructor/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,

        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch instructor requests");
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error("Error fetching instructor requests:", error);
      throw error; 
    }
  };


  export const updateRequestStatus = async (requestId, status) => {
    try {
        const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  
        const response = await fetch(`${BASE_URL}/instructor/requests/${requestId}/update-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        });
  
        if (!response.ok) {
            throw new Error("Failed to update request status");
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error updating request status to ${status}:`, error);
        throw error;
    }
};
