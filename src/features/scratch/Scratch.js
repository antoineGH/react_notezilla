import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	loadScratch,
	selectScratch,
	selectisLoadingScratch,
	selecthasErrorScratch,
	addScratch,
	deleteScratch,
	selectIsLoadingDeleteScratch,
	selectIsLoadingAddScratch,
} from '../scratch/scratchSlice'
import { Col, Skeleton } from 'antd'
import ScratchPadComponent from '../../components/scratchPadComponent/ScratchPadComponent'

export default function Scratch() {
	const dispatch = useDispatch()
	const scratch = useSelector(selectScratch)
	const scratch_title = scratch?.scratch_title
	const scratch_content = scratch?.scratch_content
	const isLoadingScratch = useSelector(selectisLoadingScratch)
	const hasErrorScratch = useSelector(selecthasErrorScratch)
	const isLoadingDeleteScratch = useSelector(selectIsLoadingDeleteScratch)
	const isLoadingAddScratch = useSelector(selectIsLoadingAddScratch)

	console.log('scratch => ' + scratch)
	console.log('type of scratch => ' + typeof scratch)
	// console.log(Object.getOwnPropertyNames(scratch))
	console.log('scratch_title => ' + scratch_title)
	console.log('scratch_content => ' + scratch_content)

	useEffect(() => {
		dispatch(loadScratch())
	}, [dispatch])

	const handleAddScratch = (scratch_title, scratch_content, isCompleted) => {
		console.log('add scratch')
		dispatch(addScratch({ scratch_title, scratch_content, isCompleted }))
	}

	const handleDeleteScratch = () => {
		console.log('delete scratch')
		dispatch(deleteScratch())
	}

	const renderScratchForm = () => {
		if (hasErrorScratch) {
			return (
				<Col>
					<p>Error Fetching the API.</p>
				</Col>
			)
		}
		if (
			isLoadingScratch ||
			isLoadingAddScratch ||
			isLoadingDeleteScratch ||
			typeof scratch !== 'object'
		) {
			return (
				<Skeleton.Input
					style={{
						width: 120,
						height: 20,
						marginTop: 22,
					}}
					active
					size={'default'}
				/>
			)
		}
		return (
			<ScratchPadComponent
				handleAddScratch={handleAddScratch}
				scratch_title={scratch_title}
				scratch_content={scratch_content}
				isLoadingScratch={isLoadingScratch}
				handleDeleteScratch={handleDeleteScratch}
				isLoadingDeleteScratch={isLoadingDeleteScratch}
			/>
		)
	}

	return renderScratchForm()
}
