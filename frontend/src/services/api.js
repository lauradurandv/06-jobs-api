import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    // Proceed with using the token
    const modifiedToken = token.replace(/"/g, "");
    return modifiedToken;
  } else {
    console.warn("Token is not available. Proceeding without it.");
    // Handle the absence of the token (e.g., redirect to login)
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${base_url}/auth/register`, user);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${base_url}/auth/login`, user);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${base_url}/expenses`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = response.data.expenses;
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};

export const updateExpense = async (rowId, bodyData) => {
  try {
    const response = await axios.patch(
      `${base_url}/expenses/${rowId}`,
      bodyData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    const data = response.data.response;
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};

export const deleteExpense = async (rowId) => {
  try {
    const response = await axios.delete(`${base_url}/expenses/${rowId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = response.data.response;
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};

export const addExpense = async (bodyData) => {
  try {
    const response = await axios.post(`${base_url}/expenses/`, bodyData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = response.data.response;
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response.data.msg,
    };
  }
};
