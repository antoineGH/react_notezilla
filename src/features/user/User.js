import React from 'react'
import {
	selectUser,
	deleteUser,
	selectUserIsLoading,
	selectUserHasError,
	selectUpdateUserIsLoading,
	selectUpdateUserHasError,
	selectDeleteUserHasError,
	updateUser,
} from './userSlice'
import { useSelector, useDispatch } from 'react-redux'
// import UserForm from '../../components/userForm/UserForm'
import { Card, Skeleton, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { openNotificationWithIcon } from '../../utils/notification'

export default function User() {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectUserIsLoading)
	const hasError = useSelector(selectUserHasError)
	const user = useSelector(selectUser)
	const isLoadingUpdateUser = useSelector(selectUpdateUserIsLoading)
	const hasErrorUpdateUser = useSelector(selectUpdateUserHasError)
	const hasErrorDeleteUser = useSelector(selectDeleteUserHasError)

	const handleUpdateAccount = (firstName, lastName, password) => {
		if (
			firstName === user.first_name &&
			lastName === user.last_name &&
			!password
		) {
			openNotificationWithIcon(
				'info',
				'No Changes',
				'No modifications made on your account.'
			)
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
			{/* {(hasError || hasErrorUpdateUser || hasErrorDeleteUser) && (
				<>
					<p>Error Fetching the API.</p>
				</>
			)}
			{isLoading && (
				<Card
					className='profile-picture-card'
					style={{ width: 350 }}
					cover={
						<Avatar
							shape='square'
							size={86}
							icon={<UserOutlined />}
						/>
					}>
					<hr />
					<Skeleton loading={isLoading} active></Skeleton>
				</Card>
			)}
			{!isLoading && user !== undefined && (
				<UserForm
					user={user}
					handleUpdateAccount={handleUpdateAccount}
					handleDeleteAccount={handleDeleteAccount}
					isDisabled={isLoadingUpdateUser}
				/>
			)} */}
		</>
	)
}
