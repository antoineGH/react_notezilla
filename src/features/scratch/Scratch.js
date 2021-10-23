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
import { Skeleton } from 'antd'
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

	useEffect(() => {
		dispatch(loadScratch())
	}, [dispatch])

	const handleAddScratch = (scratch_title, scratch_content, isCompleted) => {
		dispatch(addScratch({ scratch_title, scratch_content, isCompleted }))
	}

	const handleScratchToNote = () => {
		console.log('convert scratch')
	}

	const handleDeleteScratch = () => {
		dispatch(deleteScratch())
	}

	const renderScratchForm = () => {
		if (hasErrorScratch) {
			return ''
		}
		if (isLoadingScratch || isLoadingAddScratch || isLoadingDeleteScratch) {
			return (
				<Skeleton.Input
					style={{ width: 584, height: 298 }}
					active={true}
					size='large'
				/>
			)
		}
		return (
			<ScratchPadComponent
				scratch_title={scratch_title}
				scratch_content={scratch_content}
				isLoadingScratch={isLoadingScratch}
				isLoadingDeleteScratch={isLoadingDeleteScratch}
				handleAddScratch={handleAddScratch}
				handleDeleteScratch={handleDeleteScratch}
				handleScratchToNote={handleScratchToNote}
			/>
		)
	}

	return renderScratchForm()
}
