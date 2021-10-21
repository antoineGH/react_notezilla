import React from 'react'
import { useSelector } from 'react-redux'
import {
	selectUserHasError,
	selectUserIsLoading,
	selectUser,
} from '../../features/user/userSlice'
import { Layout } from 'antd'
import { Typography, Skeleton } from 'antd'
import './NavbarComponent.css'

export default function NavbarComponent() {
	const { Header } = Layout
	const { Text } = Typography

	const user = useSelector(selectUser)
	const isLoadingUser = useSelector(selectUserIsLoading)
	const hasErrorUser = useSelector(selectUserHasError)

	const renderUserInput = () => {
		if (hasErrorUser) {
			return null
		}
		if (isLoadingUser) {
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
		if (user) {
			return `${user['first_name']} ${user['last_name']}`
		}
	}

	return (
		<>
			<Header>
				<Text className='avatar-username' strong>
					{renderUserInput()}
				</Text>
			</Header>
		</>
	)
}
