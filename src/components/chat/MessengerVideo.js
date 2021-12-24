import React, { useRef, useState, useEffect, useContext } from "react";

import Card from "../ui/Card";

import socket from "../../socket";
import Peer from "peerjs";
import { API_chat } from "../../config";

import callSound from "../../assets/sound/calling.mp3";
import receiveSound from "../../assets/sound/receive.mp3";

import styles from "./MessengerVideo.module.css";
import userContext from "../../context/userCtx";
import { useDispatch } from "react-redux";
import { removePopupChat } from "../../redux/updateSlice";

let conn = null;

export default function MessengerVideo(props) {
  const context = useContext(userContext);
  const dispatch = useDispatch();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const audioRef = useRef();
  const room = props.room;
  const [actions, setActions] = useState({
    isHangUp: false,
    isPickUp: false,
    isMutedMic: false,
    isOffCam: false,
  });
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peer, setPeer] = useState(null);

  const hangUp = () =>
    setActions((prev) => ({
      ...prev,
      isHangUp: true,
    }));

  const pickUp = () =>
    setActions((prev) => ({
      ...prev,
      isPickUp: true,
    }));

  const toggleMuteMicro = () =>
    setActions((prev) => ({
      ...prev,
      isMutedMic: !prev.isMutedMic,
    }));

  const toggleCam = () =>
    setActions((prev) => ({
      ...prev,
      isOffCam: !prev.isOffCam,
    }));

  // sound
  // calling sound
  useEffect(() => {
    if (!actions.isPickUp) {
      room.status === "call" && (audioRef.current.src = callSound);
      room.status === "receive" && (audioRef.current.src = receiveSound);

      audioRef.current.play();
      audioRef.current.loop = true;
    } else {
      audioRef.current.pause();
    }
  }, [actions.isPickUp]);

  // get local stream of caller
  useEffect(async () => {
    if (room.status === "call") {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
    }
  }, []);

  // mute micro handler
  useEffect(() => {
    if (localStream) {
      if (actions.isMutedMic) {
        localStream.getAudioTracks()[0].enabled = false;
      } else {
        localStream.getAudioTracks()[0].enabled = true;
      }
    }
  }, [actions.isMutedMic]);

  // mute cam handler
  useEffect(() => {
    if (localStream) {
      if (actions.isOffCam) {
        localStream.getVideoTracks()[0].enabled = false;
      } else {
        localStream.getVideoTracks()[0].enabled = true;
      }
    }
  }, [actions.isOffCam]);

  // create peer
  useEffect(async () => {
    if (room.status === "call") {
      try {
        const response = await fetch(`${API_chat}/${room._id}/video`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: context.id,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  //pick up receiver
  useEffect(() => {
    if (room.status === "receive" && actions.isPickUp) {
      const peer = new Peer(context.id);
      setPeer(peer);

      peer.on("open", () => {
        peer.on("call", async (call) => {
          console.log("receivecall");
          conn = call;
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });

          console.log("stream", stream);
          setLocalStream(stream);
          call.answer(stream);
          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        });
      });
      socket.emit("callvideojoin", {
        user: {
          _id: context.id,
          fullName: context.fullName,
          avatar: context.avatar,
        },
        chatRoom: room,
      });
    }
  }, [actions.isPickUp]);

  // handle hangup
  useEffect(() => {
    let id;
    if (actions.isHangUp) {
      socket.emit("callvideodisconnect", {
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
      localStream &&
        localStream.getVideoTracks().forEach((track) => {
          track.stop();
        });

      localStream &&
        localStream.getAudioTracks().forEach((track) => {
          track.stop();
        });

      setLocalStream(null);
      setRemoteStream(null);

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
      socket.on(`${room._id}callvideojoin`, (user) => {
        const peer = new Peer(room._id);
        setPeer(peer);
        pickUp();
        peer.on("open", async () => {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          setLocalStream(stream);
          const call = peer.call(user._id, stream);
          conn = call;

          call.on("stream", (remoteStream) => {
            setRemoteStream(remoteStream);
          });
        });
      });

      return () => {
        socket.off(`${room._id}callvideojoin`);
      };
    }
  }, []);

  //out room noti
  useEffect(() => {
    socket.on(`${room._id}callvideodisconnect`, (user) => {
      hangUp();
    });
    return () => {
      socket.off(`${room._id}callvideodisconnect`);
    };
  }, []);

  // load localstream to video tag
  useEffect(() => {
    console.log("localstream", localStream);
    localVideoRef.current && (localVideoRef.current.srcObject = localStream);
  }, [localStream]);

  console.log("localstream", actions, localStream);

  // load remote to video tag

  useEffect(() => {
    remoteVideoRef.current && (remoteVideoRef.current.srcObject = remoteStream);
  }, [remoteStream]);

  return (
    <Card className={styles.card}>
      <audio ref={audioRef}></audio>
      {room.status === "receive" && !actions.isPickUp && (
        <div className={styles["messenger__receive"]}>
          <div className={styles["messenger__info"]}>
            <div className={styles["messenger__img"]}>
              <img
                src={room.image ? room.image : room.user.avatar}
                alt={room.name ? room.name : room.user.fullName}
              />
            </div>
            <span className={styles["messenger__name"]}>
              {room.name ? room.name : room.user.fullName}
            </span>
            <span className={styles["messenger__time"]}>
              Video calling on messenger ...
            </span>
          </div>
          <div className={styles["messenger__actions"]}>
            <div
              className={`${styles["messenger__action"]} ${styles["messenger__action--hangup"]}`}
              onClick={hangUp}
            >
              <i className="fas fa-phone-alt"></i>
            </div>
            <div
              className={`${styles["messenger__action"]} ${styles["messenger__action--pickup"]}`}
              onClick={pickUp}
            >
              <i className="fas fa-video"></i>
            </div>
          </div>
        </div>
      )}

      {(actions.isPickUp || room.status === "call") && (
        <div className={styles["messenger__video"]}>
          <div className={styles["video__container"]}>
            {(!actions.isPickUp || actions.isHangUp) && (
              <div className={styles["video__container-wait"]}>
                {!actions.isPickUp && "Đang chờ kết nối ..."}
                {actions.isHangUp && "Cuộc trò chuyện đã kết thúc ..."}
              </div>
            )}
            <video
              className={styles["video__remote"]}
              ref={remoteVideoRef}
              autoPlay
            ></video>
            <video
              className={styles["video__local"]}
              autoPlay
              ref={localVideoRef}
              muted
            ></video>
          </div>
          <div className={styles["messenger__video-actions"]}>
            <div
              className={`${styles["messenger__action"]} ${
                actions.isMutedMic
                  ? styles["messenger__video-action--disabled"]
                  : styles["messenger__video-action--active"]
              }`}
              onClick={toggleMuteMicro}
            >
              {!actions.isMutedMic && <i className="fas fa-microphone"></i>}
              {actions.isMutedMic && (
                <i className="fas fa-microphone-slash"></i>
              )}
            </div>
            <div
              className={`${styles["messenger__action"]} ${styles["messenger__action--hangup"]}`}
              onClick={hangUp}
            >
              <i className="fas fa-phone-alt"></i>
            </div>
            <div
              className={`${styles["messenger__action"]} ${
                actions.isOffCam
                  ? styles["messenger__video-action--disabled"]
                  : styles["messenger__video-action--active"]
              }`}
              onClick={toggleCam}
            >
              {!actions.isOffCam && <i className="fas fa-video"></i>}
              {actions.isOffCam && <i className="fas fa-video-slash"></i>}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
