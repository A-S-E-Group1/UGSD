import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  CloseButton,
  useToast,
  HStack,
  Textarea,
  CircularProgress,
  Image,
} from "@chakra-ui/react";
import { FaLinkedin} from "react-icons/fa";
import {
  getFirestore,
  doc,
  addDoc,
  collection,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import Xlogo from "../../Xlogo.png";
import instalogo from "../../instalogo.png";
import { FacebookIcon } from "react-share";

const localizer = momentLocalizer(moment);

export default function AdminCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventMessage, setEventMessage] = useState("");
  const [saveError, setSaveError] = useState(false);
  const [shareError, setShareError] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingLink, setLoadingLink] = useState(false);

  const db = getFirestore();
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCol = collection(db, "events");
        const eventSnapshot = await getDocs(eventsCol);
        const eventList = eventSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title,
            message: data.message,
            start: data.start ? data.start.toDate() : new Date(),
            end: data.end ? data.end.toDate() : new Date(),
          };
        });
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [db]);

  const saveEvent = async () => {
    if (eventTitle && eventMessage) {
      try {
        setLoadingSave(true);
        const eventsCol = collection(db, "events");
        const newEvent = {
          title: eventTitle,
          message: eventMessage,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hour").toDate(),
        };

        if (selectedEvent) {
          // Update existing event
          const eventRef = doc(db, "events", selectedEvent.id);
          await updateDoc(eventRef, newEvent);
          setEvents(
            events.map((event) =>
              event.id === selectedEvent.id ? { ...event, ...newEvent } : event
            )
          );
        } else {
          // Add new event
          const docRef = await addDoc(eventsCol, newEvent);
          setEvents([...events, { id: docRef.id, ...newEvent }]);
        }

        toast({
          title: "Event Saved Successfully😊",
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setEventTitle("");
        setEventMessage("");
        setSelectedDate(null);
        setSelectedEvent(null);
        setShowModal(false);
      } catch (error) {
        toast({
          title: "Failed to Save Event",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingSave(false);
      }
    } else {
      toast({
        title: "Title and message are required",
        position: "top",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const generateEventLink = async () => {
    setLoadingLink(true);
    try {
      // Simulate an async operation to generate a link
      const eventLink = `https://uogsd.netlify.app/admin/activities=${encodeURIComponent(
        eventTitle
      )}&message=${encodeURIComponent(eventMessage)}`;
      navigator.clipboard.writeText(eventLink);
      showToast("Event Link Copied", "info");
    } catch (error) {
      console.error("Error generating event link:", error);
    } finally {
      setLoadingLink(false);
    }
  };

  const openEmailClient = () => {
    if (eventTitle && eventMessage) {
      setLoadingShare(true);

      const emailSubject = encodeURIComponent(eventTitle);
      const emailBody = encodeURIComponent(eventMessage);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${emailSubject}&body=${emailBody}`;
      const outlookUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=&subject=${emailSubject}&body=${emailBody}`;

      // Attempt to open Gmail first, then Outlook if Gmail is not supported
      const gmailWindow = window.open(gmailUrl);
      if (
        !gmailWindow ||
        gmailWindow.closed ||
        typeof gmailWindow.closed === "undefined"
      ) {
        window.open(outlookUrl);
      }

      setLoadingShare(false);
    } else {
      setShareError(true);
    }
  };

  const showToast = (title, status) => {
    toast({
      title: title,
      status: status,
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSelectedSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectedDate(event.start);
    setEventTitle(event.title);
    setSelectedEvent(event);
    setEventMessage(event.message);
  };

  const openShareModal = () => {
    if (eventTitle && eventMessage) {
      setShowModal(false);
      setShowShareModal(true);
      setShareError(false); // Reset share error state
    } else {
      setShareError(true);
    }
  };

  const closeShareModal = () => {
    setShowShareModal(false);
    setShowModal(true);
  };

  const openDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
  };

  const confirmDeleteEvent = async () => {
    if (selectedEvent) {
      setLoadingDelete(true);
      try {
        // Delete the event from the Firestore database
        const eventRef = doc(db, "events", selectedEvent.id);
        await deleteDoc(eventRef);

        // Remove the event from the local state
        const updatedEvents = events.filter(
          (event) => event.id !== selectedEvent.id
        );
        setEvents(updatedEvents);

        showToast("Event Deleted Successfully😊", "success");

        setShowModal(false);
        setEventTitle("");
        setEventMessage("");
        setSelectedEvent(null);
        setShowDeleteConfirmModal(false);
      } catch (error) {
        console.error("Error deleting event:", error);
        showToast("Failed to Delete Event", "error");
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  return (
    <div style={{ height: "450px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectedSlot}
        onSelectEvent={handleSelectedEvent}
        popup
      />
      {showModal && (
        <Modal isOpen={true} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent width="800px">
            <ModalHeader
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 style={{ textAlign: "center", flex: 1 }}>
                {selectedEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <CloseButton onClick={() => setShowModal(false)} />
            </ModalHeader>
            <ModalBody>
              <label style={{ fontWeight: "bold" }}>Event Title:</label>
              <Input
                placeholder="Enter Event Title"
                marginTop={"10px"}
                marginBottom={"10px"}
                type="text"
                className="form-control"
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <label style={{ fontWeight: "bold" }}>Event Message:</label>
              <Textarea
                placeholder="Enter Event Message"
                marginTop={"10px"}
                marginBottom={"10px"}
                className="form-control"
                id="eventMessage"
                value={eventMessage}
                onChange={(e) => setEventMessage(e.target.value)}
              />
              {saveError && (
                <Alert status="error" marginTop="10px" marginBottom="10px">
                  <AlertIcon />
                  Please enter both event title and message.
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setSaveError(false)}
                  />
                </Alert>
              )}
            </ModalBody>
            <ModalFooter justifyContent="center" alignItems={"center"}>
              <HStack spacing={4} flexWrap="wrap">
                <Button
                color={"white"}
                 bg={"blue.600 !important"}
                  onClick={saveEvent}
                  disabled={!eventTitle || !eventMessage}
                  isLoading={loadingSave}
                >
                  {loadingSave && (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="blue.300"
                    />
                  )}
                  {!loadingSave && "Save"}
                </Button>
                <Button
                 bg={"yellow.500 !important"}
                  onClick={openShareModal}
                  disabled={!eventTitle || !eventMessage}
                  isLoading={loadingShare}
                >
                  {loadingShare && (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="yellow.300"
                    />
                  )}
                  {!loadingShare && "Share via social media"}
                </Button>
                <Button
                  color={"white"}
                  bg={"green.700 !important"}
                  onClick={generateEventLink}
                  disabled={!eventTitle || !eventMessage}
                  isLoading={loadingLink}
                >
                  {loadingLink && (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="green.300"
                    />
                  )}
                  {!loadingLink && "Get Event Link"}
                </Button>
                {selectedEvent && (
                  <Button
                  color={"white"}
                  bg={"red.600 !important" }
                    onClick={openDeleteConfirmModal}
                    isLoading={loadingDelete}
                  >
                    {loadingDelete && (
                      <CircularProgress
                        isIndeterminate
                        size="24px"
                        color="red.300"
                      />
                    )}
                    {!loadingDelete && "Delete"}
                  </Button>
                )}
                <Button
                color={"white"}
                 bg={"purple.500 !important"}
                  onClick={openEmailClient}>
                  Share via Email
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Modal isOpen={showShareModal} onClose={closeShareModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {shareError && (
              <Alert status="error" marginBottom="10px">
                <AlertIcon />
                Please enter both event title and message to share.
                <CloseButton
                  position="absolute"
                  right="8px"
                  top="8px"
                  onClick={() => setShareError(false)}
                />
              </Alert>
            )}
            <p
              style={{
                fontStyle: "italic",
              }}
            >
              Share the event "{eventTitle}" via:
            </p>
            <br></br>
            <HStack spacing={2}>
              <Button colorScheme="black" onClick={() => alert("Share on X")}>
                <Image
                  src={Xlogo}
                  alt="X logo"
                  boxSize="39px"
                  marginLeft={"0.6"}
                />
              </Button>
              <Button
                colorScheme="linkedin"
                onClick={() => alert("Share on LinkedIn")}
              >
                <FaLinkedin 
                size={"26"} />
              </Button>
              <Button
                colorScheme="instagram"
                onClick={() => alert("Share on Instagram")}
              >
                <Image
                  src={instalogo}
                  alt="Instagram logo"
                  boxSize="45px"
                  marginLeft={"-0.5"}
                />
              </Button>
              <Button
               bgColor={"color !important"}
                onClick={() => alert("Share on Facebook")}
              >
                <FacebookIcon size={"30"}/>
              </Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeShareModal} bgColor={"color !important"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={showDeleteConfirmModal} onClose={closeDeleteConfirmModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this event?</p>
          </ModalBody>
          <ModalFooter>
            <Button
             bg={"red.600 !important"}
             color={"white"}
              mr={3}
              onClick={confirmDeleteEvent}
              isLoading={loadingDelete}
            >
              Delete
            </Button>
            <Button 
            bg={"brand.blue !important"} 
            color={"white"}
            onClick={closeDeleteConfirmModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
