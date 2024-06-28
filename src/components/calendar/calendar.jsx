import React, {useState} from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'


const localizer = momentLocalizer(moment)

export default function Calender(){

	const [events, setEvents] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [eventTitle, setEventTitle] = useState('');


	const handleSelectedSlot = (slotInfo) =>{
		setShowModal(true);
        setSelectedDate(slotInfo.start);
	}

	const saveEvent = () =>{
		if(eventTitle && selectedDate){
			const newEvent = {
                title: eventTitle,
                start: selectedDate,
                end: moment(selectedDate).add(1, 'hours').toDate(),
            };
            setEvents([...events, newEvent]);
            setShowModal(false);
            setEventTitle('');
		}
		}
	
		return(
			<div style={{height:'500px'}}>
			<Calendar
			localizer={localizer}
			events={events}
			startAccessor="start"
			endAccessor="end"
			style={{margin:"50px"}}
            selectable={true}
			onSelectSlot={handleSelectedSlot}
			/>
			{showModal && (
				<div class="modal" style={{display: 'block',
				backgroundColor:'rgba(0.0.0.0.5)',
				 position:'fixed',
				 top:70, 
				 bottom:0,
				  left:'0',
				  right:'0',
				   marginLeft:700}}>
				<div class="modal-dialog">
				  <div class="modal-content">
					<div class="modal-header">
					  <h5 class="modal-title">New Event</h5>
					  <button type="button" class="btn-close" onClick={()=> setShowModal(false)}></button>
					</div>
					<div class="modal-body">
					  <label>Modal body text goes here.</label>
					  <input
					  type='text'
					  className='form-control'
					  id='eventTitle'
					  value={eventTitle}
					  onChange={(e)=> setEventTitle(e.target.value)}
					  />
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					  <button type="button" class="btn btn-primary" onClick={saveEvent}>Save changes</button>
					</div>
				  </div>
				</div>
			  </div>
			)}
				
			</div>
		)
}