export const getDate = (date) => {
	var months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]
	var days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	]
	let formattedTime = ''
	const date_created = new Date(date)
	const date_now = new Date(Date.now())

	let month = months[date_created.getMonth()]
	const day_date = ('0' + date_created.getDate()).slice(-2)
	const day_dateNotFormatted = date_created.getDate()
	const today_dateNotFormatted = date_now.getDate()
	var delta = today_dateNotFormatted - day_dateNotFormatted
	if (delta < 1) {
		formattedTime = 'Earlier Today'
	} else if (delta < 2) {
		formattedTime = 'Yesterday'
	} else if (delta < 3) {
		formattedTime = `Last ${days[date_created.getDay()]}`
	} else {
		formattedTime = `${month} ${day_date}`
	}

	return formattedTime
}

export const summaryTitle = (title) => {
	if (title.length >= 20) {
		return title.slice(0, 20) + '...'
	}
	return title
}

export const summaryContent = (content) => {
	if (content.length >= 400) {
		return content.slice(0, 400) + '...'
	}
	return content
}
