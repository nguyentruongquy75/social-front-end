import React, { useContext, useEffect, useRef, useState } from "react";
import Peer from "peerjs";

import Card from "../ui/Card";

import styles from "./MessengerVoice.module.css";

import callingSound from "../../assets/sound/calling.mp3";
import receiveSound from "../../assets/sound/receive.mp3";
import socket from "../../socket";
import userContext from "../../context/userCtx";
import { removePopupChat } from "../../redux/updateSlice";
import { useDispatch } from "react-redux";
import { API_chat } from "../../config";

let intervalId = null;
let conn = null;
let autoDisconnectTimeoutId = null;
const timeWaitSecond = 40;

export default function MessengerVoice(props) {
  const context = useContext(userContext);
  const room = props.room;
  const audioRef = useRef();
  const dispatch = useDispatch();

  const [actions, setActions] = useState({
    isMutedMicro: false,
    isMutedSpeaker: false,
    isHangUp: false,
    isTimeout: false,
  });

  const [isPickUp, setIsPickUp] = useState(false);

  const [callTime, setCallTime] = useState(0);
  const [peer, setPeer] = useState(null);
  const [stream, setStream] = useState(null);

  // pickup
  const pickUp = () => setIsPickUp(true);

  // timeout
  const timeout = () =>
    setActions((prev) => ({
      ...prev,
      isTimeout: true,
    }));

  //handup
  const handUp = () => {
    setActions((prev) => ({
      ...prev,
      isHangUp: true,
    }));
  };

  // convert second to string
  const convertCallTime = (second) => {
    if (second < 60) {
      return `0:${second}`;
    }
    const minute = second / 60;
    if (minute < 60) {
      return `${Math.ceil(minute)}:${second % 60}`;
    } else {
      const hour = minute / 60;

      return `${Math.ceil(hour)}:${minute % 60}:${second % 60}`;
    }
  };

  // micro volume
  const toggleMuteMicro = () =>
    setActions((prev) => ({
      ...prev,
      isMutedMicro: !prev.isMutedMicro,
    }));

  // speaker volume
  const toggleMuteSpeaker = () =>
    setActions((prev) => ({
      ...prev,
      isMutedSpeaker: !prev.isMutedSpeaker,
    }));

  // calling sound
  useEffect(() => {
    if (!isPickUp) {
      room.status === "call" && (audioRef.current.src = callingSound);
      room.status === "receive" && (audioRef.current.src = receiveSound);

      audioRef.current.play();
      audioRef.current.loop = true;
    } else {
      audioRef.current.pause();
    }
  }, [isPickUp]);

  // create peer /
  useEffect(async () => {
    if (room.status === "call") {
      try {
        const response = await fetch(`${API_chat}/${room._id}/voice`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: context.id,
          }),
        });

        const text = await response.json();

        console.log(text);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  // mute speaker
  useEffect(() => {
    if (audioRef.current) {
      if (actions.isMutedSpeaker) {
        audioRef.current.muted = true;
      } else {
        audioRef.current.muted = false;
      }
    }
  }, [actions.isMutedSpeaker]);

  // mute mic
  useEffect(() => {
    if (stream) {
      if (actions.isMutedMicro) {
        stream.getAudioTracks().forEach(function (track) {
          track.enabled = false;
        });
      } else {
        stream.getAudioTracks().forEach(function (track) {
          track.enabled = true;
        });
      }
    }
  }, [actions.isMutedMicro]);

  //pick up receiver
  useEffect(() => {
    if (isPickUp && room.status === "receive") {
      const peer = new Peer(context.id);
      setPeer(peer);
      console.log("pickip");

      peer.on("open", (id) => {
        console.log(id);
        peer.on("call", async (call) => {
          conn = call;
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          console.log("receiver", stream);
          setStream(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            if (audioRef.current) {
              audioRef.current.srcObject = remoteStream;
              audioRef.current.play();
            }
          });
        });
      });
      socket.emit("callvoicejoin", {
        user: {
          _id: context.id,
          fullName: context.fullName,
          avatar: context.avatar,
        },
        chatRoom: room,
      });
    }
  }, [isPickUp]);

  // call time
  useEffect(() => {
    if (isPickUp) {
      intervalId = setInterval(() => {
        setCallTime((time) => time + 1);
      }, 1000);
    }
  }, [isPickUp]);

  // close interval
  useEffect(() => {
    if (actions.isHangUp) {
      clearInterval(intervalId);
    }
  }, [actions.isHangUp]);

  // handle hangup
  useEffect(() => {
    let id;
    if (actions.isHangUp) {
      socket.emit("callvoicedisconnect", {
        user: {
          _id: context.id,
          fullName: context.fullName,
          avatar: context.avatar,
        },
        chatRoom: room,
      });

      peer && peer.destroy();
      conn && conn.close();
      setPeer(null);

      // close stream
      stream && stream.getAudioTracks()[0].stop();

      id = setTimeout(() => {
        dispatch(
          removePopupChat({
            _id: room._id,
            type: room.type,
          })
        );
      }, 2000);
    }
    return () => clearTimeout(id);
  }, [actions.isHangUp]);

  // join room noti
  useEffect(() => {
    if (room.status === "call") {
      socket.on(`${room._id}callvoicejoin`, async (user) => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("caller", stream);
        const peer = new Peer(room._id);
        setPeer(peer);
        setStream(stream);
        pickUp();
        peer.on("open", () => {
          const call = peer.call(user._id, stream);
          conn = call;

          call.on("stream", (remoteStream) => {
            if (audioRef.current) {
              audioRef.current.srcObject = remoteStream;
              audioRef.current.play();
            }
          });
        });
      });

      return () => {
        socket.off(`${room._id}callvoicejoin`);
      };
    }
  }, []);

  //out room noti
  useEffect(() => {
    socket.on(`${room._id}callvoicedisconnect`, (user) => {
      handUp();
    });
    return () => {
      socket.off(`${room._id}callvoicedisconnect`);
    };
  }, []);

  // auto disconnect when receiver dont pickup
  useEffect(() => {
    if (room.status === "call") {
      if (!isPickUp) {
        autoDisconnectTimeoutId = setTimeout(() => {
          timeout();
          socket.emit("callvoicedisconnect", {
            user: {
              _id: context.id,
              fullName: context.fullName,
              avatar: context.avatar,
            },
            chatRoom: room,
          });
        }, timeWaitSecond * 1000);
      } else {
        clearTimeout(autoDisconnectTimeoutId);
      }
    }
  }, [isPickUp]);

  return (
    <Card className={styles.card}>
      <audio ref={audioRef} hidden></audio>
      <div className={styles["messenger__info"]}>
        <div className={styles["messenger__img"]}>
          <img
            src={room.image ? room.image : room.user.avatar}
            alt={room.name ? room.name : room.user.fullName}
          />
        </div>
        <span className={styles["messenger__name"]}>
          {!actions.isHangUp && (room.name ? room.name : room.user.fullName)}
          {actions.isHangUp &&
            !actions.isTimeout &&
            "Cuộc trò chuyện đã kết thúc"}
          {actions.isHangUp && actions.isTimeout && "Người nhận không nghe máy"}
        </span>
        <span className={styles["messenger__time"]}>
          {!isPickUp && (room.status === "call" ? "Ringing" : "Đang gọi bạn")}
          {isPickUp && convertCallTime(callTime)}
        </span>
      </div>
      {!actions.isHangUp && (
        <div className={styles["messenger__actions"]}>
          <div className={styles["messenger__sound"]}>
            <div
              className={`${styles["messenger__action"]} ${
                actions.isMutedMicro
                  ? styles["messenger__action--disabled"]
                  : ""
              }`}
              onClick={toggleMuteMicro}
            >
              {!actions.isMutedMicro && <i className="fas fa-microphone"></i>}
              {actions.isMutedMicro && (
                <i className="fas fa-microphone-slash"></i>
              )}
            </div>
            <div
              className={`${styles["messenger__action"]} ${
                actions.isMutedSpeaker
                  ? styles["messenger__action--disabled"]
                  : ""
              }`}
              onClick={toggleMuteSpeaker}
            >
              {!actions.isMutedSpeaker && <i className="fas fa-volume-up"></i>}
              {actions.isMutedSpeaker && <i className="fas fa-volume-mute"></i>}
            </div>
          </div>
          <div className={styles["messenger__call"]}>
            {room.status !== "call" && !isPickUp && (
              <div
                className={`${styles["messenger__action"]} ${styles["messenger__action--pickup"]}`}
                onClick={pickUp}
              >
                <i className="fas fa-phone-alt"></i>
              </div>
            )}

            <div
              className={`${styles["messenger__action"]} ${styles["messenger__action--hangup"]}`}
              onClick={handUp}
            >
              <i className="fas fa-phone-alt"></i>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
