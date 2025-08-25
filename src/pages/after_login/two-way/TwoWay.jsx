//components
import { io } from "socket.io-client";
import TwoWayVideo from "./components/TwoWayVideo";
import { useContext, useEffect, useState } from "react";
import { Device } from "mediasoup-client";
import toast, { Toaster } from "react-hot-toast";
import "./TwoWay.css";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import { CoursesData } from "../../../context/courses/Courses";
import { FaArrowLeft } from "react-icons/fa6";
import TwowayTabs from "./Twoway-tabs/TwowayTabs.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

let dayjs = require("dayjs");

//Socket Connection with mediasoup
// const socket = io.connect("http://localhost:3003/mediasoup", {
//     transports: ["websocket"],
// });
const socket = io.connect('https://twoway-backend-prod.sdcampus.com/mediasoup', { transports: ['websocket'] });
// const socket = io.connect("https://two-way.sdcampus.com/mediasoup", {
//     transports: ["websocket"],
// });

const TwoWay = () => {

    const [isCameraOn, setIsCameraOn] = useState(false)
    const [isMicOn, setIsMicOn] = useState(false)


    //FullScreen
    //Full Screen (f11)
    const onDoubleClickHandler = () => {
        var elem = document.getElementById("root");
        if (!document.fullscreenElement) { openFullscreen() }
        else {
            closeFullscreen()
        }
    }



    /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    function openFullscreen() {
        var elem = document.getElementById("root");
        var doc = window.document;
        var elem = doc.documentElement;

        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }


    const location = useLocation()
    // let lectureDetails = location?.state?.lectureDetails

    const { lectureId, batchSlug } = useParams()

    const { setTranportState, tranportState, getLectureById, lectureDetails, setLoadingForTwoWay, loadingForTwoWay } = useContext(CoursesData);

    //device

    const [devicee, setDevicee] = useState();

    //chat tabs
    const [tabs, setTabs] = useState({
        chat: true,
        doubt: {
            text: false,
            video: false,
        },
        poll: false,
    });

    //user data
    const name = JSON.parse(localStorage.getItem("details"))?.name;
    const userId = JSON.parse(localStorage.getItem("details")).id;

    const [isStreamStarted, setStreamStarted] = useState(false);
    const [rtpCapabilitiesState, setRtpCapablitiesState] = useState(false);
    const [videoProducerState, setVideoProducerState] = useState();
    const [producerTransportState, setProducerState] = useState("");

    //self produce
    const [isProduceStart, setIsProduceStart] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    // calc width
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //params
    let params = {
        kind: "video",
        rtpParameters: {
            mid: "1",
            codecs: [
                {
                    mimeType: "video/VP8",
                    payloadType: 101,
                    clockRate: 90000,
                    rtcpFeedback: [
                        { type: "nack" },
                        { type: "nack", parameter: "pli" },
                        { type: "ccm", parameter: "fir" },
                        { type: "goog-remb" },
                    ],
                },
                {
                    mimeType: "video/rtx",
                    payloadType: 102,
                    clockRate: 90000,
                    parameters: { apt: 101 },
                },
            ],
            headerExtensions: [
                {
                    id: 2,
                    uri: "urn:ietf:params:rtp-hdrext:sdes:mid",
                },
                {
                    id: 3,
                    uri: "urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id",
                },
                {
                    id: 5,
                    uri: "urn:3gpp:video-orientation",
                },
                {
                    id: 6,
                    uri: "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time",
                },
            ],
            encodings: [
                { rid: "r0", active: true, maxBitrate: 100000 },
                { rid: "r1", active: true, maxBitrate: 300000 },
                { rid: "r2", active: true, maxBitrate: 900000 },
            ],
            rtcp: {
                cname: "Zjhd656aqfoo",
            },
        },
    };

    //variables
    let rtpCapabilities;
    let device;
    let audioParams;
    let videoParams = { params };
    let localVideo;
    let myVideo;
    let streamOfUser;
    let producerTransport;
    let consumerTransports = [];
    let consumingTransports = [];
    let audioProducer;
    let videoProducer;
    let videoContainer;
    let consumerTransport;

    //getting lecture/room details
    const [consumerTransportState, setConsumerTranportState] = useState();
    const [allLecture, setAllLecture] = useState([]);
    // const [lectureDetails, setLectureDetails] = useState([]);
    const getLeture = async () => {
        const token = localStorage.getItem("token");
        const fullResponse = await fetch(
            `${process.env.REACT_APP_PRODUCTION_LIVE_URL}/adminPanel/getLecturesOfSubject?subjectId=6516a654955b5c9f71c99365&batchId=655afa65b3cfc50b49d035cc`,

            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                },
            }
        );
        const responseJson = await fullResponse.json();
        if (responseJson.status) {
            setAllLecture(responseJson);
        } else {
            // toast.error("No Lectures for Today");
        }
    };
    useEffect(() => {
        getLectureById(lectureId, batchSlug, "two-way");

        getLeture();
    }, []);

    useEffect(() => {
        socket.on("connection-success", ({ socketId }) => { });
        getLectureById(lectureId, batchSlug)
        // joinRoom()
        // getLocalStream()
    }, [])
    const getLocalStream = () => {
        navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {

                aspectRatio: 1.77777777778
            },

        })
            .then(streamSuccess)
            .catch(error => {
            })
    }
    const streamSuccess = (stream) => {
        let myVideo = document.getElementById('myVideo')
        myVideo.srcObject = stream;

        audioParams = { track: stream.getAudioTracks()[0], ...audioParams };
        videoParams = { track: stream.getVideoTracks()[0], ...videoParams };
        handleCameraOff()
        handleMicOff()
        // createDevice()
        createSendTransport();
        // joinRoom()
    };

    const joinRoom = () => {

        socket.emit(
            "joinRoom",
            {
                roomName: [lectureDetails?.roomDetails?.id ?? ""],
                name: JSON.parse(localStorage.getItem("details"))?.name,
                isAdmin: false,
                // adminId: socket.id
                roomId: lectureDetails?.roomDetails?.id ?? "",
                userId: JSON.parse(localStorage.getItem("details"))?.id,
                mentor: "mentor",
                batch: "batch",
                lectureId: lectureDetails._id,
                role: "user",
            },
            (data) => {
                rtpCapabilities = data.rtpCapabilities;
                setRtpCapablitiesState(data.rtpCapabilities);
                createDevice();
                socket.emit(
                    "doubt-session-information",
                    { lectureId: lectureDetails?._id },
                    (status) => {
                        setDoubtEnabled(status?.doubtsEnabled);
                        if (status?.doubtsEnabled) {
                            toast.success("Doubts enabled...");
                        }
                    }
                );
            }
        );
    };

    async function createDevice() {
        try {
            device = new Device();

            setDevicee(device);
            await device.load({
                routerRtpCapabilities: rtpCapabilities,
            });

            getProducers();
            // getLocalStream()
            // createSendTransport()
        } catch (error) {
            //console.log(error);
            if (error.name === "UnsupportedError")
                console.warn("browser not supported");
        }
    }


    const createSendTransport = async () => {
        // createDevice()
        let capa;
        socket.emit("getRtpCapabilities", {}, async (data) => {

            device = new Device();
            await device.load({
                // see getRtpCapabilities() below
                routerRtpCapabilities: data?.rtpa,
            });
            // //console.log('Device in send', device)
            socket.emit(
                "createWebRtcTransport",
                { consumer: false },
                async ({ params }) => {
                    // The server sends back params needed
                    // to create Send Transport on the client side
                    // //console.log("Calll in web rtc");
                    if (params.error) {
                        // //console.log(params.error);
                        return;
                    }


                    // creates a new WebRTC Transport to send media
                    // based on the server's producer transport params
                    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions

                    // //console.log("DEVICEEE", device);
                    producerTransport = device.createSendTransport(params);
                    // setProducerState(producerTransport)
                    setTranportState(producerTransport);

                    // //console.log('Line 359', producerTransport)
                    // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
                    // this event is raised when a first call to transport.produce() is made
                    // see connectSendTransport() below
                    producerTransport.on(
                        "connect",
                        async ({ dtlsParameters }, callback, errback) => {
                            try {
                                socket.emit("transport-connect", {
                                    dtlsParameters,
                                });

                                // Tell the transport that parameters were transmitted.
                                callback();
                            } catch (error) {
                                errback(error);
                            }
                        }
                    );

                    producerTransport.on(
                        "produce",
                        async (parameters, callback, errback) => {
                            try {
                                // tell the server to create a Producer
                                // with the following parameters and produce
                                // and expect back a server side producer id
                                // see server's socket.on('transport-produce', ...)

                                await socket.emit(
                                    "transport-produce",
                                    {
                                        kind: parameters.kind,
                                        rtpParameters: parameters.rtpParameters,
                                        appData: parameters.appData,
                                    },
                                    ({ id, producersExist }) => {
                                        // Tell the transport that parameters were transmitted and provide it with the
                                        // server side producer's id.
                                        callback({ id });

                                        // producerTransport.produce(videoParams);
                                        // if producers exist, then join room
                                        // //console.log('pproducer,exist', producersExist)
                                        if (producersExist) {
                                            // setOnlyProducer(false)
                                            // getProducers()
                                        } else {
                                            // setOnlyProducer(true)
                                        }
                                    }
                                );
                            } catch (error) {
                                errback(error);
                            }
                        }
                    );

                    connectSendTransport();
                }
            );
        });
        // //console.log("RTPA", device);

        // see server's socket.on('createWebRtcTransport', sender?, ...)
        // this is a call from Producer, so sender = true
    };

    const connectSendTransport = async () => {
        // we now call produce() to instruct the producer transport
        // to send media to the Router
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
        // this action will trigger the 'connect' and 'produce' events above

        if (audioParams?.track?.readyState == "ended") {
            // getLocalStream()
        }

        // //console.log('line437', producerTransport)
        audioProducer = await producerTransport.produce(audioParams);
        // //console.log('Video Params', videoParams)
        videoProducer = await producerTransport.produce(videoParams);


        // socket.emit("audio-pause", { id: socket.id });
        setVideoProducerState(videoProducer);

        // //console.log('Video Producer=>', videoProducer)
        // setVideoProducerId(videoProducer.id)
        // setAudioProducerId(audioProducer.id)
        // //console.log('Produced VideoPro', videoProducer)
        audioProducer.on("trackended", () => {
            //console.log("audio track ended");

            // close audio track
        });

        audioProducer.on("transportclose", () => {
            //console.log("audio transport ended");

            // close audio track
        });

        videoProducer.observer.on("pause", () => {
            //console.log("front end paused");
        });
        videoProducer.on("trackended", () => {
            //console.log("video track ended");

            // close video track
        });

        videoProducer.on("transportclose", () => {
            //console.log("video transport ended");

            // close video track
        });
        videoProducer.on("paused", () => {
            //console.log("PAUSEDDD");
        });
    };

    const getProducers = () => {
        socket.emit("getProducers", "", (producerIds) => {


            if (producerIds)
                producerIds.forEach((id) => {
                    if (id?.isAdmin) {

                        setStreamStarted(true);
                        signalNewConsumerTransport(id.producer);
                    }
                });
        });
    };
    const signalNewConsumerTransport = async (remoteProducerId) => {

        //check if we are already consuming the remoteProducerId

        if (consumingTransports.includes(remoteProducerId)) {

            return
        };
        consumingTransports.push(remoteProducerId);

        await socket.emit(
            "createWebRtcTransport",
            { consumer: true },
            ({ params }) => {
                // The server sends back params needed
                // to create Send Transport on the client side
                // //console.log('DEVICE', device.sctpCapabilities)
                if (params.error) {
                    //console.log(params.error);
                    return;
                }


                // consumerTransport
                socket.emit("getRtpCapabilities", {}, async (data) => {

                    device = new Device();
                    await device.load({
                        // see getRtpCapabilities() below
                        routerRtpCapabilities: data?.rtpa,
                    });

                    if (device?.loaded) {
                        if (device) {
                            try {

                                consumerTransport = device.createRecvTransport(params);
                                setConsumerTranportState(consumerTransport)
                                // //console.log('Consumer transport =. inside function', consumerTransport)
                            } catch (error) {
                                // exceptions:
                                // {InvalidStateError} if not loaded
                                // {TypeError} if wrong arguments.
                                //console.log(error);
                                return;
                            }

                            consumerTransport.on(
                                "connect",
                                async ({ dtlsParameters }, callback, errback) => {
                                    try {
                                        // Signal local DTLS parameters to the server side transport
                                        // see server's socket.on('transport-recv-connect', ...)
                                        await socket.emit("transport-recv-connect", {
                                            dtlsParameters,
                                            serverConsumerTransportId: params.id,
                                        });
                                        // setOnlyProducer(false)
                                        // Tell the transport that parameters were transmitted.
                                        callback();
                                    } catch (error) {
                                        // setOnlyProducer(true)
                                        // Tell the transport that something was wrong
                                        errback(error);
                                    }
                                }
                            );

                            connectRecvTransport(consumerTransport, remoteProducerId, params.id);
                        } else {
                            //console.log("device not ready");
                        }
                    }
                })
            }
        );
    };

    // //console.log('Consumer Transport', consumerTransportState)

    const connectRecvTransport = async (
        consumerTransport,
        remoteProducerId,
        serverConsumerTransportId
    ) => {
        // for consumer, we need to tell the server first
        // to create a consumer based on the rtpCapabilities and consume
        // if the router can consume, it will send back a set of params as below
        // //console.log('Remote Producer Id', remoteProducerId)
        // const data = { producerId: remoteProducerId }
        // //console.log('line327', data)

        await socket.emit(
            "consume",
            {
                rtpCapabilities: device.rtpCapabilities,
                remoteProducerId,
                // remoteProducerId: {
                //     ...data
                // },
                serverConsumerTransportId,
            },
            async ({ params }) => {
                if (params.error) {
                    //console.log("Cannot Consume");
                    return;
                }

                // then consume with the local consumer transport
                // which creates a consumer

                // //console.log('In Connect Recv', consumerTransport)
                // //console.log('In Connect Recv=>>', consumerTransportState)
                const consumer = await consumerTransport.consume({
                    id: params.id,
                    producerId: params.producerId,
                    kind: params.kind,
                    rtpParameters: params.rtpParameters,
                });
                consumer.on("producerpause", () => {
                    //console.log("front end paused");
                });
                consumer.observer.on("pause", () => {
                    //console.log("front end paused");
                });

                consumerTransports = [
                    ...consumerTransports,
                    {
                        consumerTransport,
                        serverConsumerTransportId: params.id,
                        producerId: remoteProducerId,
                        consumer,
                    },
                ];

                //console.log('Params', params)
                // //console.log('consumer producer id', consumer)
                // create a new div element for the new consumer media
                videoContainer = document.getElementById("videoContainer");
                const newElem = document.createElement("div");
                newElem.style.position = "relative";
                const host = document.createElement("h5");
                const pip = document.createElement("button");
                // const username = document.createElement('h5')

                newElem.setAttribute("id", `td-${remoteProducerId}`);

                // setRemoteProucerId(remoteProducerId)
                if (params.kind == "audio") {
                    //append to the audio container
                    newElem.innerHTML =
                        '<audio id="' + remoteProducerId + '" autoplay></audio>';
                } else {
                    //append to the video container
                    newElem.setAttribute("class", "remoteVideo");
                    // newElem.addEventListener('click', handleClick(remoteProducerId))
                    if (params.isAdmin) {
                        newElem.innerHTML =
                            '<video id = "' +
                            remoteProducerId +
                            '" autoplay class="video" ></video>';
                        host.innerText = "Host";
                        // host.innerText = params.name
                        host.style.position = "absolute";
                        host.style.color = "#ffffff8f";
                        host.style.top = "10px";
                        host.style.right = "30px";
                        host.style.background = "#80808073";
                        // host.style.padding = '2px 5px'
                        host.style.borderRadius = "5px";

                        pip.innerText = "Pip";
                        pip.style.position = "absolute";
                        pip.style.top = "10px";
                        pip.style.right = "10px";
                        pip.style.cursor = "pointer";
                        pip.style.border = "none";
                        pip.style.background = "lightgray";
                        pip.style.borderRadius = "5px";
                        pip.style.fontSize = "15px";

                        // newElem.appendChild(host)
                        // newElem.appendChild(pip)
                    } else {
                        newElem.innerHTML =
                            '<video id = "' +
                            remoteProducerId +
                            '" autoplay class="video" ></video>';
                        host.innerText = params.name;
                        host.style.position = "absolute";
                        host.style.color = "#ffffff8f";
                        host.style.top = "10px";
                        host.style.right = "30px";
                        host.style.background = "#80808073";
                        // host.style.padding = '2px 5px'
                        host.style.borderRadius = "5px";
                        pip.innerText = "Pip";
                        pip.style.position = "absolute";
                        pip.style.top = "10px";
                        pip.style.right = "10px";
                        pip.style.cursor = "pointer";
                        pip.style.border = "none";
                        pip.style.background = "lightgray";
                        pip.style.borderRadius = "5px";
                        pip.style.fontSize = "15px";

                        // newElem.appendChild(host)
                        // newElem.appendChild(pip)
                    }
                }

                videoContainer?.appendChild(newElem);
                // videoContainer.appendChild(host)

                // destructure and retrieve the video track from the producer
                // //console.log('Producer consuner', consumer)

                const { track } = consumer;

                // //console.log('producer Track', track)
                // pip.addEventListener('click', () => { handleClick(remoteProducerId) })
                document.getElementById(remoteProducerId).srcObject = new MediaStream([
                    track,
                ]);
                // //console.log(document?.getElementById(`td-${remoteProducerId}`))
                socket.emit("consumer-resume", {
                    serverConsumerId: params.serverConsumerId,
                });
            }
        );
    };

    // server informs the client of a new producer just joined
    socket.on("new-producer", ({ producerId, socketId, name, isAdmin }) => {

        if (isAdmin) {

            setStreamStarted(true);
            signalNewConsumerTransport(producerId);
        }
    });

    //Producer-closed
    socket.on("producer-closed", ({ remoteProducerId }) => {
        setStreamStarted(false);
        // //console.log("producerClosed");
        if (consumerTransports.length !== 0) {
            console.log('came here after closing')
            const producerToClose = consumerTransports.find(
                (transportData) => transportData.producerId === remoteProducerId
            );
            producerToClose?.consumerTransport.close();
            producerToClose?.consumer.close();
            // setOnlyProducer(false)

            // remove the consumer transport from the list
            consumerTransports = consumerTransports.filter(
                (transportData) => transportData.producerId !== remoteProducerId
            );

            // remove the video div element
            if (document?.getElementById(`td-${remoteProducerId}`)) {
                videoContainer?.removeChild(
                    document?.getElementById(`td-${remoteProducerId}`)
                );
            }
        } else {
            // setOnlyProducer(true)
            console.log("no consmers to close");
        }
    });
    const curr_date = dayjs().format("DD-MM-YYYY HH:mm:ss");

    // //console.log("Lecture Details=>", lectureDetails);

    //device states
    const [isMic, setIsMic] = useState(false);
    const [isVideo, setIsVideo] = useState(false);

    const handleVideo = async () => {
        // if (tranportState?.isClosed()) {
        setIsVideo(!isVideo);
        setIsProduceStart(true);
        getLocalStream();

        // createSendTransport()

        // tranportState.produce(videoParams)
        // }
    };

    //stop produce
    // //console.log("Transport==>Before==>", tranportState);
    const stopProduce = async () => {
        // //console.log("Transport==>==>", tranportState);
        // await videoProducerState.close()
        await tranportState?.close();
        setIsProduceStart(false);
        document?.getElementById('get-producer')?.click()
    };
    // //console.log("Transport==>After==>", producerTransportState);

    //Recieving message
    const [msgList, setMsgList] = useState([]);
    useEffect(() => {
        socket.on("recieve-message", (data) => {
            // //console.log(data);
            setMsgList((prev) => [...prev, data]);
        });
    }, []);

    //sending message
    const sendMessage = (info) => {
        socket.emit("send-message", info, (data) => {
            // //console.log("MSGGG=>", data);
        });
    };

    //doubt acknowledgement
    const [doubtsEnabled, setDoubtEnabled] = useState(false);
    useEffect(() => {
        socket.on("informationAboutDoubtsStatus", (data) => {
            // //console.log("doubt status", data);
            setDoubtEnabled(data?.status);
            if (data?.status) {
                toast.success("Doubts Enabled, You Can Ask Your Doubts...");
            }
            //  else {
            //     toast.error("Doubts disabled till next doubt session");
            // }
        });
    }, []);

    //Participants
    const [participantList, setParticipantList] = useState([]);
    useEffect(() => {
        socket.on("participants", (data) => {
            setParticipantList(data);
            // //console.log("Participants", data);
        });
    }, []);

    // //console.log('line764  above function', producerTransportState)
    //admin access
    // let transporttt = producerTransportState
    const handlingVideoFromAdmin = async (data) => {
        if (data?.for == "video") {
            if (data?.status) {
                // //console.log('prod==;;;', producerTransportState)
                // await producerTransportState.produce(videoProducerState)
                // //console.log('came here')
                document.getElementById("produce-video").click();
                // handleVideo()
            } else if (!data?.status) {
                // //console.log("came", data);
                document.getElementById("stop-produce").click();
                // stopProduce()
                // //console.log('line764', producerTransportState)
                // if (producerTransportState == '' || producerTransportState == undefined) {
                //     //console.log('Not Producing')
                // } else {

                // }

                // producerTransportState?.close()
            }
        } else if (data?.for == "audio") {
            // if (!data?.status) {
            // socket.emit("audio-pause", { id: socket.id });
            // } else {
            //     socket.emit('audio-resume', { id: socket.id })
            // }
        }
    };

    useEffect(() => {
        socket.on('permission-admin-to-user', (data) => {
            // //console.log('admin access', data)
            if (data?.status) {
                handlingVideoFromAdmin(data)
            }
            else if (!data?.status) {
                if (data?.for == 'video') {
                    // //console.log('Here')
                    document.getElementById("stop-produce").click();
                }
            }
        })
    }, [])

    //start class
    const [startClassModal, setStartClassModal] = useState(true)

    //exit class
    const [exitClassModal, setExitClassModal] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (!loadingForTwoWay) {

            // document?.getElementById('join-button').click()
        }
        socket.on('controlling-camera', (data) => {
            if (data?.cameraOn) {
                handleCameraOn()
            }
            else {
                handleCameraOff()
            }
        })
        socket.on('controlling-mic', (data) => {
            if (data?.micOn) {
                handleMicOn()
            }
            else {
                handleMicOff()
            }
        })


    }, [loadingForTwoWay])
    // //console.log('lecture details via api', lectureDetails?._id)



    //camera toggle
    const handleCameraOff = () => {
        setIsCameraOn(false)

        const audioTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'audio');

        socket.emit('user-controls-status', ({ userId: socket.id, isCameraOn: false, isMicOn: audioTrack?.enabled, for: 'video', roomName: [lectureDetails?.roomDetails?.id ?? ""], roomid: lectureDetails?.roomDetails?.id ?? "", userid: JSON.parse(localStorage.getItem("details"))?.id, }))
        const videoTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'video');
        videoTrack.enabled = false;

        // socket.emit('producer-paused', ({ videoProducerId: videoProducerId, videoStatus: true }))
        // const localVideoContainer = document.getElementById('localVideoContainer')
        // localVideoContainer
        //     .removeChild(document.getElementById('localVideoThumbnail'))

        document.getElementById('myVideo').style.display = ''
        // videoProducer.resume()
        // console.log('VIDEO PRODUCER RESUME', videoProducer)
        // socket.emit('producer-resume')
    }
    const handleMicOff = () => {
        setIsMicOn(false)
        const videoTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'video');
        console.log("Mic off time camera", isCameraOn)
        socket.emit('user-controls-status', ({ userId: socket.id, isCameraOn: videoTrack?.enabled, isMicOn: false, for: 'video', roomName: [lectureDetails?.roomDetails?.id ?? ""], roomid: lectureDetails?.roomDetails?.id ?? "", userid: JSON.parse(localStorage.getItem("details"))?.id, }))

        const audioTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'audio');
        audioTrack.enabled = false;

        // socket.emit('producer-paused', ({ videoProducerId: videoProducerId, videoStatus: true }))
        // const localVideoContainer = document.getElementById('localVideoContainer')
        // localVideoContainer
        //     .removeChild(document.getElementById('localVideoThumbnail'))

        // document.getElementById('myVideo').style.display = ''
        // videoProducer.resume()
        // console.log('VIDEO PRODUCER RESUME', videoProducer)
        // socket.emit('producer-resume')
    }
    const handleCameraOn = () => {
        setIsCameraOn(true)

        const audioTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'audio');

        socket.emit('user-controls-status', ({ userId: socket.id, isCameraOn: true, isMicOn: audioTrack?.enabled, for: 'video', roomName: [lectureDetails?.roomDetails?.id ?? ""], roomid: lectureDetails?.roomDetails?.id ?? "", userid: JSON.parse(localStorage.getItem("details"))?.id, }))

        const videoTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'video');
        videoTrack.enabled = true;

        // socket.emit('producer-paused', ({ videoProducerId: videoProducerId, videoStatus: true }))
        // const localVideoContainer = document.getElementById('localVideoContainer')
        // localVideoContainer
        //     .removeChild(document.getElementById('localVideoThumbnail'))

        document.getElementById('myVideo').style.display = ''
        // videoProducer.resume()
        // console.log('VIDEO PRODUCER RESUME', videoProducer)
        // socket.emit('producer-resume')
    }
    const handleMicOn = () => {
        setIsMicOn(true)

        const videoTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'video');
        socket.emit('user-controls-status', ({ userId: socket.id, isCameraOn: videoTrack?.enabled, isMicOn: true, for: 'video', roomName: [lectureDetails?.roomDetails?.id ?? ""], roomid: lectureDetails?.roomDetails?.id ?? "", userid: JSON.parse(localStorage.getItem("details"))?.id, }))

        const audioTrack = document.getElementById('myVideo').srcObject.getTracks().find(track => track.kind === 'audio');
        audioTrack.enabled = true;

        // socket.emit('producer-paused', ({ videoProducerId: videoProducerId, videoStatus: true }))
        // const localVideoContainer = document.getElementById('localVideoContainer')
        // localVideoContainer
        //     .removeChild(document.getElementById('localVideoThumbnail'))

        // document.getElementById('myVideo').style.display = ''
        // videoProducer.resume()
        // console.log('VIDEO PRODUCER RESUME', videoProducer)
        // socket.emit('producer-resume')
    }

    return (
        <>
            <Toaster />
            {/* <button id='join-button' onClick={() => {
                joinRoom()
                // setStartClassModal(false)
            }}>Start</button> <p>{lectureDetails?.lecture_title ? lectureDetails?.lecture_title : lectureDetails?.lectureTitle}</p> */}
            {/* {loadingForTwoWay && <CircularProgress />} */}
            {exitClassModal &&
                <div className="modal-parent-div">
                    < div className="start-class" style={{ width: '280px', height: '200px' }}>
                        <p style={{ fontSize: '18px', fontWeight: '600', textAlign: 'center' }}>Do you want to leave class?</p>
                        <div className="exit-class-inner-div">


                            <button onClick={() => {
                                navigate(-1)
                                setExitClassModal(false)
                            }}>Yes</button>
                            <button onClick={() => {

                                setExitClassModal(false)
                            }}>No</button>
                            {/* <button onClick={() => { navigate(-1) }}>Go Back</button> */}
                        </div>

                    </div >
                </div >
            }

            {startClassModal &&
                <div className="modal-parent-div">
                    < div className="start-class">
                        <p></p>
                        <div className="start-class-inner-div">
                            {loadingForTwoWay && <CircularProgress />}
                            <button disabled={loadingForTwoWay} style={{ backgroundColor: loadingForTwoWay ? 'gray' : '' }} onClick={() => {
                                joinRoom()
                                setStartClassModal(false)
                            }}>{loadingForTwoWay ? 'Wait' : 'Join Class'}</button>
                            {/* <button onClick={() => { navigate(-1) }}>Go Back</button> */}
                        </div>

                    </div >
                </div >
            }

            <div className="two-way-nav" onClick={() => {
                setExitClassModal(true)
            }}>
                <p className="nav-content">
                    <FaArrowLeft className="two-way-icon" />
                    {lectureDetails?.lectureTitle}
                </p>
            </div>

            <div className="two-way-container" onDoubleClick={onDoubleClickHandler}>
                <div className="two-way-left-container">
                    {!isStreamStarted ? (
                        <div className="video-left-container">
                            <div className="host-yet-joined">
                                <h3>Class Is About To Start Please Wait ....</h3>
                            </div>
                        </div>
                    ) : (
                        <div className="two-way-left" >
                            <TwoWayVideo handleMicOff={handleMicOff} handleMicOn={handleMicOn} isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn} isMicOn={isMicOn} setIsMicOn={setIsMicOn} isProduceStart={isProduceStart} onDoubleClickHandler={onDoubleClickHandler} handleCameraOff={handleCameraOff} handleCameraOn={handleCameraOn} />
                        </div>
                    )}

                    {width <= 768 && (
                        <div className="chat-box-wrapper">
                            {" "}
                            <ChatContainer
                                doubtsEnabled={doubtsEnabled}
                                nameOfRoom={lectureDetails?.roomDetails?.roomName}
                                participantList={participantList}
                                handleVideo={handleVideo}
                                lectureId={lectureId}
                                tabs={tabs}
                                setTabs={setTabs}
                                msgList={msgList}
                                sendMessage={sendMessage}
                                socket={socket}
                                name={name}
                                roomName={lectureDetails?.roomDetails?.id ?? ""}
                                batch="batch"
                                userId={userId}
                            />
                        </div>
                    )}

                    {width > 768 && (
                        <div className="twoway-tabs-wrapper">
                            <TwowayTabs data={lectureDetails} />
                        </div>
                    )}
                </div>

                {width > 768 && (
                    <div className="chat-box-wrapper">
                        {" "}
                        <ChatContainer
                            doubtsEnabled={doubtsEnabled}
                            nameOfRoom={lectureDetails?.roomDetails?.roomName}
                            participantList={participantList}
                            handleVideo={handleVideo}
                            lectureId={lectureId}
                            tabs={tabs}
                            setTabs={setTabs}
                            msgList={msgList}
                            sendMessage={sendMessage}
                            socket={socket}
                            name={name}
                            roomName={lectureDetails?.roomDetails?.id ?? ""}
                            batch="batch"
                            userId={userId}
                        />
                    </div>
                )}

                {width <= 768 && (
                    <div className="twoway-tabs-wrapper">
                        <TwowayTabs data={lectureDetails} />
                    </div>
                )}
                {/* <div className="chat-box-wrapper">
          {" "}
          <ChatContainer
            doubtsEnabled={doubtsEnabled}
            nameOfRoom={lectureDetails?.roomDetails?.roomName}
            participantList={participantList}
            handleVideo={handleVideo}
            lectureId={lectureDetails?._id}
            tabs={tabs}
            setTabs={setTabs}
            msgList={msgList}
            sendMessage={sendMessage}
            socket={socket}
            name={name}
            roomName={lectureDetails?.roomDetails?.id ?? ""}
            batch="batch"
            userId={userId}
          />
        </div> */}
            </div>

            {/* demo */}
            <ul>
                {/* {allLecture?.data?.length > 0 &&
                    allLecture?.data
                        ?.filter(
                            (i) => curr_date?.split(" ")[0] == i?.starting_date?.split(" ")[0]
                        )
                        ?.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item?.lecture_title}
                                    <button
                                        onClick={() => {
                                            // setLectureDetails(item);
                                            ////console.log("Lecture Details after clicking", item);
                                        }}
                                    >
                                        set
                                    </button>
                                    <button id="start-consume" onClick={() => joinRoom()}>
                                        Start
                                    </button>
                                   
                                    <button onClick={() => socket.disconnect()}>Leave</button>
                                </li>
                            );
                        })} */}
                <button style={{ display: "none" }} id='get-producer' onClick={() => getProducers()}>getProducers</button>
                <button
                    style={{ display: "none" }}
                    id="produce-video"
                    onClick={() => {
                        handleVideo();
                    }}
                >
                    Produce Video
                </button>
                <button
                    style={{ display: "none" }}
                    id="stop-produce"
                    onClick={() => {
                        stopProduce();
                    }}
                >
                    Stop Produce
                </button>
                <button
                    style={{ display: "none" }}
                    onClick={() => {
                        setIsVideo(!isMic);
                    }}
                >
                    Produce Mic
                </button>
            </ul>
        </>
    );
};

export default TwoWay;
