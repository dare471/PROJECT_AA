export const kek = ''
// import { createStore } from 'effector'

// export function createUserContracts() {
// 	const $userContracts = createStore<UserContract[] | null>(null)
// 	const $userContractsPending = createStore<boolean>(false)

// 	const getUserContractsFx = attach({ effect: userContractsApi.userContractsQuery })

// 	$userContractsPending.on(getUserContractsFx.pending, (_, pending) => pending)
// 	$userContracts.on(getUserContractsFx.doneData, (_, userContracts) => userContracts)

// 	return { $userContracts, $userContractsPending, getUserContractsFx }
// }

// // const req = await instance({
// // 			method: 'POST',
// // 			url: '/api/manager/workspace',
// // 			data: {
// // 				type: 'managerContracts',
// // 				userId
// // 			}
// // 		})

// // 		return req.data
