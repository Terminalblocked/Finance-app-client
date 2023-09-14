export function convertDate(
	inputDate: string,
	outputFormat: string = 'd/m/y',
): string {
	try {
		const inputDateTime = new Date(inputDate)
		if (isNaN(inputDateTime.getTime())) {
			throw new Error('Invalid input date')
		}

		const day = inputDateTime.getDate().toString().padStart(2, '0')
		const month = (inputDateTime.getMonth() + 1).toString().padStart(2, '0')
		const year = inputDateTime.getFullYear().toString()

		const formattedDate = outputFormat
			.replace('d', day)
			.replace('m', month)
			.replace('y', year)

		return formattedDate
	} catch (error) {
		console.log('Invalid input date format')
		return ''
	}
}
