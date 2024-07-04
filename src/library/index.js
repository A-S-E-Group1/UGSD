import {
	collection,
	doc,
	getDoc,
	updateDoc,
	deleteDoc,
	query,
	getDocs,
	onSnapshot,
	where,
} from "firebase/firestore";
import { db, storage } from "../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const GetAllAthletes = async (onData) => {
	try {
		const athletesRef = collection(db, "Athlete Data");
		// const q = query(athletesRef, orderBy("created_at", "desc"));
		const unsubscribe = onSnapshot(athletesRef, (ordersQuerySnapshot) => {
			const athletes = [];
			ordersQuerySnapshot.forEach((doc) => {
				athletes.push({
					id: doc.id,
					...doc.data(),
				});
			});

			// Call the provided onData callback with the updated athletes
			onData(athletes);
		});

		// Return the unsubscribe function to stop listening
		return unsubscribe;
	} catch (error) {
		return {
			message: error?.message,
			error: error,
		};
	}
};

export const DeleteAthleteByID = async (id) => {
	try {
		const athleteDocRef = doc(db, "Athlete Data", id);
		const athleteDocSnap = await getDoc(athleteDocRef);
		if (athleteDocSnap.exists()) {
			await deleteDoc(athleteDocRef);
			return id;
		} else {
			throw new Error("Athlete record does not exist.");
		}
	} catch (error) {
		return {
			message: error?.message,
			error: error,
		};
	}
};

export const GetAthleteByID = async (id) => {
	try {
		if (!id) {
			throw new Error("Athlete ID is empty.");
		}
		const AthleteDocRef = doc(db, "Athlete Data", id);
		const AthleteDocSnap = await getDoc(AthleteDocRef);

		if (AthleteDocSnap.exists()) {
			const AthleteData = AthleteDocSnap.data();
			return { ...AthleteData, id };
		} else {
			throw new Error("Athlete does not exist.");
		}
	} catch (error) {
		return {
			message: error?.message,
			error: error,
		};
	}
};

export const UpdateMedalById = async (id, medals) => {
	const athleteDocRef = doc(db, "Athlete Data", id);
	const athleteDocSnap = await getDoc(athleteDocRef);
	if (athleteDocSnap.exists()) {
		const athleteData = athleteDocSnap.data();
		const updatedData = {
			...athleteData,
			medals,
			updated_at: new Date().toISOString(),
		};
		await updateDoc(athleteDocRef, updatedData);
		return id;
	} else {
		throw new Error("Athlete does not exist.");
	}
};

export const UpdateAthleteById = async (id, data) => {
	const athleteDocRef = doc(db, "Athlete Data", id);
	const athleteDocSnap = await getDoc(athleteDocRef);
	if (athleteDocSnap.exists()) {
		const athleteData = athleteDocSnap.data();
		const updatedData = {
			...athleteData,
			...data,
			updated_at: new Date().toISOString(),
		};
		await updateDoc(athleteDocRef, updatedData);
		return id;
	} else {
		throw new Error("Athlete does not exist.");
	}
};

export const AddSportsDiscipline = async (sports) => {
	try {
		const orderDocRef = doc(db, "discipline", "sports");
		const orderDocSnap = await getDoc(orderDocRef);
		if (orderDocSnap.exists()) {
			const orderData = orderDocSnap.data();
			const updatedData = {
				sports: [...orderData.sports, sports],
			};
			await updateDoc(orderDocRef, updatedData);
			return updatedData;
		} else {
			throw new Error("Collection could not be updated");
		}
	} catch (error) {
		throw new Error(error);
	}
};

export const GetAllSportsDiscipline = async () => {
	try {
		const sportsRef = collection(db, "discipline");
		// const q = query(sportsRef, orderBy("created_at", "desc"));
		const sportsQuerySnapshot = await getDocs(sportsRef);
		const sports = [];
		sportsQuerySnapshot.forEach((doc) => {
			sports.push({
				...doc.data(),
			});
		});
		return sports;
	} catch (error) {
		return {
			message: error?.message,
			error: error,
		};
	}
};

export const searchAthlete = async (full_name) => {
	try {
		const athleteDocRef = collection(db, "Athlete Data");
		const q = query(athleteDocRef, where("full_name", "==", full_name));
		const querySnapshot = await getDocs(q);
		const documents = [];
		querySnapshot.forEach((doc) => {
			documents.push({ id: doc.id, ...doc.data() });

			
			
		});

		return documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const uploadImage = async (file) => {
	const storageRef = ref(storage, `images/${file.name}`);

	return uploadBytes(storageRef, file)
		.then((uploadTaskSnapshot) => {
			return getDownloadURL(uploadTaskSnapshot.ref);
		})
		.then((downloadURL) => {
			return downloadURL;
		})
		.catch((error) => {
			throw new Error(error);
		});
};
