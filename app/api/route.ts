import { NextResponse } from "next/server";
import { BASE_URL } from "../modules/constants";

export async function getToken() {
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

    return response.access_token;
  } catch (error) {
    console.error("Error in getToken()", error);
    throw error;
  }
}

export async function GET() {
  try {
    const accessToken = await getToken();

    const url = `${BASE_URL}/project.json`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        cache: "no-store",
      },
    });

    if (!response.ok) {
      console.error("Error: project data fetch failed");
    }

    const projects = await response.json();
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
  }
}
