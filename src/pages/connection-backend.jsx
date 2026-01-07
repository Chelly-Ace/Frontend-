
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;


console.log("API BASE URL:", API_BASE_URL);

const BACKEND_URL_LATEST = `${API_BASE_URL}/latest`;
const BACKEND_URL_DAILY = `${API_BASE_URL}/daily`;
const BACKEND_URL_USERS_LIST = `${API_BASE_URL}/user_list`;
const BACKEND_URL_HISTORY = `${API_BASE_URL}/history`;


const SensorData = ({ username, setLatestData, setDailyData, setUserList, setLatestHistory }) => {

  const [loading, setLoading] = useState(true);

  // Latest Data Endpoint
  useEffect(() => {
    if (!setLatestData || !username) return;

    const fetchData = async () => {
      try {
        console.log("Attempting to fetch latest data for:", username);

        const response = await fetch(BACKEND_URL_LATEST);

        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Received data:", data);

        setLatestData(data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [setLatestData, username]);


  //Daily Data Endpoint
  useEffect(() => {
    if (!setDailyData || !username) return;
    const fetchDaily = async () => {
      try {
        console.log("Fetching Daily Readings for:", username);
        const res = await fetch(`${BACKEND_URL_DAILY}?username=${encodeURIComponent(username)}`);
        const json = await res.json();

        console.log("Received DAILY data:", json);

        if (json.status === "Success") {
          setDailyData(json.data);
        }

      } catch (error) {
        console.error("Error fetching daily data:", error);
      }
    };
    fetchDaily();
    const interval = setInterval(fetchDaily, 3000);
    return () => clearInterval(interval);
  }, [setDailyData, username]);

  //Userlist Endpoint
  useEffect(() => {
    if (!setUserList) return;

    const fetchUsers = async () => {
      try {
        const response = await fetch(BACKEND_URL_USERS_LIST);
        const json = await response.json();

        if (json.users) {
          setUserList(json.users);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchUsers();
    const interval = setInterval(fetchUsers, 3000);
    return () => clearInterval(interval);

  }, [setUserList]);

  //History Endpoint
  useEffect(() => {
    if (!setLatestHistory) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(BACKEND_URL_HISTORY);
        const json = await res.json();
        console.log("Fetched history API:", json);

        if (json.status === "success") {


          setLatestHistory(json.data);


        }
      } catch (error) {
        console.error("Error Fetching history", error);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 3000);
    return () => clearInterval(interval);
  }, [setLatestHistory]);

  return null;
};

export default SensorData;


