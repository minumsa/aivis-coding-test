import { BASE_URL } from "./constants";
import { ProjectList } from "./types";

async function getToken() {
  require("dotenv").config();

  const baseUrl = `${BASE_URL}/authenticate`;
  const username = process.env.USER_NAME;
  const password = process.env.PASSWORD;

  try {
    const accessTokenResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      cache: "no-store",
    });

    if (!accessTokenResponse.ok) {
      console.error("Error: Access token fetch failed", accessTokenResponse.statusText);
      throw new Error("Failed to fetch access token");
    }

    const response = await accessTokenResponse.json();
    const token = response.token;

    return token;
  } catch (error) {
    console.error("Error in getToken()", error);
    throw error;
  }
}

export const fetchProjectList = async (): Promise<ProjectList[]> => {
  const url = `${BASE_URL}/project.json`;
  const accessToken = await getToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch project list");
    }

    const { collection } = await response.json();
    return collection;
  } catch (error) {
    throw new Error("Failed to fetch project list");
  }
};
