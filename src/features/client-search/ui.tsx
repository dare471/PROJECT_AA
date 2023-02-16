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

	const [clientSearchType, handleSearchTypeChange] = useUnit([model.$clientSearchType, model.clientSearchTypeChanged])

	return (
		<Stack direction='row' align='center' position='relative'>
			<Tooltip hasArrow label='Поменять режим поиска'>
				<Box>
					<Switch colorScheme='whiteAlpha' checked={clientSearchType === 'bin'} onChange={handleSearchTypeChange} />
				</Box>
			</Tooltip>
			{clientSearchType === 'name' ? <ClientSearchByName /> : <ClientSearchByBin />}

			{/* {clientSearchType === 'name' ? <ClientNameInput /> : <ClientBinInput />}
			<ClientSearchHints /> */}
		</Stack>
	)
})

function ClientSearchByName() {
	const model = createClientSearch.useModel()
	const [clientNameField, handleClientNameFieldChange] = useUnit([model.$clientNameField, model.clientNameFieldChanged])
	const [clientSearchNameOptions, handleClientHintClick, clientSearchHintsPending] = useUnit([
		model.$clientSearchNameOptions,
		model.clientHintClicked,
		model.$clientSearchHintsPending,
	])
	const [districtId, currentClientHintNameOption] = useUnit([model.$districtId, model.$currentClientHintNameOption])

	return (
		<Select
			placeholder='Поиск клиента по Тoo/Ип'
			options={clientSearchNameOptions}
			inputValue={clientNameField}
			onInputChange={(value, action) =>
				action.action === 'input-change' || action.action === 'set-value' ? handleClientNameFieldChange(value) : null
			}
			value={currentClientHintNameOption}
			onChange={(option) => (option ? handleClientHintClick(option.value) : null)}
			isLoading={clientSearchHintsPending}
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
	const [clientBinField, handleClientBinFieldChange] = useUnit([model.$clientBinField, model.clientBinFieldChanged])
	const [clientSearchBinOptions, handleClientHintClick, clientSearchHintsPending] = useUnit([
		model.$clientSearchBinOptions,
		model.clientHintClicked,
		model.$clientSearchHintsPending,
	])
	const [districtId, currentClientHintBinOption] = useUnit([model.$districtId, model.$currentClientHintBinOption])

	return (
		<Select
			placeholder='Поиск клиента по Иин/Бин'
			options={clientSearchBinOptions}
			inputValue={clientBinField}
			onInputChange={(value, action) =>
				action.action === 'input-change' || action.action === 'set-value' ? handleClientBinFieldChange(value) : null
			}
			value={currentClientHintBinOption}
			onChange={(option) => (option ? handleClientHintClick(option.value) : null)}
			isLoading={clientSearchHintsPending}
			isDisabled={districtId === null}
			noOptionsMessage={() => 'Нет результатов'}
			isClearable
			isSearchable
			styles={{ container: (provided) => ({ ...provided, minWidth: '15rem' }) }}
		/>
	)
}
