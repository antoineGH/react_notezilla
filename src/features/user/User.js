import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	selectUser,
	selectUserIsLoading,
	selectUserHasError,
	updateUser,
	selectUpdateUserIsLoading,
	deleteUser,
} from './userSlice'
import UserAccountForm from '../../forms/userAccountForm/UserAccountForm'
import { openNotificationWithIcon } from '../../utils/notification'
import { Row, Col, Card, Skeleton, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export default function User() {
	const dispatch = useDispatch()

	// Select User and Handle Loading and Error states
	const user = useSelector(selectUser)
	const isLoadingUser = useSelector(selectUserIsLoading)
	const hasErrorUser = useSelector(selectUserHasError)

	// Update User Loading and Error states
	const isLoadingUpdateUser = useSelector(selectUpdateUserIsLoading)

	const handleUpdateAccount = (firstName, lastName, password) => {
		if (firstName === user.first_name && lastName === user.last_name && !password) {
			openNotificationWithIcon('info', 'No Changes', 'No modifications made on your account.')
			return
		}
		firstName = firstName.toLowerCase()
		lastName = lastName.toLowerCase()
		dispatch(updateUser({ firstName, lastName, password }))
	}

	const handleDeleteAccount = () => {
		dispatch(deleteUser())
	}

	return (
		<>
			{/* Handle Has Error Loading User */}
			{hasErrorUser && (
				<Row className='row-container-user'>
					<Col className='col-container-user'>
						<p>Error Fetching the API.</p>
					</Col>
				</Row>
			)}
			{/* Handle Loading User State */}
			{isLoadingUser && (
				<Row className='row-container-user'>
					<Col className='col-container-user'>
						<Card
							className='profile-picture-card'
							style={{ maxWidth: 550 }}
							cover={<Avatar shape='square' size={86} icon={<UserOutlined />} />}>
							<hr />
							<Skeleton loading={isLoadingUser} active></Skeleton>
						</Card>
					</Col>
				</Row>
			)}
			{/* Render Form when User Loaded */}
			{!isLoadingUser && user !== undefined && (
				<Row className='row-container-user'>
					<Col className='col-container-user'>
						<UserAccountForm
							user={user}
							handleUpdateAccount={handleUpdateAccount}
							handleDeleteAccount={handleDeleteAccount}
							isDisabled={isLoadingUpdateUser}
						/>
					</Col>
				</Row>
			)}
		</>
	)
}
