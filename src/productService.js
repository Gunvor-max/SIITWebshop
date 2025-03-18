import axios from "axios";

export async function checkLogin() {
  try {
    const response = await axios.get('https://localhost:7040/api/Users/ValidateLoginAndSession', {
      withCredentials: true, // Include session cookies
    });
    return response.data; // Return the fetched basket data
  } catch (error) {
    console.error('Error fetching basket:', error);
    throw error; // Pass the error up the chain
  }
}

export async function reserveAndGetBasket(productId) {
  try {
    const response = await axios.get(
      `https://localhost:7040/api/Products/ReserveProduct${productId}`,
      {
        withCredentials: true, // Include session and access cookies
      }
    );
    return response.data; // The server returns the updated basket
  } catch (error) {
    console.error("Error reserving product and fetching basket:", error);
    throw error; // Pass the error up the chain
  }
}

export async function removeAndGetBasket(productId){
  try {
    const response = await axios.get(
      `https://localhost:7040/api/Products/RemoveReservedProduct${productId}`,
      {
        withCredentials: true, // Include session and access cookies
      }
    );
    return response.data; // The server returns the updated basket
  } catch (error) {
    console.error("Error reserving product and fetching basket:", error);
    throw error; // Pass the error up the chain
  }
}

export async function fetchBasket() {
    try {
      const response = await axios.get('https://localhost:7040/api/Products/GetSessionBasket', {
        withCredentials: true, // Include session cookies
      });
      return response.data; // Return the fetched basket data
    } catch (error) {
      console.error('Error fetching basket:', error);
      throw error; // Pass the error up the chain
    }
  }

  export async function fetchAllProducts() {
    try {
      const response = await axios.get('https://localhost:7040/api/Products'); // API call for all products
      return response; // Return the full response
    } catch (error) {
      if (error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
        return {
          status: 0, // Custom status code indicating a connection error
          data: [],  // Return an empty array or suitable fallback data
        };
      }
      console.error('Error fetching all products:', error);
      throw error; // Pass other errors up the chain
    }
  }
  
  
  export async function fetchSearchedProducts(query) {
    try {
      const response = await axios.get(
        `https://localhost:7040/api/Products/filterByName?filter=${query}` // API call for searched products
      );
      return response; // Return the full response
    } catch (error) {
      if (error.message === 'Network Error' || error.code === 'ERR_CONNECTION_REFUSED') {
        return {
          status: 0, // Custom status code indicating a connection error
          data: [],  // Return an empty array or suitable fallback data
        };
      }
      throw error; // Re-throw for other errors
    }
  }
  
  

