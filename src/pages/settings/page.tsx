import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Box, Button, Container, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { useStore } from 'effector-react'
import React from 'react'
import { AiOutlineFile, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineUnsubscribe } from 'react-icons/md'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { Header } from '~src/widgets/header'

import { $$session } from '~src/entities/session'

import { routes } from '~src/shared/routes'

import { type NavItem, navItemsGenerate } from './nav-generate'

export function SettingsPage() {
	const role = useStore($$session.$role)
	const location = useLocation()
	const paths = location.pathname.split('/').filter((path) => path !== '')

	const navItems = React.useMemo<Array<NavItem>>(
		() =>
			navItemsGenerate([
				{
					label: 'Профиль',
					key: 'profile',
					icon: <Icon as={AiOutlineUser} fontSize='xl' />,
					route: routes.settingsProfile,
				},
				{
					label: 'Контракты',
					key: 'contracts',
					icon: <Icon as={AiOutlineFile} fontSize='xl' />,
					route: routes.settingsContracts,
				},
				{
					label: 'Подписки',
					key: 'subscribes',
					icon: <Icon as={MdOutlineUnsubscribe} fontSize='xl' />,
					protects: [() => role.includes(1)],
					children: [
						{
							label: 'Регионы',
							key: 'regions',
							route: routes.settingsSubscribesRegions,
						},
						{
							label: 'Клиенты',
							key: 'clients',
							route: routes.settingsSubscribesClients,
						},
					],
				},
			]),
		[role],
	)

	console.log(navItems)

	return (
		<Box>
			<Header />
			<Container maxW='container.xl' py='20'>
				<Flex direction={{ base: 'column-reverse', md: 'row' }} minH='inherit' gap='5'>
					<Box p='2' maxH='lg' w={{ base: 'full', md: '25%' }}>
						<Stack>
							<Navbar paths={paths} navItems={navItems} />
						</Stack>
					</Box>
					<Box w={{ base: 'full', md: '75%' }} minH='inherit'>
						<Outlet />
					</Box>
				</Flex>
			</Container>
		</Box>
	)
}

function Navbar(props: { paths: string[]; navItems: NavItem[] }) {
	const { paths, navItems } = props

	return (
		<>
			{navItems.map((item, index) => (
				<NavbarButton key={index} paths={paths} item={item} />
			))}
		</>
	)
}

interface NavbarButtonProps {
	paths: string[]
	item: NavItem
}

function NavbarButton(props: NavbarButtonProps) {
	const { paths, item } = props

	if (item.children) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isExtend, setIsExtend] = React.useState(false)
		// eslint-disable-next-line react-hooks/rules-of-hooks
		React.useEffect(() => {
			if (paths.includes(item.key)) {
				setIsExtend(true)
			}
			return () => setIsExtend(false)
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [paths])

		return (
			<>
				<Button colorScheme='blue' variant='outline' onClick={() => setIsExtend((prev) => !prev)}>
					<Stack w='full' direction='row' justify='space-between' align='center'>
						<Stack direction='row' align='center'>
							{item.icon}
							<Text fontSize={item.icon ? 'md' : 'md'} fontWeight={item.icon ? 'medium' : 'normal'}>
								{item.label}
							</Text>
						</Stack>
						{isExtend ? <ChevronUpIcon /> : <ChevronDownIcon />}
					</Stack>
				</Button>
				{isExtend && (
					<Stack>
						{item?.children && (
							<>
								{item?.children.map((item, index) => (
									<NavbarButton key={index} paths={paths} item={item} />
								))}
							</>
						)}
					</Stack>
				)}
			</>
		)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const navigate = useNavigate()

		return (
			<>
				<Button
					colorScheme='blue'
					variant='outline'
					_after={
						paths[paths.length - 1] === item.key
							? {
									content: '""',
									position: 'absolute',
									left: 0,
									top: 0,
									width: '1',
									height: 'full',
									bgColor: 'blue.500',
									rounded: 'md',
							  }
							: {}
					}
					onClick={() => (item.route ? navigate(item.route()) : null)}
				>
					<Stack w='full' direction='row' justify='start' align='center'>
						{item.icon}
						<Text fontSize={item.icon ? 'md' : 'md'} fontWeight={item.icon ? 'medium' : 'normal'}>
							{item.label}
						</Text>
					</Stack>
				</Button>
			</>
		)
	}
}
