import { createUser } from './model'
import { UserCard } from './ui'

export {
	createUserMapHistories,
	createUserContracts,
	createUserSubscribesClients,
	createUserSubscribesRegions,
	createUserUnSubscribesClients,
	createUserUnSubscribesRegions,
} from './model'
export { UserMapHistoryCard } from './ui'

export const UserFactory = {
	UserCard,
	createUser,
}
