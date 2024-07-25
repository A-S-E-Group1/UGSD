import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const localizer = momentLocalizer(moment);

export default function PublicCalendar() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const db = getFirestore();

 useEffect(() => {
  const fetchEvents = async () => {
    try {
      const eventsCol = collection(db, "events");
      const eventSnapshot = await getDocs(eventsCol);
      const eventList = eventSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        start: moment(doc.data().start.toDate()).toDate(),
        end: moment(doc.data().end.toDate()).toDate(),
      }));
      console.log("Fetched events:", eventList); 
      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  fetchEvents();
}, [db]);

  const handleSelectedEvent = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  return (
    <div style={{ height: "450px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        onSelectEvent={handleSelectedEvent}
        popup
      />
      {showModal && (
        <Modal isOpen={true} onClose={() => setShowModal(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEvent.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedEvent.message}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}  