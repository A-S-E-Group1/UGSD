import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import events from "./events";
import { Box } from "@chakra-ui/react";

function Calendar() {
	return (
		<Box width={"100%"} h={"400px"}>
			<FullCalendar
				defaultView="dayGridMonth"
				themeSystem="Simplex"
				header={{
					right: "prev,next",
					center: "title",
					left: "dayGridMonth,timeGridWeek,timeGridDay",
				}}
				plugins={[dayGridPlugin]}
				events={events}
				displayEventEnd="true"
				eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
				height={"400px"}

			/>
		</Box>
	);
}

// function renderEventContent(eventInfo) {
// 	console.log(eventInfo);
// 	return (
// 		<>
// 			{eventInfo.timeText && (
// 				<div>
// 					<b>{eventInfo.timeText}</b>
// 				</div>
// 			)}
// 			<div>
// 				<i>{eventInfo.event.description}</i>
// 			</div>
// 			{/* <b>Aloha</b> */}
// 		</>
// 	);
// }

export default Calendar;
