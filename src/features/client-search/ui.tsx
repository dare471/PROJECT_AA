import { Box, Stack, Switch, Tooltip } from '@chakra-ui/react'
import { type Model, modelView } from 'effector-factorio'
import { useStoreMap, useUnit } from 'effector-react'
import Select from 'react-select'

import { createClientSearch } from './model'

export interface ClientSearchProps {
	model: Model<typeof createClientSearch>
}

export const ClientSearch = modelView(createClientSearch, function ClientSearch(props: ClientSearchProps) {
	const { model } = props

	const [searchType, handleSearchTypeChange] = useUnit([model.$searchType, model.searchTypeChanged])

	return (
		<Stack direction='row' align='center' position='relative'>
			<Tooltip hasArrow label='Поменять режим поиска'>
				<Box>
					<Switch colorScheme='whiteAlpha' checked={searchType === 'bin'} onChange={handleSearchTypeChange} />
				</Box>
			</Tooltip>
			{searchType === 'name' ? <ClientSearchByName /> : <ClientSearchByBin />}

			{/* {clientSearchType === 'name' ? <ClientNameInput /> : <ClientBinInput />}
			<ClientSearchHints /> */}
		</Stack>
	)
})

function ClientSearchByName() {
	const model = createClientSearch.useModel()
	const [clientName, handleClientNameChange] = useUnit([model.$clientName, model.clientNameChanged])
	const [clientNameOptions, handleClientHintClick, clientHintsPending] = useUnit([
		model.$clientNameOptions,
		model.clientHintClicked,
		model.$clientHintsPending,
	])
	const [districtId, clientHintNameOption] = useUnit([model.$districtId, model.$clientHintNameOption])

	return (
		<Select
			placeholder='Поиск клиента по Тoo/Ип'
			options={clientNameOptions}
			inputValue={clientName}
			onInputChange={(value, action) =>
				action.action === 'input-change' || action.action === 'set-value' ? handleClientNameChange(value) : null
			}
			value={clientHintNameOption}
			onChange={(option) => handleClientHintClick(option?.value ?? null)}
			isLoading={clientHintsPending}
			isDisabled={districtId === null}
			noOptionsMessage={() => 'Нет результатов'}
			isClearable
			isSearchable
			styles={{ container: (provided) => ({ ...provided, minWidth: '15rem' }) }}
		/>
	)
}

function ClientSearchByBin() {
	const model = createClientSearch.useModel()
	const [clientBin, handleClientBinChange] = useUnit([model.$clientBin, model.clientBinChanged])
	const [clientBinOptions, handleClientHintClick, clientHintsPending] = useUnit([
		model.$clientBinOptions,
		model.clientHintClicked,
		model.$clientHintsPending,
	])
	const [districtId, clientHintBinOption] = useUnit([model.$districtId, model.$clientHintBinOption])

	return (
		<Select
			placeholder='Поиск клиента по Иин/Бин'
			options={clientBinOptions}
			inputValue={clientBin}
			onInputChange={(value, action) =>
				action.action === 'input-change' || action.action === 'set-value' ? handleClientBinChange(value) : null
			}
			value={clientHintBinOption}
			onChange={(option) => handleClientHintClick(option?.value ?? null)}
			isLoading={clientHintsPending}
			isDisabled={districtId === null}
			noOptionsMessage={() => 'Нет результатов'}
			isClearable
			isSearchable
			styles={{ container: (provided) => ({ ...provided, minWidth: '15rem' }) }}
		/>
	)
}
