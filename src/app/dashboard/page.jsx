"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import { RaceBy } from "@uiball/loaders";
import RoomRow from "./components/roomRow";
import {
  BsPatchQuestionFill,
  BsPatchCheckFill,
  BsPatchExclamationFill,
  BsPatchMinusFill,
} from "react-icons/bs";
export default function DashBoard() {
  const [rooms, setrRooms] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Socket connection with the node server
    const socket = new WebSocket("ws://localhost:3001");

    socket.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);

        const deviceId = newData.payload.deviceId;

        setDevices((prevDevices) => {
          const updatedDevices = prevDevices.map((device) => {
            if (device.id === deviceId) {
              // Update the existing device object with new data including "type"
              return { ...device, data: newData };
            }
            return device;
          });

          if (!prevDevices.some((device) => device.id === deviceId)) {
            // Add the device data as an array with a single element
            updatedDevices.push({ id: deviceId, data: newData });
          }

          return updatedDevices;
        });
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    //api call to get the rooms
    const apiUrl =
      "https://dev.ohmcare.tech:3030/62f8d1f802a1c601e01a4a14/rooms";
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4ZDFmODAyYTFjNjAxZTAxYTRhMWQiLCJhY2NvdW50Ijp7Il9pZCI6IjYyZjhkMWY4MDJhMWM2MDFlMDFhNGExYiIsInNpdGUiOiI2MmY4ZDFmODAyYTFjNjAxZTAxYTRhMTQiLCJpc1ZhbGlkIjp0cnVlLCJ2YWxpZGl0eURhdGUiOiIyNTUwNDkxNjA0Njg1IiwiX192IjowfSwiaWF0IjoxNjk0MjU2NzQwfQ.kK0dedtLoJvy2BVs9-oRGWdKU7Vk_Kp2G_orWaVPgAs";

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setrRooms(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center max-w-container mx-auto py-24 px-12">
        <RaceBy size={80} lineWeight={5} speed={0.3} color="#4e7a9a" />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-container mx-auto p-12">
      <div className=" w-full">
        <h1 className="text-center text-5xl text-primary font-bold mb-8">
          Dashboard
        </h1>
        <div className="flex justify-end items-start mb-8">
          <div className="border shadow-lg px-4 py-2 rounded-xl">
            <ul className="text-xs flex flex-col gap-y-1 text-gray-700 capitalize font-bold">
              <li className="flex gap-x-5 items-center justify-between ">
                <span>Unknown </span>
                <BsPatchQuestionFill size="16" />
              </li>
              <li className="flex gap-x-5 items-center justify-between text-xs ">
                <span>Fall </span>
                <BsPatchExclamationFill color="red" size="16" />
              </li>
              <li className="flex gap-x-5 items-center justify-between text-xs ">
                <span>Presence (Not sure)</span>
                <BsPatchMinusFill color="blue" size="16" />
              </li>
              <li className="flex gap-x-5 items-center justify-between text-xs ">
                <span>Presence (sure) </span>
                <BsPatchCheckFill color="green" size="16" />
              </li>
            </ul>
          </div>
        </div>
        <div>
          {rooms.map((room) => (
            <RoomRow key={room._id} room={room} devices={devices} />
          ))}
        </div>
      </div>
    </main>
  );
}
