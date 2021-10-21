import React from 'react'
import ScratchAddForm from '../../forms/scratchAddForm/ScratchAddForm'
import './ScratchPadComponent.css'

export default function ScratchPadComponent(props) {
	const {
		scratch_title,
		scratch_content,
		isLoadingScratch,
		handleAddScratch,
		handleDeleteScratch,
		isLoadingDeleteScratch,
	} = props

	return (
		<ScratchAddForm
			handleAddScratch={handleAddScratch}
			scratch_title={scratch_title}
			scratch_content={scratch_content}
			isLoadingScratch={isLoadingScratch}
			handleDeleteScratch={handleDeleteScratch}
			isLoadingDeleteScratch={isLoadingDeleteScratch}
		/>
	)
}
