import React, { useState } from "react";
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
  Spinner
} from "@chakra-ui/react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
// import { getFirestore, addDoc, collection } from "firebase/firestore";
const localizer = momentLocalizer(moment);

export default function CalendarComponent() {

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
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailSubject, setEmailSubject] = useState("");
    const [emailBody, setEmailBody] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [loading, setLoading] = useState(false);


// const db = getFirestore();
 const toast = useToast();
// const saveEventToFirestore = async(values) =>{

//   const {
//     event_title,
//     event_message,
//   }= values;

// if(!event_title){
//   toast({
//     title: "Error",
//     description: "Event Title is required",
//     duration: 3000,
//     status: "error",
//     position: "top",
//   });
//   return;
// }

// if(!event_message){
//   toast({
//     title: "Error",
//     description: "Event Message is required",
//     duration: 3000,
//     status: "error",
//     position: "top",
//   });
//   return;
// }
// try{
//   await addDoc(collection(db, "Events"),{
//     event_title,
//     event_message
//   })
//   toast({
//     title: "Success",
//     description: "Event Saved Successfully",
//     duration: 3000,
//     status: "success",
//     position: "top",
//   });
//   setShowShareModal(false);
//   setEventTitle("");
//   setEventMessage("");
// } catch(error){
//   console.log(error);
//   toast({
//     title: "Error",
//     description: "Failed to Save Event",
//     duration: 3000,
//     status: "error",
//     position: "top",
//   });
// }
 
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

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectedEvent) {
        const updatedEvent = {
          ...selectedEvent,
          title: eventTitle,
          message: eventMessage,
        };
        const updatedEvents = events.map((event) =>
          event === selectedEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
        showToast("Event Updated Successfully", "success");
      } else {
        const newEvent = {
          title: eventTitle,
          message: eventMessage,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        setEvents([...events, newEvent]);
        showToast("Event Created Successfully", "success");
      }
      setShowModal(false);
      setEventTitle("");
      setEventMessage("");
      setSelectedEvent(null);
      setSaveError(false); // Reset save error state
    } else {
      setSaveError(true);
    }
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

  const confirmDeleteEvent = () => {
    if (selectedEvent) {
      const updatedEvents = events.filter((event) => event !== selectedEvent);
      setEvents(updatedEvents);
      showToast("Event Deleted Successfully", "success");
      setShowModal(false);
      setEventTitle("");
      setEventMessage("");
      setSelectedEvent(null);
      setShowDeleteConfirmModal(false);
    }
  };

  const generateEventLink = async () => {
    // Simulate an async operation to generate a link
    setTimeout(() => {
      const eventLink = `https://yourdomain.com/event?title=${encodeURIComponent(eventTitle)}&message=${encodeURIComponent(eventMessage)}`;
      navigator.clipboard.writeText(eventLink);
      showToast("Event Link Copied", "info");
    }, 1000);
  };

  const openEmailClient = () => {
    if (eventTitle && eventMessage) {
      const emailSubject = encodeURIComponent(eventTitle);
      const emailBody = encodeURIComponent(eventMessage);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${emailSubject}&body=${emailBody}`;
      const outlookUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=&subject=${emailSubject}&body=${emailBody}`;

      // Attempt to open Gmail first, then Outlook if Gmail is not supported
      const gmailWindow = window.open(gmailUrl);
      if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed === 'undefined') {
        window.open(outlookUrl);
      }
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
                placeholder="Enter Event"
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
                  colorScheme="blue"
                  onClick={saveEvent}
                  disabled={!eventTitle || !eventMessage}
                >
                  Save
                </Button>
                <Button
                  colorScheme="yellow"
                  onClick={openShareModal}
                  disabled={!eventTitle || !eventMessage}
                >
                  Share via social media
                </Button>
                <Button
                  colorScheme="green"
                  onClick={generateEventLink}
                  disabled={!eventTitle || !eventMessage}
                >
                  Get Event Link
                </Button>
                {selectedEvent && (
                  <Button colorScheme="red" onClick={openDeleteConfirmModal}>
                    Delete
                  </Button>
                )}
                <Button colorScheme="purple" onClick={openEmailClient}>
                  <FaEnvelope style={{marginRight:"7px"}}/> Share via Email
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
              fontStyle:"italic"
            }}
            >Share the event "{eventTitle}" via:</p><br></br>
            <HStack spacing={4}>
              <Button
                colorScheme="twitter"
                onClick={() => alert("Share on Twitter")}
              >
                <FaTwitter />
              </Button>
              <Button
                colorScheme="linkedin"
                onClick={() => alert("Share on LinkedIn")}
              >
                <FaLinkedin />
              </Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeShareModal}>
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
            <Button colorScheme="red" mr={3} onClick={confirmDeleteEvent}>
              Delete
            </Button>
            <Button colorScheme="blue" onClick={closeDeleteConfirmModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}