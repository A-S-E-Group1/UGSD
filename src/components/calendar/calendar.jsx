import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Input } from "@chakra-ui/react";

const localizer = momentLocalizer(moment);

export default function Calender() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const [selectEvent, setSelectEvent] = useState(null);
  const [eventMessage, setEventMessage] = useState("");

  const handleSelectedSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectedEvent = (event) => {
    setShowModal(true);
    setSelectedDate(event.start);
    setEventTitle(event.title);
    setSelectEvent(event);
    setEventMessage(event.eventMessage);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = {
          ...selectEvent,
          title: eventTitle,
          message: eventMessage,
        };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
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
      setSelectEvent(null);
    }
  };
  const deleteEvent = (eventToDelete) => {
    const updatedEvents = events.filter((event) => event !== eventToDelete);
    setEvents(updatedEvents);
  };
  

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "50px" }}
        selectable={true}
        onSelectSlot={handleSelectedSlot}
        onSelectEvent={handleSelectedEvent}
      />
      {showModal && (
        <div
          className="modal"
          style={{
            position: "fixed",
            zIndex: 9999,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 2px rgba(0,0,0,0.1)",
          }}
        >
          <div
            className="modal-dialog"
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: "15px",
              border: "1px solid #0A2E65",
            }}
          >
            <div className="modal-content">
              <div
                className="modal-header"
                style={{
                  fontWeight: "bold",
                }}
              >
                <h5
                  className="modal-title"
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {selectEvent ? "Edit Event" : "Add Event"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setEventTitle("");
                    setSelectEvent(null);
                    setEventMessage("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <label
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Event Title:
                </label>
                <Input
                  marginTop={"10px"}
                  marginBottom={"10px"}
                  type="text"
                  className="form-control"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
                <label
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Event Message:
                </label>
                <Input
                  marginTop={"10px"}
                  type="text"
                  className="form-control"
                  id="eventMessage"
                  value={eventMessage}
                  onChange={(e) => setEventMessage(e.target.value)}
                />
              </div>
              <div
                className="modal-footer"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "15px",
                  borderRadius: "8px",
                }}
              >
                <button
                  style={{
                    margin: "15px",
                    background: "#0A2E65",
                    borderRadius: "12px",
                    color: "white",
                    padding: "10px 20px",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEvent}
                >
                  Save
                </button>
                <button
                  style={{
                    margin: "15px",
                    background: "#FF0909",
                    borderRadius: "12px",
                    color: "white",
                    padding: "10px 20px",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={deleteEvent}
                >
                  Delete
                </button>
                <button
                  style={{
                    margin: "15px",
                    background: "#B08B57",
                    borderRadius: "12px",
                    color: "white",
                    padding: "10px 20px",
                  }}
                  type="button"
                  className="btn btn-primary"
                  onClick={deleteEvent}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
