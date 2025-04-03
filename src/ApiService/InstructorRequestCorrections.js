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
      console.log("Data: ",data)
      return data; 
    } catch (error) {
      console.error("Error fetching instructor requests:", error);
      throw error; 
    }
  };
  