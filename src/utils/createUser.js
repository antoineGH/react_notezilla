export default async function createUser(
	email,
	password,
	first_name,
	last_name
) {
	const user = { email, password, first_name, last_name }
	const response = await fetch('http://127.0.0.1:5000/api/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	})
	let responseJson = undefined
	let errorJson = undefined
	if (response.ok) {
		responseJson = await response.json()
	} else {
		errorJson = await response.json()
	}
	return new Promise((resolve, reject) => {
		responseJson ? resolve(responseJson) : reject(errorJson)
	})
}
