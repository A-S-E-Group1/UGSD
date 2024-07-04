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
  HStack
} from "@chakra-ui/react";
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
      } else {
        const newEvent = {
          title: eventTitle,
          message: eventMessage,
          start: selectedDate,
          end: moment(selectedDate).add(1, "hours").toDate(),
        };
        setEvents([...events, newEvent]);
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
      setShowShareModal(true);
      setShowModal(false);
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
      setShowModal(false);
      setEventTitle("");
      setEventMessage("");
      setSelectedEvent(null);
      setShowDeleteConfirmModal(false);
    }
  };

  const generateEventLink = () => {
    if (selectedEvent) {
      // Assuming a domain where this app is hosted, replace `yourdomain.com` with your actual domain
      const eventLink = `https://yourdomain.com/event/${selectedEvent.id}`;
      navigator.clipboard.writeText(eventLink);
      toast({
        title: "Event Link Copied",
        description: "Event link copied to clipboard!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const openEmailModal = () => {
    if (eventTitle && eventMessage) {
      setShowEmailModal(true);
      setShowModal(false);
      setShareError(false); // Reset share error state
    } else {
      setShareError(true);
    }
  };
  const closeEmailModal = () => {
    setShowEmailModal(false);
    setShowModal(true);
  };

  const sendEmail = () => {
    if (emailSubject && emailBody) {
      // Implement email sending logic here (e.g., using an email API or service)
      const mailtoLink = `mailto:?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setShowEmailModal(false);
      setEventTitle("");
      setEventMessage("");
      setEmailSubject("");
      setEmailBody("");
    } else {
      setEmailError(true);
    }
  };

  return (
    <div style={{ height: "600px" }}>
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
              <Input
                placeholder="Enter Message"
                marginTop={"10px"}
                type="text"
                className="form-control"
                id="eventMessage"
                value={eventMessage}
                onChange={(e) => setEventMessage(e.target.value)}
              />
              {saveError && (
                <Alert status="error" marginTop="10px">
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
            <ModalFooter justifyContent="space-between">
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
                  Share
                </Button>
                <Button
                  colorScheme="green"
                  onClick={generateEventLink}
                  disabled={!selectedEvent}
                >
                  Get Event Link
                </Button>
                <Button
                  colorScheme="purple"
                  onClick={openEmailModal}
                  disabled={!eventTitle || !eventMessage}
                >
                  Share via Email
                </Button>
                {selectedEvent && (
                  <Button colorScheme="red" onClick={openDeleteConfirmModal}>
                    Delete
                  </Button>
                )}
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showShareModal && (
        <Modal isOpen={true} onClose={closeShareModal}>
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
              <p>Share the event "{eventTitle}" via:</p><br></br>
              <Button
                colorScheme="twitter"
                mr={3}
                onClick={() => alert("Share on Twitter")}
              >
                Twitter
              </Button>
              <Button
                colorScheme="facebook"
                mr={3}
                onClick={() => alert("Share on Facebook")}
              >
                Facebook
              </Button>
              <Button
                colorScheme="linkedin"
                onClick={() => alert("Share on LinkedIn")}
              >
                LinkedIn
              </Button>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeShareModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showEmailModal && (
        <Modal isOpen={true} onClose={closeEmailModal}>
          <ModalOverlay />
          <ModalContent width="600px">
            <ModalHeader>Share via Email</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {emailError && (
                <Alert status="error" marginBottom="10px">
                  <AlertIcon />
                  Please enter both email subject and body.
                  <CloseButton
                    position="absolute"
                    right="8px"
                    top="8px"
                    onClick={() => setEmailError(false)}
                  />
                </Alert>
              )}
              <label style={{ fontWeight: "bold" }}>Email Subject:</label>
              <Input
                placeholder="Enter Subject"
                marginTop={"10px"}
                marginBottom={"10px"}
                type="text"
                className="form-control"
                id="emailSubject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <label style={{ fontWeight: "bold" }}>Email Body:</label>
              <Input
                placeholder="Enter Body"
                marginTop={"10px"}
                type="text"
                className="form-control"
                id="emailBody"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={sendEmail}
                disabled={!emailSubject || !emailBody}
              >
                Send
              </Button>
              <Button colorScheme="gray" onClick={closeEmailModal}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {showDeleteConfirmModal && (
        <Modal isOpen={true} onClose={closeDeleteConfirmModal}>
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
      )}
    </div>
  );
}