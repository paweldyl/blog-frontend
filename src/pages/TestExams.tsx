import { useEffect, useState } from "react";

const url = "http://172.30.238.12:8080/test/exam";

export default function TestExams() {
	const [isSEB, setIsSEB] = useState(false);
	const [efect, setEfect] = useState(false);

	useEffect(() => {
		if (navigator.userAgent.includes("SEB")) setIsSEB(true);
		setEfect(true);

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				exampleKey: "exampleValue",
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log("✅ Success:", data))
			.catch((err) => console.error("❌ Error:", err));
	}, []);

	return (
		<div className="test-exams">
			{isSEB ? <div>SEB</div> : <div>not SEB</div>}
			{efect ? <div>use effect happened</div> : <div>not happened</div>}
		</div>
	);
}
